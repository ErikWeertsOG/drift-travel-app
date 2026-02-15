// ============================================
// DRIFT APP — Cloudflare Worker
// Real-time trending places proxy
// ============================================
// Deploy: wrangler deploy
// URL: https://drift-trending.<your-subdomain>.workers.dev
//
// Environment variables needed:
//   FOURSQUARE_API_KEY — Foursquare Places API v3 key
//
// Endpoints:
//   GET /trending?city=cologne&lat=50.93&lng=6.96
//   GET /health
//
// Setup:
//   1. npm install -g wrangler
//   2. wrangler login
//   3. wrangler secret put FOURSQUARE_API_KEY
//   4. wrangler deploy
// ============================================

// In-memory cache (survives within a single Worker instance, ~4 hours)
const cache = new Map();
const CACHE_TTL = 4 * 60 * 60 * 1000; // 4 hours in ms

// City center coordinates (fallback if not provided)
const CITY_CENTERS = {
    cologne:   { lat: 50.9375, lng: 6.9603 },
    amsterdam: { lat: 52.3676, lng: 4.9041 },
    antwerp:   { lat: 51.2194, lng: 4.4025 },
    lisbon:    { lat: 38.7223, lng: -9.1393 },
    newcastle: { lat: 54.9783, lng: -1.6178 }
};

// CORS headers for the Drift app
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
};

export default {
    async fetch(request, env) {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        const url = new URL(request.url);

        // Health check
        if (url.pathname === '/health') {
            return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() });
        }

        // Trending endpoint
        if (url.pathname === '/trending') {
            return handleTrending(url, env);
        }

        return jsonResponse({ error: 'Not found' }, 404);
    }
};

async function handleTrending(url, env) {
    const city = url.searchParams.get('city') || 'cologne';
    const lat = parseFloat(url.searchParams.get('lat')) || CITY_CENTERS[city]?.lat;
    const lng = parseFloat(url.searchParams.get('lng')) || CITY_CENTERS[city]?.lng;

    if (!lat || !lng) {
        return jsonResponse({ error: 'Invalid city or coordinates' }, 400);
    }

    // Check cache
    const cacheKey = `trending-${city}`;
    const cached = cache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
        return jsonResponse({
            ...cached.data,
            cached: true,
            cacheAge: Math.round((Date.now() - cached.timestamp) / 1000 / 60) + ' minutes'
        });
    }

    // Fetch fresh data from Foursquare
    const apiKey = env.FOURSQUARE_API_KEY;
    if (!apiKey) {
        return jsonResponse({
            error: 'API key not configured',
            hint: 'Set FOURSQUARE_API_KEY as a Worker secret: wrangler secret put FOURSQUARE_API_KEY'
        }, 503);
    }

    try {
        const places = await fetchFoursquare(lat, lng, apiKey);

        const result = {
            lastUpdated: new Date().toISOString(),
            source: 'cloudflare-worker',
            cities: {
                [city]: { places }
            }
        };

        // Store in cache
        cache.set(cacheKey, {
            data: result,
            timestamp: Date.now()
        });

        return jsonResponse(result);
    } catch (err) {
        return jsonResponse({
            error: 'Failed to fetch trending data',
            message: err.message
        }, 500);
    }
}

async function fetchFoursquare(lat, lng, apiKey) {
    // Foursquare Places API v3
    // Categories: Food (13000), Bars (13003), Cafes (13032), Coffee (13035)
    const url = `https://api.foursquare.com/v3/places/search?ll=${lat},${lng}&radius=5000&sort=POPULARITY&categories=13000,13003,13032,13035,13065&limit=10`;

    const response = await fetch(url, {
        headers: {
            'Authorization': apiKey,
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Foursquare API error: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results || [];

    return results.map((place, index) => ({
        name: place.name,
        source: 'live',
        category: place.categories?.[0]?.name || 'Venue',
        address: [
            place.location?.address,
            place.location?.locality
        ].filter(Boolean).join(', ') || null,
        lat: place.geocodes?.main?.latitude || null,
        lng: place.geocodes?.main?.longitude || null,
        score: Math.max(50, 98 - (index * 7)),
        signal: `Live trending op Foursquare`,
        url: null
    })).slice(0, 8);
}

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data, null, 2), {
        status,
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
        }
    });
}
