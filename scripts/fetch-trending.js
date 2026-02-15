#!/usr/bin/env node

// ============================================
// DRIFT APP — Fetch Trending Places
// Runs via GitHub Actions (weekly) or manually
// ============================================
// Sources:
//   1. Reddit (public JSON endpoints, no auth needed)
//   2. Foursquare (API key needed, set as FOURSQUARE_API_KEY)
// Output: trending.json

const fs = require('fs');
const path = require('path');

const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY || '';

// City configurations
const CITIES = {
    cologne: {
        name: 'Keulen',
        lat: 50.9375,
        lng: 6.9603,
        subreddits: ['cologne'],
        searchTerms: ['restaurant', 'bar', 'cafe', 'coffee', 'food', 'Kneipe', 'Brauhaus']
    },
    amsterdam: {
        name: 'Amsterdam',
        lat: 52.3676,
        lng: 4.9041,
        subreddits: ['amsterdam'],
        searchTerms: ['restaurant', 'bar', 'cafe', 'coffee', 'food', 'terrace', 'brunch']
    },
    antwerp: {
        name: 'Antwerpen',
        lat: 51.2194,
        lng: 4.4025,
        subreddits: ['antwerp'],
        searchTerms: ['restaurant', 'bar', 'cafe', 'food', 'beer', 'brunch']
    },
    lisbon: {
        name: 'Lissabon',
        lat: 38.7223,
        lng: -9.1393,
        subreddits: ['lisbon'],
        searchTerms: ['restaurant', 'bar', 'cafe', 'food', 'pasteis', 'fado']
    },
    newcastle: {
        name: 'Newcastle',
        lat: 54.9783,
        lng: -1.6178,
        subreddits: ['NewcastleUponTyne'],
        searchTerms: ['restaurant', 'bar', 'pub', 'cafe', 'food', 'brunch', 'beer']
    }
};

// ============================================
// REDDIT SCRAPER
// ============================================

async function fetchRedditPosts(subreddit, searchTerms) {
    const posts = [];
    const query = searchTerms.join('+OR+');

    try {
        const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${query}&sort=hot&t=week&limit=50`;
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'DriftApp/1.0 (trending-fetcher)'
            }
        });

        if (!response.ok) {
            console.warn(`Reddit fetch failed for r/${subreddit}: ${response.status}`);
            return posts;
        }

        const data = await response.json();
        const children = data?.data?.children || [];

        for (const child of children) {
            const post = child.data;
            if (!post) continue;

            posts.push({
                title: post.title || '',
                body: (post.selftext || '').substring(0, 500),
                score: post.score || 0,
                numComments: post.num_comments || 0,
                url: `https://reddit.com${post.permalink}`,
                created: post.created_utc || 0
            });
        }
    } catch (err) {
        console.warn(`Reddit error for r/${subreddit}:`, err.message);
    }

    return posts;
}

function extractPlacesFromReddit(posts, subreddit) {
    // Simple keyword extraction — look for capitalized place names
    // and common patterns like "X is great", "went to X", "try X"
    const placeNamePattern = /(?:at|to|try|visited|went to|recommend|love|check out|called)\s+["']?([A-Z][A-Za-zÀ-ÿ\s'&.-]{2,30})["']?/gi;
    const mentionCounts = {};

    for (const post of posts) {
        const text = `${post.title} ${post.body}`;
        let match;

        while ((match = placeNamePattern.exec(text)) !== null) {
            const name = match[1].trim();
            // Filter out common false positives
            if (name.length < 3 || /^(The|This|That|It|I|You|We|My|But|And|Not|Just|Very|Really)$/i.test(name)) continue;

            if (!mentionCounts[name]) {
                mentionCounts[name] = { count: 0, totalScore: 0, url: null };
            }
            mentionCounts[name].count++;
            mentionCounts[name].totalScore += post.score;
            if (!mentionCounts[name].url) {
                mentionCounts[name].url = post.url;
            }
        }
    }

    // Convert to places array, sorted by mention count * score
    return Object.entries(mentionCounts)
        .map(([name, data]) => ({
            name,
            source: 'reddit',
            category: 'Mentioned on Reddit',
            address: null,
            lat: null,
            lng: null,
            score: Math.min(100, Math.round(data.count * 10 + data.totalScore / 10)),
            signal: `${data.count}x genoemd op r/${subreddit} deze week`,
            url: data.url
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
}

// ============================================
// FOURSQUARE
// ============================================

async function fetchFoursquareTrending(lat, lng) {
    if (!FOURSQUARE_API_KEY) {
        console.warn('No FOURSQUARE_API_KEY set, skipping Foursquare data');
        return [];
    }

    try {
        // Foursquare Places API v3 — search for popular places nearby
        const url = `https://api.foursquare.com/v3/places/search?ll=${lat},${lng}&radius=5000&sort=POPULARITY&categories=13000,13003,13032,13065&limit=10`;

        const response = await fetch(url, {
            headers: {
                'Authorization': FOURSQUARE_API_KEY,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.warn(`Foursquare fetch failed: ${response.status}`);
            return [];
        }

        const data = await response.json();
        const results = data.results || [];

        return results.map((place, index) => ({
            name: place.name,
            source: 'foursquare',
            category: place.categories?.[0]?.name || 'Venue',
            address: [
                place.location?.address,
                place.location?.locality
            ].filter(Boolean).join(', ') || null,
            lat: place.geocodes?.main?.latitude || null,
            lng: place.geocodes?.main?.longitude || null,
            score: Math.max(50, 95 - (index * 8)), // Score based on popularity rank
            signal: `Trending op Foursquare — populaire plek`,
            url: null
        })).slice(0, 5);
    } catch (err) {
        console.warn('Foursquare error:', err.message);
        return [];
    }
}

// ============================================
// MAIN
// ============================================

async function main() {
    console.log('🔥 Fetching trending places...');
    console.log(`   Foursquare API key: ${FOURSQUARE_API_KEY ? 'SET' : 'NOT SET'}`);

    const output = {
        lastUpdated: new Date().toISOString(),
        source: 'github-actions',
        cities: {}
    };

    for (const [cityKey, cityConfig] of Object.entries(CITIES)) {
        console.log(`\n📍 Processing ${cityConfig.name}...`);

        const allPlaces = [];

        // Fetch Reddit data
        for (const subreddit of cityConfig.subreddits) {
            console.log(`   Reddit: r/${subreddit}`);
            const posts = await fetchRedditPosts(subreddit, cityConfig.searchTerms);
            console.log(`   → ${posts.length} posts found`);
            const redditPlaces = extractPlacesFromReddit(posts, subreddit);
            console.log(`   → ${redditPlaces.length} places extracted`);
            allPlaces.push(...redditPlaces);

            // Rate limiting: wait 2 seconds between Reddit requests
            await new Promise(r => setTimeout(r, 2000));
        }

        // Fetch Foursquare data
        if (FOURSQUARE_API_KEY) {
            console.log(`   Foursquare: ${cityConfig.lat}, ${cityConfig.lng}`);
            const fsPlaces = await fetchFoursquareTrending(cityConfig.lat, cityConfig.lng);
            console.log(`   → ${fsPlaces.length} places found`);
            allPlaces.push(...fsPlaces);
        }

        // Deduplicate and sort
        const seen = new Set();
        const uniquePlaces = allPlaces.filter(p => {
            const key = p.name.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        }).sort((a, b) => b.score - a.score);

        output.cities[cityKey] = {
            places: uniquePlaces.slice(0, 8) // Top 8 per city
        };

        console.log(`   ✅ ${uniquePlaces.length} unique places → top ${Math.min(8, uniquePlaces.length)} saved`);
    }

    // Write output
    const outputPath = path.join(__dirname, '..', 'trending.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 4));
    console.log(`\n✅ Written to ${outputPath}`);
    console.log(`   Last updated: ${output.lastUpdated}`);
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
