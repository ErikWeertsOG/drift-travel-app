// ============================================
// DRIFT APP — Main Application Logic
// ============================================

let currentCity = 'cologne';
let currentNeighborhood = '';
let daysCount = 2;
let energyLevel = 'balanced';
let budgetLevel = 'mid';
let locationMode = false;
let userLat = null;
let userLng = null;

// Drift state
let driftTimer = null;
let driftTimeLeft = 90 * 60; // seconds
let driftPaused = false;
let currentDriftStep = 0;
let currentSession = [];
let observations = ['', '', ''];
let driftLocationMode = false;
let driftWatchId = null;

// ============================================
// GEO UTILITIES
// ============================================

function getDistanceKm(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function getBearing(lat1, lng1, lat2, lng2) {
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const y = Math.sin(dLng) * Math.cos(lat2 * Math.PI / 180);
    const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
        Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLng);
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    return (bearing + 360) % 360;
}

function bearingToDirection(bearing) {
    const directions = ['noorden', 'noordoosten', 'oosten', 'zuidoosten',
        'zuiden', 'zuidwesten', 'westen', 'noordwesten'];
    return directions[Math.round(bearing / 45) % 8];
}

function formatDistance(km) {
    if (km < 1) return `~${Math.round(km * 1000)}m`;
    return `~${km.toFixed(1)}km`;
}

function getAllPlaces(city) {
    const places = city.places;
    const all = [];
    Object.values(places).forEach(arr => {
        arr.forEach(p => all.push(p));
    });
    return all;
}

function findNearbyPlaces(lat, lng, radiusKm) {
    const nearby = [];
    Object.values(CITIES).forEach(city => {
        getAllPlaces(city).forEach(place => {
            if (place.lat && place.lng) {
                const dist = getDistanceKm(lat, lng, place.lat, place.lng);
                if (dist <= radiusKm) {
                    nearby.push({ ...place, distance: dist });
                }
            }
        });
    });
    return nearby.sort((a, b) => a.distance - b.distance);
}

// ============================================
// SCREEN NAVIGATION
// ============================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
    });
    const target = document.getElementById(screenId);
    target.classList.add('active');

    // Animate in
    setTimeout(() => {
        target.querySelectorAll('.mode-card, .form-group, .drift-manifesto, .rule').forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            setTimeout(() => {
                el.style.transition = 'all 0.4s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, i * 80);
        });
    }, 100);

    if (screenId === 'notourist') {
        updateNeighborhoods();
    }

    if (screenId === 'trending') {
        loadTrending();
    }
}

function goBackFromNoTourist() {
    // Reset results view if showing
    document.querySelector('.input-section').style.display = 'block';
    document.getElementById('trip-results').style.display = 'none';
    showScreen('landing');
}

// ============================================
// LOCATION — No Tourist Mode
// ============================================

function useMyLocation() {
    if (!navigator.geolocation) {
        alert('Locatie is niet beschikbaar op dit apparaat.');
        return;
    }

    const btn = document.getElementById('use-location-btn');
    document.getElementById('location-btn-text').style.display = 'none';
    document.getElementById('location-btn-loader').style.display = 'inline';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;
            locationMode = true;

            // Find closest city
            let closestCity = null;
            let closestDist = Infinity;
            Object.entries(CITIES).forEach(([key, city]) => {
                const dist = getDistanceKm(userLat, userLng, city.center.lat, city.center.lng);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestCity = key;
                }
            });

            if (closestCity) {
                currentCity = closestCity;
                document.querySelectorAll('.city-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.city === closestCity);
                });
                updateNeighborhoods();
            }

            btn.classList.add('active');
            document.getElementById('location-btn-text').textContent = `📍 ${CITIES[currentCity].name} — ${formatDistance(closestDist)} van je`;
            document.getElementById('location-btn-text').style.display = 'inline';
            document.getElementById('location-btn-loader').style.display = 'none';
        },
        (error) => {
            document.getElementById('location-btn-text').textContent = '📍 Locatie niet beschikbaar';
            document.getElementById('location-btn-text').style.display = 'inline';
            document.getElementById('location-btn-loader').style.display = 'none';
            setTimeout(() => {
                document.getElementById('location-btn-text').textContent = '📍 Gebruik mijn locatie';
            }, 3000);
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

// ============================================
// NO TOURIST MODE
// ============================================

// City selector
document.querySelectorAll('.city-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCity = this.dataset.city;
        locationMode = false;
        const locBtn = document.getElementById('use-location-btn');
        locBtn.classList.remove('active');
        document.getElementById('location-btn-text').textContent = '📍 Gebruik mijn locatie';
        updateNeighborhoods();
    });
});

// Energy selector
document.querySelectorAll('.energy-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.energy-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        energyLevel = this.dataset.energy;
    });
});

// Budget selector
document.querySelectorAll('.budget-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.budget-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        budgetLevel = this.dataset.budget;
    });
});

function updateNeighborhoods() {
    const select = document.getElementById('neighborhood');
    const city = CITIES[currentCity];
    select.innerHTML = '<option value="">Kies een wijk...</option>';

    if (locationMode) {
        select.innerHTML = '<option value="">Dichtbij jou (gesorteerd op afstand)</option>';
    }

    if (city && city.neighborhoods) {
        Object.entries(city.neighborhoods).forEach(([key, hood]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = `${hood.name} — ${hood.vibe}`;
            select.appendChild(option);
        });
    }
}

function adjustDays(delta) {
    daysCount = Math.max(1, Math.min(7, daysCount + delta));
    document.getElementById('days-count').textContent = daysCount;
}

function generateTrip() {
    const city = CITIES[currentCity];
    if (!city) return;

    const neighborhood = document.getElementById('neighborhood').value;

    // Show loading
    const btn = document.querySelector('.generate-btn');
    btn.querySelector('.btn-text').style.display = 'none';
    btn.querySelector('.btn-loader').style.display = 'flex';

    setTimeout(() => {
        const places = city.places;
        let results = [];

        if (locationMode && userLat && userLng && !neighborhood) {
            // Location-based: sort by distance within city
            results = generateLocationBasedTrip(city);
        } else {
            // Original: random selection with optional neighborhood filter
            results = generateRandomTrip(city, neighborhood);
        }

        renderTripResults(results, city.name, neighborhood);

        btn.querySelector('.btn-text').style.display = 'block';
        btn.querySelector('.btn-loader').style.display = 'none';
    }, 1200);
}

function generateLocationBasedTrip(city) {
    const allPlaces = getAllPlaces(city);

    // Add distance to each place
    allPlaces.forEach(p => {
        if (p.lat && p.lng) {
            p._distance = getDistanceKm(userLat, userLng, p.lat, p.lng);
        } else {
            p._distance = 999;
        }
    });

    const results = [];
    const types = ['☕ Koffie', '🎭 Karakter', '🎨 Cultuur Wildcard', '🌙 Avondwandeling', '🍽️ Locals-only Diner'];
    const counts = [3, 2, 1, 1, 1];

    types.forEach((type, idx) => {
        const ofType = allPlaces
            .filter(p => p.type === type)
            .sort((a, b) => a._distance - b._distance);
        // Mix closest with some randomness
        const pool = ofType.slice(0, Math.max(counts[idx] + 2, ofType.length));
        const shuffled = [...pool].sort(() => Math.random() - 0.3);
        results.push(...shuffled.slice(0, counts[idx]));
    });

    return results;
}

function generateRandomTrip(city, neighborhood) {
    const places = city.places;
    const results = [];

    const filterPlace = (place) => {
        if (neighborhood && place.neighborhood !== neighborhood) return false;
        return true;
    };

    const pickRandom = (arr, count) => {
        const filtered = arr.filter(filterPlace);
        const shuffled = [...filtered].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    };

    results.push(...pickRandom(places.coffee, 3));
    results.push(...pickRandom(places.character, 2));
    results.push(...pickRandom(places.cultural, 1));
    results.push(...pickRandom(places.walks, 1));
    results.push(...pickRandom(places.dinner, 1));

    if (results.length < 5) {
        const pickAny = (arr, count) => {
            const shuffled = [...arr].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, count);
        };
        if (results.filter(r => r.type.includes('Koffie')).length === 0) results.push(...pickAny(places.coffee, 2));
        if (results.filter(r => r.type.includes('Karakter')).length === 0) results.push(...pickAny(places.character, 1));
        if (results.filter(r => r.type.includes('Cultuur')).length === 0) results.push(...pickAny(places.cultural, 1));
        if (results.filter(r => r.type.includes('Avondwandeling')).length === 0) results.push(...pickAny(places.walks, 1));
        if (results.filter(r => r.type.includes('Diner')).length === 0) results.push(...pickAny(places.dinner, 1));
    }

    return results;
}

function renderTripResults(results, cityName, neighborhood) {
    const container = document.getElementById('trip-cards');
    const subtitle = document.getElementById('results-subtitle');

    const hoodName = neighborhood
        ? CITIES[currentCity].neighborhoods[neighborhood]?.name
        : (locationMode ? 'dichtbij jou' : 'alle wijken');
    subtitle.textContent = `${daysCount} dagen in ${cityName} — ${hoodName}`;

    container.innerHTML = '';

    const typeOrder = ['☕ Koffie', '🎭 Karakter', '🎨 Cultuur Wildcard', '🌙 Avondwandeling', '🍽️ Locals-only Diner'];

    typeOrder.forEach(type => {
        const typePlaces = results.filter(r => r.type === type);
        if (typePlaces.length === 0) return;

        const section = document.createElement('div');
        section.className = 'type-section';
        section.innerHTML = `<h4 class="type-header">${type}</h4>`;

        typePlaces.forEach((place, i) => {
            const card = document.createElement('div');
            card.className = 'place-card';
            card.style.animationDelay = `${i * 0.1}s`;

            // Distance display
            let distanceHtml = '';
            if (locationMode && userLat && userLng && place.lat && place.lng) {
                const dist = place._distance || getDistanceKm(userLat, userLng, place.lat, place.lng);
                distanceHtml = `<span class="place-distance">${formatDistance(dist)} van je</span>`;
            }

            // Maps link — search by name + address + city for accurate results
            let mapsLink = '';
            const cityName_ = CITIES[currentCity]?.name || '';
            const searchQuery = encodeURIComponent(`${place.name} ${place.address} ${cityName_}`);
            mapsLink = `<a href="https://www.google.com/maps/search/?api=1&query=${searchQuery}" target="_blank" rel="noopener" class="maps-link">Bekijk op kaart ↗</a>`;

            card.innerHTML = `
                <div class="place-header">
                    <h4 class="place-name">${place.name}</h4>
                    <span class="place-budget">${getBudgetLabel(place.budget)}</span>
                </div>
                <div class="place-meta">
                    <span class="place-address">📍 ${place.address}</span>
                    ${distanceHtml}
                    ${mapsLink}
                </div>
                <p class="place-story">${place.story}</p>
                <div class="place-tags">
                    <span class="tag energy-tag">${getEnergyEmoji(place.energy)} ${place.energy}</span>
                    ${place.neighborhood ? `<span class="tag hood-tag">${CITIES[currentCity].neighborhoods[place.neighborhood]?.name || ''}</span>` : ''}
                </div>
            `;
            section.appendChild(card);
        });

        container.appendChild(section);
    });

    document.querySelector('.input-section').style.display = 'none';
    document.getElementById('trip-results').style.display = 'block';

    setTimeout(() => {
        container.querySelectorAll('.place-card').forEach((card, i) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, i * 100);
        });
    }, 100);
}

function getBudgetLabel(budget) {
    switch (budget) {
        case 'low': return '€';
        case 'mid': return '€€';
        case 'high': return '€€€';
        default: return '€€';
    }
}

function getEnergyEmoji(energy) {
    switch (energy) {
        case 'chill': return '😌';
        case 'balanced': return '⚡';
        case 'explorer': return '🔥';
        default: return '⚡';
    }
}

// ============================================
// 90-MINUTE DRIFT MODE — Session Builder
// ============================================

function buildDriftSession() {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const session = [];

    // Phase 1: Opening
    session.push(pick(DRIFT_POOL.opening));

    // Phase 2: Settle
    session.push(pick(DRIFT_POOL.settle));

    // Phase 3: Interact
    session.push(pick(DRIFT_POOL.interact));

    // 50% chance wildcard
    if (Math.random() > 0.5) {
        session.push(pick(DRIFT_WILDCARDS));
    }

    // Phase 4: Connect
    session.push(pick(DRIFT_POOL.connect));

    // 40% chance extra interact or settle
    if (Math.random() > 0.6) {
        const extra = Math.random() > 0.5 ? 'interact' : 'settle';
        session.push(pick(DRIFT_POOL[extra]));
    }

    // Another wildcard chance
    if (Math.random() > 0.7) {
        session.push(pick(DRIFT_WILDCARDS));
    }

    // Phase 5: Closing
    session.push(pick(DRIFT_POOL.closing));

    return session;
}

// ============================================
// 90-MINUTE DRIFT MODE
// ============================================

function startDrift() {
    // Build a unique random session
    currentSession = buildDriftSession();

    // Check location toggle
    driftLocationMode = document.getElementById('drift-use-location').checked;

    if (driftLocationMode) {
        startDriftLocationWatch();
    }

    document.getElementById('drift-intro').style.display = 'none';
    document.getElementById('drift-active').style.display = 'block';

    currentDriftStep = 0;
    driftTimeLeft = 90 * 60;
    driftPaused = false;
    observations = ['', '', ''];

    renderDriftStep();
    renderProgressDots();
    startTimer();
}

function startDriftLocationWatch() {
    if (!navigator.geolocation) return;

    driftWatchId = navigator.geolocation.watchPosition(
        (position) => {
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;
        },
        () => { }, // silent fail
        { enableHighAccuracy: false, maximumAge: 30000, timeout: 10000 }
    );
}

function stopDriftLocationWatch() {
    if (driftWatchId !== null) {
        navigator.geolocation.clearWatch(driftWatchId);
        driftWatchId = null;
    }
}

function getLocationHint() {
    if (!driftLocationMode || !userLat || !userLng) return '';

    const nearby = findNearbyPlaces(userLat, userLng, 1.0); // within 1km
    if (nearby.length === 0) return '';

    // Pick a random nearby place (not always the closest)
    const pick = nearby[Math.floor(Math.random() * Math.min(nearby.length, 3))];
    const bearing = getBearing(userLat, userLng, pick.lat, pick.lng);
    const direction = bearingToDirection(bearing);
    const dist = Math.round(pick.distance * 1000);

    return `<div class="location-hint">📍 Er is een plek met een verhaal ~${dist}m naar het ${direction}. Misschien loop je er langs.</div>`;
}

function renderDriftStep() {
    const step = currentSession[currentDriftStep];
    const container = document.getElementById('drift-current-step');

    // Direction hint for walking phases
    let extra = '';
    if (step.phase === 'opening' || step.phase === 'closing') {
        const randomDirection = DRIFT_DIRECTIONS[Math.floor(Math.random() * DRIFT_DIRECTIONS.length)];
        extra = `<div class="drift-direction">💡 ${randomDirection}</div>`;
    }

    // Location hint
    const locationHint = getLocationHint();

    // Wildcard styling
    const isWildcard = step.phase === 'wildcard';
    if (isWildcard) {
        container.classList.add('wildcard');
    } else {
        container.classList.remove('wildcard');
    }

    container.innerHTML = `
        <div class="step-icon">${step.icon}</div>
        <h3 class="step-title">${step.title}</h3>
        <p class="step-duration">${step.duration} minuten</p>
        <p class="step-instruction">${step.instruction}</p>
        <p class="step-details">${step.details}</p>
        ${extra}
        ${locationHint}
        <div class="step-prompt">
            <span class="prompt-label">Reflectie</span>
            <p>${step.prompt}</p>
        </div>
    `;

    // Animate in
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    setTimeout(() => {
        container.style.transition = 'all 0.5s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 50);

    updateProgressDots();

    const nextBtn = document.getElementById('drift-next-btn');
    if (currentDriftStep >= currentSession.length - 1) {
        nextBtn.textContent = 'Voltooi Drift ✨';
    } else {
        nextBtn.textContent = 'Volgende stap →';
    }
}

function renderProgressDots() {
    const container = document.getElementById('progress-dots');
    container.innerHTML = '';
    currentSession.forEach((step, i) => {
        const dot = document.createElement('div');
        dot.className = 'progress-dot' + (i === 0 ? ' active' : '');
        if (step.phase === 'wildcard') dot.classList.add('wildcard-dot');
        dot.title = step.title;
        container.appendChild(dot);
    });
}

function updateProgressDots() {
    document.querySelectorAll('.progress-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentDriftStep);
        dot.classList.toggle('done', i < currentDriftStep);
    });
}

function nextDriftStep() {
    if (currentDriftStep >= currentSession.length - 1) {
        completeDrift();
        return;
    }
    currentDriftStep++;
    renderDriftStep();
}

function startTimer() {
    updateTimerDisplay();
    driftTimer = setInterval(() => {
        if (!driftPaused) {
            driftTimeLeft--;
            updateTimerDisplay();
            if (driftTimeLeft <= 0) {
                completeDrift();
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.ceil(driftTimeLeft / 60);
    document.getElementById('timer-minutes').textContent = minutes;

    const circle = document.getElementById('timer-progress');
    const total = 90 * 60;
    const progress = driftTimeLeft / total;
    const circumference = 2 * Math.PI * 90;
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference * (1 - progress);
}

function togglePause() {
    driftPaused = !driftPaused;
    document.getElementById('pause-text').textContent = driftPaused ? '▶ Hervat' : '⏸ Pauzeer';
}

function saveObservation(index, value) {
    observations[index] = value;
}

function completeDrift() {
    if (driftTimer) clearInterval(driftTimer);
    stopDriftLocationWatch();

    document.getElementById('drift-active').style.display = 'none';
    document.getElementById('drift-complete').style.display = 'block';

    const summary = document.getElementById('complete-summary');
    const timeSpent = 90 - Math.ceil(driftTimeLeft / 60);
    const filledObs = observations.filter(o => o.trim() !== '');

    summary.innerHTML = `
        <div class="summary-stat">
            <span class="stat-value">${timeSpent}</span>
            <span class="stat-label">minuten gedrift</span>
        </div>
        <div class="summary-stat">
            <span class="stat-value">${currentDriftStep + 1}/${currentSession.length}</span>
            <span class="stat-label">stappen voltooid</span>
        </div>
        ${filledObs.length > 0 ? `
        <div class="summary-observations">
            <h4>Je observaties:</h4>
            ${filledObs.map((obs, i) => `<p class="obs-item">"${obs}"</p>`).join('')}
        </div>
        ` : ''}
    `;
}

function resetDrift() {
    if (driftTimer) clearInterval(driftTimer);
    stopDriftLocationWatch();
    document.getElementById('drift-complete').style.display = 'none';
    document.getElementById('drift-active').style.display = 'none';
    document.getElementById('drift-intro').style.display = 'block';
    currentDriftStep = 0;
    driftTimeLeft = 90 * 60;
    currentSession = [];
    observations = ['', '', ''];
}

// ============================================
// "IK HEB ZIN IN..." — Craving Search
// ============================================

let cravingLat = null;
let cravingLng = null;
let cravingLocationReady = false;

function initCravingLocation() {
    // Try to get location for craving search
    if (userLat && userLng) {
        cravingLat = userLat;
        cravingLng = userLng;
        cravingLocationReady = true;
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            // Fallback: use closest city center
            useCityCenter();
            resolve();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                cravingLat = pos.coords.latitude;
                cravingLng = pos.coords.longitude;
                userLat = cravingLat;
                userLng = cravingLng;
                cravingLocationReady = true;
                resolve();
            },
            () => {
                useCityCenter();
                resolve();
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    });
}

function useCityCenter() {
    const city = CITIES[currentCity] || CITIES.cologne;
    cravingLat = city.center.lat;
    cravingLng = city.center.lng;
    cravingLocationReady = true;
}

function quickCraving(term) {
    document.getElementById('craving-input').value = term;
    searchCraving();
}

function matchCraving(input) {
    const term = input.toLowerCase().trim();

    // Direct match
    if (CRAVING_MAP[term]) {
        return CRAVING_MAP[term];
    }

    // Partial match — check if input is contained in any key or vice versa
    for (const [key, val] of Object.entries(CRAVING_MAP)) {
        if (key.includes(term) || term.includes(key)) {
            return val;
        }
    }

    return null;
}

async function searchCraving() {
    const input = document.getElementById('craving-input').value.trim();
    if (!input) return;

    const statusEl = document.getElementById('craving-status');
    const resultsEl = document.getElementById('craving-results');
    const errorEl = document.getElementById('craving-error');

    // Reset UI
    resultsEl.style.display = 'none';
    errorEl.style.display = 'none';
    statusEl.style.display = 'flex';
    document.getElementById('craving-status-text').textContent = 'Locatie zoeken...';

    // Get location
    await initCravingLocation();

    document.getElementById('craving-status-text').textContent = `${input} zoeken in de buurt...`;

    const match = matchCraving(input);

    if (!match) {
        // Unknown term — try generic name search on Overpass, then fallback
        try {
            const results = await queryOverpassGeneric(input, cravingLat, cravingLng, 1000);
            if (results.length > 0) {
                statusEl.style.display = 'none';
                renderCravingResults(results, input, `🔍 ${input}`);
                return;
            }
        } catch (e) {
            // Fall through to fallback
        }

        statusEl.style.display = 'none';
        showCravingError(`Niks gevonden voor "${input}" in de buurt.`, input);
        return;
    }

    // Matched craving — query Overpass
    try {
        const results = await queryOverpass(match.tags, cravingLat, cravingLng, 800);
        statusEl.style.display = 'none';

        if (results.length === 0) {
            // Try wider radius
            const widerResults = await queryOverpass(match.tags, cravingLat, cravingLng, 2000);
            if (widerResults.length > 0) {
                renderCravingResults(widerResults, input, `${match.icon} ${match.label}`);
            } else {
                showCravingError(`Geen ${match.label.toLowerCase()} gevonden in de buurt.`, input);
            }
            return;
        }

        renderCravingResults(results, input, `${match.icon} ${match.label}`);
    } catch (err) {
        statusEl.style.display = 'none';
        showCravingError('Zoeken mislukt. Probeer Google Maps:', input);
    }
}

async function queryOverpass(tags, lat, lng, radius) {
    // Build Overpass query for multiple tag combinations
    const unionParts = tags.map(([key, val]) => {
        return `node["${key}"="${val}"](around:${radius},${lat},${lng});
way["${key}"="${val}"](around:${radius},${lat},${lng});`;
    }).join('\n');

    const query = `[out:json][timeout:10];
(
${unionParts}
);
out center body 8;`;

    const url = 'https://overpass-api.de/api/interpreter';
    const response = await fetch(url, {
        method: 'POST',
        body: `data=${encodeURIComponent(query)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        signal: AbortSignal.timeout(12000)
    });

    const data = await response.json();
    return processOverpassResults(data.elements || [], lat, lng);
}

async function queryOverpassGeneric(name, lat, lng, radius) {
    const query = `[out:json][timeout:10];
(
node["name"~"${name}",i](around:${radius},${lat},${lng});
way["name"~"${name}",i](around:${radius},${lat},${lng});
);
out center body 5;`;

    const url = 'https://overpass-api.de/api/interpreter';
    const response = await fetch(url, {
        method: 'POST',
        body: `data=${encodeURIComponent(query)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        signal: AbortSignal.timeout(12000)
    });

    const data = await response.json();
    return processOverpassResults(data.elements || [], lat, lng);
}

function processOverpassResults(elements, lat, lng) {
    const results = [];
    const seen = new Set();

    for (const el of elements) {
        const tags = el.tags || {};
        const name = tags.name;
        if (!name || seen.has(name.toLowerCase())) continue;
        seen.add(name.toLowerCase());

        const elLat = el.lat || (el.center && el.center.lat);
        const elLng = el.lon || (el.center && el.center.lon);
        if (!elLat || !elLng) continue;

        const dist = getDistanceKm(lat, lng, elLat, elLng);
        const bearing = getBearing(lat, lng, elLat, elLng);
        const direction = bearingToDirection(bearing);

        const address = [tags['addr:street'], tags['addr:housenumber']].filter(Boolean).join(' ');
        const openingHours = tags.opening_hours || '';
        const cuisine = tags.cuisine || '';

        results.push({
            name,
            lat: elLat,
            lng: elLng,
            distance: dist,
            direction,
            address,
            openingHours,
            cuisine
        });
    }

    return results
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 6);
}

function renderCravingResults(results, query, title) {
    const resultsEl = document.getElementById('craving-results');
    const titleEl = document.getElementById('craving-results-title');
    const subtitleEl = document.getElementById('craving-results-subtitle');
    const cardsEl = document.getElementById('craving-cards');
    const mapsLinkEl = document.getElementById('craving-maps-link');

    titleEl.textContent = title;
    subtitleEl.textContent = `${results.length} plekken gevonden bij je in de buurt`;
    cardsEl.innerHTML = '';

    results.forEach((place, i) => {
        const card = document.createElement('div');
        card.className = 'place-card';

        const searchQuery = encodeURIComponent(`${place.name} ${place.address}`);
        const distText = formatDistance(place.distance);

        let extraInfo = '';
        if (place.cuisine) {
            extraInfo += `<span class="tag energy-tag">🍴 ${place.cuisine}</span>`;
        }
        if (place.openingHours) {
            extraInfo += `<span class="tag hood-tag">🕐 ${place.openingHours}</span>`;
        }

        card.innerHTML = `
            <div class="place-header">
                <h4 class="place-name">${place.name}</h4>
                <span class="place-distance">${distText}</span>
            </div>
            <div class="place-meta">
                ${place.address ? `<span class="place-address">📍 ${place.address}</span>` : ''}
                <span class="place-direction">🧭 ${distText} naar het ${place.direction}</span>
                <a href="https://www.google.com/maps/search/?api=1&query=${searchQuery}" target="_blank" rel="noopener" class="maps-link">Bekijk op kaart ↗</a>
            </div>
            ${extraInfo ? `<div class="place-tags">${extraInfo}</div>` : ''}
        `;
        cardsEl.appendChild(card);

        // Animate in
        setTimeout(() => card.classList.add('visible'), i * 100 + 100);
    });

    // Google Maps fallback link
    const mapsQuery = encodeURIComponent(`${query} near me`);
    mapsLinkEl.href = `https://www.google.com/maps/search/${mapsQuery}/@${cravingLat},${cravingLng},15z`;

    resultsEl.style.display = 'block';
}

function showCravingError(message, query) {
    const errorEl = document.getElementById('craving-error');
    const errorText = document.getElementById('craving-error-text');
    const errorMaps = document.getElementById('craving-error-maps');

    errorText.textContent = message;
    const mapsQuery = encodeURIComponent(`${query} near me`);
    errorMaps.href = `https://www.google.com/maps/search/${mapsQuery}/@${cravingLat},${cravingLng},15z`;

    errorEl.style.display = 'block';
}

// ============================================
// RANDOM TIP — Taste-based recommendation
// ============================================

let tipExclusions = [];
let tipCity = null;

function showRandomTip() {
    const modal = document.getElementById('random-tip-modal');
    modal.style.display = 'flex';

    // Animate in
    setTimeout(() => modal.classList.add('open'), 10);

    // Get location and pick a tip
    if (userLat && userLng) {
        pickAndShowTip();
    } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                userLat = pos.coords.latitude;
                userLng = pos.coords.longitude;
                pickAndShowTip();
            },
            () => {
                pickAndShowTip(); // Without location
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    } else {
        pickAndShowTip();
    }
}

function pickAndShowTip() {
    // Find closest city (or use currently selected)
    if (userLat && userLng) {
        let closestCity = null;
        let closestDist = Infinity;
        Object.entries(CITIES).forEach(([key, city]) => {
            const dist = getDistanceKm(userLat, userLng, city.center.lat, city.center.lng);
            if (dist < closestDist) {
                closestDist = dist;
                closestCity = key;
            }
        });
        tipCity = closestCity || currentCity;
    } else {
        tipCity = currentCity;
    }

    // Score all places in this city
    const city = CITIES[tipCity];
    if (!city) return;

    const allPlaces = [];
    Object.entries(city.places).forEach(([type, places]) => {
        places.forEach(p => {
            allPlaces.push({ ...p, _type: type });
        });
    });

    // Score each place
    const scored = allPlaces
        .filter(p => !tipExclusions.includes(p.name))
        .map(place => ({
            place,
            score: scorePlaceForTaste(place, tipCity)
        }))
        .sort((a, b) => b.score - a.score);

    // Pick from top 5 with weighted randomness
    const topN = scored.slice(0, Math.min(5, scored.length));
    if (topN.length === 0) {
        tipExclusions = []; // Reset if we've shown everything
        return pickAndShowTip();
    }

    const pick = pickWeightedRandom(topN);
    tipExclusions.push(pick.place.name);

    renderRandomTipModal(pick.place);
}

function scorePlaceForTaste(place, cityKey) {
    let score = 0;

    // Vibe keyword matching in story
    const storyLower = (place.story || '').toLowerCase();
    TASTE_PROFILE.vibeKeywords.forEach(keyword => {
        if (storyLower.includes(keyword)) {
            score += 2;
        }
    });

    // Neighborhood preference
    const preferred = TASTE_PROFILE.preferredNeighborhoods[cityKey] || [];
    if (preferred.includes(place.neighborhood)) {
        score += 3;
    }

    // Energy weight
    const energyW = TASTE_PROFILE.energyWeights[place.energy] || 1.0;
    score *= energyW;

    // Budget weight
    const budgetW = TASTE_PROFILE.budgetWeights[place.budget] || 1.0;
    score *= budgetW;

    // Type weight
    const typeW = TASTE_PROFILE.typeWeights[place._type] || 1.0;
    score *= typeW;

    // Proximity bonus (if location available)
    if (userLat && userLng && place.lat && place.lng) {
        const dist = getDistanceKm(userLat, userLng, place.lat, place.lng);
        if (dist < 1) score += 5;
        else if (dist < 2) score += 3;
        else if (dist < 5) score += 1;
    }

    // Random factor for variety
    score += Math.random() * 3;

    return score;
}

function pickWeightedRandom(scoredPlaces) {
    const totalScore = scoredPlaces.reduce((sum, s) => sum + s.score, 0);
    let rand = Math.random() * totalScore;

    for (const item of scoredPlaces) {
        rand -= item.score;
        if (rand <= 0) return item;
    }

    return scoredPlaces[0];
}

function renderRandomTipModal(place) {
    const content = document.getElementById('tip-content');
    const cityData = CITIES[tipCity];
    const cityName = cityData?.name || '';

    let distHtml = '';
    if (userLat && userLng && place.lat && place.lng) {
        const dist = getDistanceKm(userLat, userLng, place.lat, place.lng);
        const bearing = getBearing(userLat, userLng, place.lat, place.lng);
        const direction = bearingToDirection(bearing);
        distHtml = `<span class="place-distance">${formatDistance(dist)} naar het ${direction}</span>`;
    }

    const searchQuery = encodeURIComponent(`${place.name} ${place.address} ${cityName}`);
    const hoodName = cityData?.neighborhoods[place.neighborhood]?.name || '';

    content.innerHTML = `
        <div class="tip-place-card">
            <div class="tip-type">${place.type}</div>
            <h3 class="tip-place-name">${place.name}</h3>
            <div class="place-meta">
                <span class="place-address">📍 ${place.address}</span>
                ${distHtml}
            </div>
            <p class="place-story">${place.story}</p>
            <div class="place-tags">
                <span class="tag energy-tag">${getEnergyEmoji(place.energy)} ${place.energy}</span>
                <span class="tag hood-tag">${hoodName}</span>
                <span class="place-budget">${getBudgetLabel(place.budget)}</span>
            </div>
            <a href="https://www.google.com/maps/search/?api=1&query=${searchQuery}" target="_blank" rel="noopener" class="maps-link tip-maps-link">Bekijk op kaart ↗</a>
        </div>
    `;
}

function nextRandomTip() {
    pickAndShowTip();
}

function dismissRandomTip() {
    const modal = document.getElementById('random-tip-modal');
    modal.classList.remove('open');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// ============================================
// 🔥 TRENDING NOW — Load & Render
// ============================================

let trendingData = null;
let trendingCity = 'cologne';
const WORKER_URL = ''; // Set when Cloudflare Worker is deployed, e.g. 'https://drift-trending.erikweerts.workers.dev'

async function loadTrending() {
    const loadingEl = document.getElementById('trending-loading');
    const resultsEl = document.getElementById('trending-results');
    const errorEl = document.getElementById('trending-error');

    // Reset UI
    resultsEl.style.display = 'none';
    errorEl.style.display = 'none';
    loadingEl.style.display = 'flex';

    try {
        // Layer 1: Load static trending.json
        const staticData = await fetchStaticTrending();

        // Layer 2: Try Cloudflare Worker for fresh data (if configured)
        let liveData = null;
        if (WORKER_URL) {
            try {
                liveData = await fetchLiveTrending(trendingCity);
            } catch (e) {
                // Silently fall back to static
            }
        }

        // Merge sources
        trendingData = mergeTrendingSources(staticData, liveData);

        loadingEl.style.display = 'none';
        renderTrendingResults(trendingData, trendingCity);
    } catch (err) {
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
        document.getElementById('trending-error-text').textContent =
            'Trending data niet beschikbaar. Check je internetverbinding.';
    }
}

async function fetchStaticTrending() {
    const response = await fetch('trending.json', {
        signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) throw new Error('Failed to fetch trending.json');
    return response.json();
}

async function fetchLiveTrending(city) {
    if (!WORKER_URL) return null;

    const cityData = CITIES[city];
    if (!cityData) return null;

    const url = `${WORKER_URL}/trending?city=${city}&lat=${cityData.center.lat}&lng=${cityData.center.lng}`;
    const response = await fetch(url, {
        signal: AbortSignal.timeout(6000)
    });
    if (!response.ok) throw new Error('Worker request failed');
    return response.json();
}

function mergeTrendingSources(staticData, liveData) {
    // If no live data, just return static
    if (!liveData || !liveData.cities) return staticData;

    const merged = JSON.parse(JSON.stringify(staticData));

    // For each city in live data, merge places
    Object.entries(liveData.cities).forEach(([cityKey, cityData]) => {
        if (!merged.cities[cityKey]) {
            merged.cities[cityKey] = { places: [] };
        }

        const existingNames = new Set(
            merged.cities[cityKey].places.map(p => p.name.toLowerCase())
        );

        // Add live places that don't exist in static data
        (cityData.places || []).forEach(place => {
            if (!existingNames.has(place.name.toLowerCase())) {
                place.source = place.source || 'live';
                place.signal = place.signal || 'Live data';
                merged.cities[cityKey].places.push(place);
            } else {
                // Update existing with live score if higher
                const existing = merged.cities[cityKey].places.find(
                    p => p.name.toLowerCase() === place.name.toLowerCase()
                );
                if (existing && place.score > existing.score) {
                    existing.score = place.score;
                    existing.signal = place.signal || existing.signal;
                    existing.source = 'live';
                }
            }
        });

        // Re-sort by score
        merged.cities[cityKey].places.sort((a, b) => b.score - a.score);
    });

    // Update timestamp to most recent
    if (liveData.lastUpdated) {
        merged.lastUpdated = liveData.lastUpdated;
        merged.hasLiveData = true;
    }

    return merged;
}

function renderTrendingResults(data, city) {
    const resultsEl = document.getElementById('trending-results');
    const titleEl = document.getElementById('trending-results-title');
    const updatedEl = document.getElementById('trending-last-updated');
    const cardsEl = document.getElementById('trending-cards');

    const cityData = data.cities[city];
    if (!cityData || !cityData.places || cityData.places.length === 0) {
        document.getElementById('trending-error').style.display = 'block';
        document.getElementById('trending-error-text').textContent =
            `Geen trending data voor ${CITIES[city]?.name || city}.`;
        return;
    }

    const cityName = CITIES[city]?.name || city;
    titleEl.textContent = `🔥 Trending in ${cityName}`;

    // Format last updated
    if (data.lastUpdated) {
        const updated = new Date(data.lastUpdated);
        const now = new Date();
        const diffHours = Math.round((now - updated) / (1000 * 60 * 60));
        let timeAgo;
        if (diffHours < 1) timeAgo = 'zojuist';
        else if (diffHours < 24) timeAgo = `${diffHours} uur geleden`;
        else if (diffHours < 48) timeAgo = 'gisteren';
        else timeAgo = `${Math.round(diffHours / 24)} dagen geleden`;

        updatedEl.textContent = `Laatst bijgewerkt: ${timeAgo}`;
        if (data.hasLiveData) {
            updatedEl.textContent += ' • Live data beschikbaar';
        }
    }

    cardsEl.innerHTML = '';

    cityData.places.forEach((place, i) => {
        const card = document.createElement('div');
        card.className = 'place-card trending-place-card';

        // Score badge color
        let scoreClass = 'trending-score-hot';
        if (place.score < 70) scoreClass = 'trending-score-warm';
        if (place.score < 50) scoreClass = 'trending-score-mild';

        // Source icon
        const sourceIcon = place.source === 'reddit' ? '💬' : (place.source === 'live' ? '⚡' : '📍');
        const sourceLabel = place.source === 'reddit' ? 'Reddit' :
            (place.source === 'live' ? 'Live' : 'Foursquare');

        // Distance if location available
        let distHtml = '';
        if (userLat && userLng && place.lat && place.lng) {
            const dist = getDistanceKm(userLat, userLng, place.lat, place.lng);
            const bearing = getBearing(userLat, userLng, place.lat, place.lng);
            const direction = bearingToDirection(bearing);
            distHtml = `<span class="place-distance">${formatDistance(dist)} naar het ${direction}</span>`;
        }

        // Google Maps link
        const searchQuery = encodeURIComponent(`${place.name} ${place.address || ''}`);
        const mapsLink = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;

        // Reddit link
        let sourceLink = '';
        if (place.url) {
            sourceLink = `<a href="${place.url}" target="_blank" rel="noopener" class="trending-source-link">Bekijk op Reddit ↗</a>`;
        }

        card.innerHTML = `
            <div class="place-header">
                <h4 class="place-name">${place.name}</h4>
                <span class="trending-score ${scoreClass}">${place.score}</span>
            </div>
            <div class="trending-signal">
                <span class="trending-signal-icon">🔥</span>
                <span>${place.signal}</span>
            </div>
            <div class="place-meta">
                <span class="trending-category">${place.category}</span>
                ${place.address ? `<span class="place-address">📍 ${place.address}</span>` : ''}
                ${distHtml}
            </div>
            <div class="place-tags">
                <span class="tag trending-source-tag">${sourceIcon} ${sourceLabel}</span>
                <a href="${mapsLink}" target="_blank" rel="noopener" class="maps-link">Bekijk op kaart ↗</a>
                ${sourceLink}
            </div>
        `;

        cardsEl.appendChild(card);

        // Animate in
        setTimeout(() => card.classList.add('visible'), i * 100 + 100);
    });

    resultsEl.style.display = 'block';
}

function trendingUseLocation() {
    if (!navigator.geolocation) return;

    const btn = document.getElementById('trending-location-btn');
    document.getElementById('trending-location-text').textContent = '📍 Locatie zoeken...';

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            userLat = pos.coords.latitude;
            userLng = pos.coords.longitude;

            // Find closest city
            let closestCity = null;
            let closestDist = Infinity;
            Object.entries(CITIES).forEach(([key, city]) => {
                const dist = getDistanceKm(userLat, userLng, city.center.lat, city.center.lng);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestCity = key;
                }
            });

            if (closestCity) {
                trendingCity = closestCity;
                document.querySelectorAll('.trending-city-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.trendingCity === closestCity);
                });
            }

            btn.classList.add('active');
            document.getElementById('trending-location-text').textContent =
                `📍 ${CITIES[trendingCity]?.name || trendingCity} — ${formatDistance(closestDist)} van je`;

            // Reload trending for this city
            loadTrending();
        },
        () => {
            document.getElementById('trending-location-text').textContent = '📍 Locatie niet beschikbaar';
            setTimeout(() => {
                document.getElementById('trending-location-text').textContent = '📍 Gebruik mijn locatie';
            }, 3000);
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    updateNeighborhoods();

    // Craving input: search on Enter key
    const cravingInput = document.getElementById('craving-input');
    if (cravingInput) {
        cravingInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchCraving();
            }
        });
    }

    // Trending city selector
    document.querySelectorAll('.trending-city-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.trending-city-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            trendingCity = this.dataset.trendingCity;
            // Reset location button
            const locBtn = document.getElementById('trending-location-btn');
            locBtn.classList.remove('active');
            document.getElementById('trending-location-text').textContent = '📍 Gebruik mijn locatie';
            // Reload trending
            if (trendingData) {
                renderTrendingResults(trendingData, trendingCity);
            } else {
                loadTrending();
            }
        });
    });
});
