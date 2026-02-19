#!/usr/bin/env node

// ============================================
// DRIFT APP — Fetch Trending Places
// Runs via GitHub Actions (daily) or manually
// ============================================
// Sources:
//   1. Reddit (public JSON endpoints, no auth needed)
//   2. Foursquare (API key needed, set as FOURSQUARE_API_KEY)
//   3. Google News RSS (no auth needed) + Claude AI summaries
// Categories: 🍴 Food & Drinks, 🎵 Live Muziek, 🎨 Kunst & Musea, 🎧 Clubs
// Output: trending.json

const fs = require('fs');
const path = require('path');

let RssParser;
let Anthropic;
try {
    RssParser = require('rss-parser');
    Anthropic = require('@anthropic-ai/sdk').default || require('@anthropic-ai/sdk');
} catch (e) {
    console.warn('⚠️  Optional dependencies not installed (rss-parser, @anthropic-ai/sdk). News feature disabled.');
}

const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY || '';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

// ============================================
// CITY & CATEGORY CONFIGURATIONS
// ============================================

const CATEGORIES = {
    food: {
        label: '🍴 Food & Drinks',
        redditTerms: ['restaurant', 'bar', 'cafe', 'coffee', 'food', 'brunch', 'cocktail', 'wine', 'beer', 'tapas', 'bistro', 'bakery', 'street food'],
        // Foursquare: Food (13000), Nightlife (10032), Coffee (13032), Bars (13003)
        foursquareCategories: '13000,13003,13032,10032',
        foursquareLimit: 8
    },
    music: {
        label: '🎵 Live Muziek',
        redditTerms: ['live music', 'concert', 'gig', 'jazz', 'venue', 'club', 'DJ', 'band', 'festival', 'open mic', 'techno', 'electronic', 'indie'],
        // Foursquare: Arts & Entertainment (10000), Nightlife (10032), Music Venue (10039)
        foursquareCategories: '10039,10032,10000',
        foursquareLimit: 6
    },
    culture: {
        label: '🎨 Kunst & Musea',
        redditTerms: ['museum', 'gallery', 'art', 'exhibition', 'expo', 'theater', 'theatre', 'culture', 'photography', 'contemporary', 'street art', 'mural', 'installation'],
        // Foursquare: Arts & Entertainment (10000), Museum (10027), Gallery (10025)
        foursquareCategories: '10027,10025,10000',
        foursquareLimit: 6
    },
    clubs: {
        label: '🎧 Clubs',
        redditTerms: ['club', 'techno', 'house music', 'DJ', 'rave', 'nightclub', 'dance', 'electronic music', 'underground club', 'sound system', 'Berghain', 'warehouse', 'afters', 'minimal techno', 'drum and bass'],
        // Foursquare: Nightclub (10032), Night Club (10058)
        foursquareCategories: '10032,10058',
        foursquareLimit: 4
    }
};

const CITIES = {
    cologne: {
        name: 'Keulen',
        lat: 50.9375, lng: 6.9603,
        subreddits: ['cologne'],
        extraTerms: {
            food: ['Brauhaus', 'Kneipe', 'Kölsch', 'biergarten'],
            music: ['Gebäude 9', 'Stadtgarten', 'Underground', 'Karneval'],
            culture: ['Museum Ludwig', 'Kolumba', 'street art Ehrenfeld'],
            clubs: ['Gewölbe', 'Ursprung Fi', 'Odonien', 'Bootshaus', 'Artheater']
        }
    },
    amsterdam: {
        name: 'Amsterdam',
        lat: 52.3676, lng: 4.9041,
        subreddits: ['amsterdam'],
        extraTerms: {
            food: ['terrace', 'borrel', 'brown cafe', 'bruin café'],
            music: ['Paradiso', 'Melkweg', 'Bimhuis', 'Tolhuistuin', 'Concertgebouw'],
            culture: ['Rijksmuseum', 'Stedelijk', 'FOAM', 'Eye', 'NDSM', 'gallery'],
            clubs: ['Shelter', 'Radion', 'Lofi', 'De School', 'Garage Noord']
        }
    },
    antwerp: {
        name: 'Antwerpen',
        lat: 51.2194, lng: 4.4025,
        subreddits: ['antwerp'],
        extraTerms: {
            food: ['bier', 'frituur', 'Bolleke'],
            music: ['Trix', 'De Roma', 'Kavka', 'Petrol'],
            culture: ['FOMU', 'MAS', 'M HKA', 'KMSKA', 'fashion', 'design'],
            clubs: ['Ampere', 'Club Vaag', 'Petrol', 'Kompass']
        }
    },
    lisbon: {
        name: 'Lissabon',
        lat: 38.7223, lng: -9.1393,
        subreddits: ['lisbon'],
        extraTerms: {
            food: ['pasteis', 'tasca', 'cervejaria', 'ginjinha', 'bifana'],
            music: ['fado', 'Musicbox', 'Lux Frágil', 'ZDB', 'Village Underground'],
            culture: ['MAAT', 'Berardo', 'Gulbenkian', 'LX Factory', 'azulejo', 'street art'],
            clubs: ['Lux Frágil', 'Ministerium', 'Kremlin', 'Village Underground', 'Rave']
        }
    },
    newcastle: {
        name: 'Newcastle',
        lat: 54.9783, lng: -1.6178,
        subreddits: ['NewcastleUponTyne'],
        extraTerms: {
            food: ['pub', 'ale', 'Grainger Market', 'supper club'],
            music: ['Sage', 'Cluny', 'Think Tank', 'Boiler Shop', 'Head of Steam'],
            culture: ['BALTIC', 'Laing', 'Biscuit Factory', 'Ouseburn', 'Side Gallery'],
            clubs: ['World Headquarters', 'Digital', 'Cosmic Ballroom', 'Warehouse']
        }
    },
    tallinn: {
        name: 'Tallinn',
        lat: 59.4370, lng: 24.7536,
        subreddits: ['tallinn', 'eesti'],
        extraTerms: {
            food: ['craft beer', 'Põhjala', 'Telliskivi', 'Kalamaja', 'kohvik', 'turg'],
            music: ['Sveta', 'Genklubi', 'Kultuurikatel', 'Philly Joe\'s', 'Tallinn Music Week'],
            culture: ['Kumu', 'Fotografiska', 'Kai Art Center', 'Kadriorg', 'Lennusadam', 'street art'],
            clubs: ['HALL', 'Lekker', 'Genklubi', 'Kultuurikatel']
        }
    }
};

// ============================================
// NEWS QUERIES — Google News RSS per city
// ============================================

const NEWS_QUERIES = {
    cologne: {
        query: 'Restaurant OR Gastronomie OR "neues Restaurant" OR Bar OR Kneipe',
        cityName: 'Köln',
        hl: 'de', gl: 'DE', ceid: 'DE:de'
    },
    amsterdam: {
        query: 'restaurant OR horeca OR "nieuw restaurant" OR bar OR food',
        cityName: 'Amsterdam',
        hl: 'nl', gl: 'NL', ceid: 'NL:nl'
    },
    antwerp: {
        query: 'restaurant OR horeca OR "nieuw restaurant" OR bar',
        cityName: 'Antwerpen',
        hl: 'nl', gl: 'BE', ceid: 'BE:nl'
    },
    lisbon: {
        query: 'restaurante OR gastronomia OR "novo restaurante" OR bar',
        cityName: 'Lisboa',
        hl: 'pt-PT', gl: 'PT', ceid: 'PT:pt'
    },
    newcastle: {
        query: 'restaurant OR food OR "new restaurant" OR bar OR pub',
        cityName: 'Newcastle',
        hl: 'en-GB', gl: 'GB', ceid: 'GB:en'
    },
    tallinn: {
        query: 'restaurant OR food OR "new restaurant" OR bar',
        cityName: 'Tallinn',
        hl: 'en', gl: 'EE', ceid: 'EE:en'
    }
};

// ============================================
// REDDIT SCRAPER
// ============================================

async function fetchRedditPosts(subreddit, searchTerms) {
    const posts = [];
    const query = searchTerms.join('+OR+');

    try {
        const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${query}&sort=hot&t=week&limit=50&restrict_sr=on`;
        const response = await fetch(url, {
            headers: { 'User-Agent': 'DriftApp/2.0 (trending-fetcher)' }
        });

        if (!response.ok) {
            console.warn(`  Reddit fetch failed for r/${subreddit}: ${response.status}`);
            return posts;
        }

        const data = await response.json();
        const children = data?.data?.children || [];

        for (const child of children) {
            const post = child.data;
            if (!post) continue;

            posts.push({
                title: post.title || '',
                body: (post.selftext || '').substring(0, 1000),
                score: post.score || 0,
                numComments: post.num_comments || 0,
                url: `https://reddit.com${post.permalink}`,
                created: post.created_utc || 0
            });
        }
    } catch (err) {
        console.warn(`  Reddit error for r/${subreddit}:`, err.message);
    }

    return posts;
}

// Also fetch the subreddit's hot posts (not just search) for broader coverage
async function fetchRedditHot(subreddit) {
    const posts = [];

    try {
        const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=30`;
        const response = await fetch(url, {
            headers: { 'User-Agent': 'DriftApp/2.0 (trending-fetcher)' }
        });

        if (!response.ok) return posts;

        const data = await response.json();
        const children = data?.data?.children || [];

        for (const child of children) {
            const post = child.data;
            if (!post || post.stickied) continue;

            posts.push({
                title: post.title || '',
                body: (post.selftext || '').substring(0, 1000),
                score: post.score || 0,
                numComments: post.num_comments || 0,
                url: `https://reddit.com${post.permalink}`,
                created: post.created_utc || 0
            });
        }
    } catch (err) {
        console.warn(`  Reddit hot error for r/${subreddit}:`, err.message);
    }

    return posts;
}

function extractPlacesFromReddit(posts, subreddit, category) {
    // Enhanced regex: captures place names after common recommendation phrases
    const patterns = [
        /(?:at|to|try|visited|went to|recommend|love|check out|called|been to|go to|enjoyed)\s+["']?([A-Z][A-Za-zÀ-ÿ\s'&.\-/]{2,35})["']?/gi,
        /["']([A-Z][A-Za-zÀ-ÿ\s'&.\-/]{2,30})["']\s+(?:is|was|has|had|does|offers|serves)/gi,
        /(?:^|\.\s+)([A-Z][A-Za-zÀ-ÿ\s'&.\-/]{3,30})\s+(?:is great|is amazing|is fantastic|is incredible|is worth|is the best|is underrated|was brilliant)/gi
    ];

    const mentionCounts = {};
    const falsePositives = /^(The|This|That|It|I|You|We|My|But|And|Not|Just|Very|Really|Also|There|They|What|Which|Where|When|How|Some|Any|Every|Most|Many|Such|Their|These|Those|Does|Has|Have|Been|Being|Would|Could|Should|Maybe|Actually|However|Although|Because|Since|After|Before|During|While|About|Like|Just|Only)$/i;

    for (const post of posts) {
        const text = `${post.title} ${post.body}`;

        for (const pattern of patterns) {
            pattern.lastIndex = 0;
            let match;
            while ((match = pattern.exec(text)) !== null) {
                const name = match[1].trim().replace(/\s+/g, ' ');
                if (name.length < 3 || name.length > 35) continue;
                if (falsePositives.test(name)) continue;
                // Skip if it's all lowercase after first char (likely not a place name)
                if (name.substring(1) === name.substring(1).toLowerCase() && name.split(' ').length === 1 && name.length < 6) continue;

                if (!mentionCounts[name]) {
                    mentionCounts[name] = { count: 0, totalScore: 0, comments: 0, urls: [], bestUrl: null };
                }
                mentionCounts[name].count++;
                mentionCounts[name].totalScore += post.score;
                mentionCounts[name].comments += post.numComments;
                if (post.url && !mentionCounts[name].urls.includes(post.url)) {
                    mentionCounts[name].urls.push(post.url);
                }
                if (!mentionCounts[name].bestUrl || post.score > (mentionCounts[name].bestScore || 0)) {
                    mentionCounts[name].bestUrl = post.url;
                    mentionCounts[name].bestScore = post.score;
                }
            }
        }
    }

    return Object.entries(mentionCounts)
        .filter(([_, data]) => data.count >= 1) // At least 1 mention
        .map(([name, data]) => ({
            name,
            source: 'reddit',
            trendingCategory: category,
            category: categoryLabel(category),
            address: null,
            lat: null,
            lng: null,
            score: Math.min(100, Math.round(
                (data.count * 12) +
                (data.totalScore / 8) +
                (data.comments / 15) +
                (data.urls.length > 1 ? 15 : 0) // Bonus for multi-thread mentions
            )),
            signal: buildSignal(data, subreddit),
            url: data.bestUrl
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);
}

function categoryLabel(cat) {
    switch (cat) {
        case 'food': return '🍴 Food & Drinks';
        case 'music': return '🎵 Live Muziek';
        case 'culture': return '🎨 Kunst & Musea';
        case 'clubs': return '🎧 Clubs';
        default: return cat;
    }
}

function buildSignal(data, subreddit) {
    const parts = [];
    if (data.count > 1) {
        parts.push(`${data.count}x genoemd op r/${subreddit}`);
    } else {
        parts.push(`Genoemd op r/${subreddit}`);
    }
    if (data.totalScore > 50) parts.push(`${data.totalScore} upvotes`);
    if (data.urls.length > 1) parts.push(`${data.urls.length} threads`);
    return parts.join(' · ');
}

// ============================================
// FOURSQUARE
// ============================================

async function fetchFoursquarePlaces(lat, lng, categories, limit, trendingCategory) {
    if (!FOURSQUARE_API_KEY) return [];

    try {
        const url = `https://api.foursquare.com/v3/places/search?ll=${lat},${lng}&radius=5000&sort=POPULARITY&categories=${categories}&limit=${limit}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': FOURSQUARE_API_KEY,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.warn(`  Foursquare fetch failed: ${response.status}`);
            return [];
        }

        const data = await response.json();
        const results = data.results || [];

        return results.map((place, index) => ({
            name: place.name,
            source: 'foursquare',
            trendingCategory: trendingCategory,
            category: place.categories?.[0]?.name || categoryLabel(trendingCategory),
            address: [
                place.location?.address,
                place.location?.locality
            ].filter(Boolean).join(', ') || null,
            lat: place.geocodes?.main?.latitude || null,
            lng: place.geocodes?.main?.longitude || null,
            score: Math.max(45, 95 - (index * 7)),
            signal: `Trending op Foursquare — populair deze week`,
            url: null
        }));
    } catch (err) {
        console.warn(`  Foursquare error:`, err.message);
        return [];
    }
}

// ============================================
// GOOGLE NEWS RSS + CLAUDE SUMMARIES
// ============================================

async function fetchGoogleNewsRSS(cityKey) {
    if (!RssParser) return [];

    const config = NEWS_QUERIES[cityKey];
    if (!config) return [];

    const parser = new RssParser({
        customFields: {
            item: [['source', 'source']]
        }
    });

    const query = encodeURIComponent(`${config.query} ${config.cityName}`);
    const url = `https://news.google.com/rss/search?q=${query}&hl=${config.hl}&gl=${config.gl}&ceid=${config.ceid}`;

    try {
        const feed = await parser.parseURL(url);
        const now = Date.now();
        const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);

        // Filter: only articles from last 7 days
        const recent = (feed.items || []).filter(item => {
            const pubDate = item.isoDate ? new Date(item.isoDate).getTime() : 0;
            return pubDate > sevenDaysAgo;
        });

        return recent.slice(0, 8).map(item => ({
            title: item.title || '',
            url: item.link || '',
            publishedAt: item.isoDate || '',
            source: (typeof item.source === 'object' ? item.source._ || item.source['$']?.url : item.source) || extractSourceFromTitle(item.title),
            snippet: (item.contentSnippet || item.content || '').substring(0, 500),
            language: config.hl.split('-')[0]
        }));
    } catch (err) {
        console.warn(`  Google News RSS error for ${config.cityName}:`, err.message);
        return [];
    }
}

function extractSourceFromTitle(title) {
    // Google News titles often end with " - Source Name"
    const match = (title || '').match(/\s-\s([^-]+)$/);
    return match ? match[1].trim() : 'Unknown';
}

async function summarizeWithClaude(articles) {
    if (!Anthropic || !ANTHROPIC_API_KEY || articles.length === 0) return articles;

    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    const summarized = [];
    for (const article of articles) {
        try {
            const response = await client.messages.create({
                model: 'claude-haiku-4-5-20250414',
                max_tokens: 200,
                messages: [{
                    role: 'user',
                    content: `Summarize this restaurant/food news article in 2-3 sentences in English. Focus on: what the news is about, which specific restaurant or food spot is mentioned, and why someone visiting the city would care. Be concise and practical.\n\nTitle: ${article.title}\nSnippet: ${article.snippet}\nSource: ${article.source}\nLanguage: ${article.language}`
                }]
            });

            article.summary = response.content[0]?.text || '';
        } catch (err) {
            console.warn(`  Claude summary error:`, err.message);
            article.summary = '';
        }

        // Rate limit — small delay between API calls
        await new Promise(r => setTimeout(r, 500));
    }

    return articles;
}

async function fetchNewsForAllCities() {
    const newsEnabled = RssParser && Anthropic && ANTHROPIC_API_KEY;
    if (!newsEnabled) {
        console.log('\n📰 News feature: DISABLED (missing dependencies or ANTHROPIC_API_KEY)');
        return {};
    }

    console.log('\n📰 Fetching food & restaurant news...');
    console.log(`   Anthropic API key: SET`);

    const newsPerCity = {};

    for (const [cityKey, config] of Object.entries(NEWS_QUERIES)) {
        console.log(`   📰 ${config.cityName}...`);

        const articles = await fetchGoogleNewsRSS(cityKey);
        console.log(`     → ${articles.length} articles from Google News`);

        if (articles.length > 0) {
            // Summarize top 5 with Claude
            const top5 = articles.slice(0, 5);
            const summarized = await summarizeWithClaude(top5);
            // Only keep articles that got a summary
            newsPerCity[cityKey] = summarized
                .filter(a => a.summary && a.summary.length > 10)
                .map(a => ({
                    title: a.title,
                    source: a.source,
                    url: a.url,
                    publishedAt: a.publishedAt,
                    language: a.language,
                    summary: a.summary
                }));
            console.log(`     → ${newsPerCity[cityKey].length} articles with summaries`);
        } else {
            newsPerCity[cityKey] = [];
        }

        // Rate limit between cities
        await new Promise(r => setTimeout(r, 2000));
    }

    return newsPerCity;
}

// ============================================
// MAIN
// ============================================

async function main() {
    console.log('🔥 Fetching trending places...');
    console.log(`   Foursquare API key: ${FOURSQUARE_API_KEY ? 'SET' : 'NOT SET'}`);
    console.log(`   Categories: ${Object.keys(CATEGORIES).join(', ')}`);

    const output = {
        lastUpdated: new Date().toISOString(),
        source: 'github-actions',
        cities: {}
    };

    for (const [cityKey, cityConfig] of Object.entries(CITIES)) {
        console.log(`\n📍 Processing ${cityConfig.name}...`);
        const allPlaces = [];

        // For each category, fetch Reddit + Foursquare
        for (const [catKey, catConfig] of Object.entries(CATEGORIES)) {
            console.log(`   [${catConfig.label}]`);

            // Build search terms: base + city-specific extras
            const terms = [...catConfig.redditTerms, ...(cityConfig.extraTerms?.[catKey] || [])];

            // Reddit: search within subreddit
            for (const subreddit of cityConfig.subreddits) {
                console.log(`     Reddit search: r/${subreddit} (${terms.length} terms)`);
                const searchPosts = await fetchRedditPosts(subreddit, terms);
                console.log(`     → ${searchPosts.length} search posts`);
                const searchPlaces = extractPlacesFromReddit(searchPosts, subreddit, catKey);
                console.log(`     → ${searchPlaces.length} places extracted`);
                allPlaces.push(...searchPlaces);

                // Rate limit
                await new Promise(r => setTimeout(r, 2000));
            }

            // Reddit: also check hot posts (first category only, to save API calls)
            if (catKey === 'food') {
                for (const subreddit of cityConfig.subreddits) {
                    console.log(`     Reddit hot: r/${subreddit}`);
                    const hotPosts = await fetchRedditHot(subreddit);
                    console.log(`     → ${hotPosts.length} hot posts`);
                    // Try to classify hot posts into categories based on content
                    const hotPlaces = extractPlacesFromReddit(hotPosts, subreddit, 'food');
                    console.log(`     → ${hotPlaces.length} places from hot`);
                    allPlaces.push(...hotPlaces);

                    await new Promise(r => setTimeout(r, 2000));
                }
            }

            // Foursquare: fetch per category
            if (FOURSQUARE_API_KEY) {
                console.log(`     Foursquare: ${catConfig.foursquareCategories}`);
                const fsPlaces = await fetchFoursquarePlaces(
                    cityConfig.lat, cityConfig.lng,
                    catConfig.foursquareCategories,
                    catConfig.foursquareLimit,
                    catKey
                );
                console.log(`     → ${fsPlaces.length} places`);
                allPlaces.push(...fsPlaces);
            }
        }

        // Deduplicate (case-insensitive name match)
        const seen = new Set();
        const uniquePlaces = allPlaces.filter(p => {
            const key = p.name.toLowerCase().trim();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        }).sort((a, b) => b.score - a.score);

        output.cities[cityKey] = {
            places: uniquePlaces.slice(0, 15) // Top 15 per city
        };

        console.log(`   ✅ ${uniquePlaces.length} unique places → top ${Math.min(15, uniquePlaces.length)} saved`);
    }

    // Fetch news for all cities (Google News RSS + Claude summaries)
    const newsPerCity = await fetchNewsForAllCities();

    // Merge news into output
    for (const [cityKey, newsArticles] of Object.entries(newsPerCity)) {
        if (output.cities[cityKey]) {
            output.cities[cityKey].news = newsArticles;
        }
    }
    // Ensure all cities have a news array (even if empty)
    for (const cityKey of Object.keys(output.cities)) {
        if (!output.cities[cityKey].news) {
            output.cities[cityKey].news = [];
        }
    }

    // Write output
    const outputPath = path.join(__dirname, '..', 'trending.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 4));
    console.log(`\n✅ Written to ${outputPath}`);
    console.log(`   Last updated: ${output.lastUpdated}`);

    // Log news summary
    const totalNews = Object.values(newsPerCity).reduce((sum, arr) => sum + arr.length, 0);
    if (totalNews > 0) {
        console.log(`   📰 News articles: ${totalNews} across ${Object.keys(newsPerCity).length} cities`);
    }
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
