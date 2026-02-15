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
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    updateNeighborhoods();
});
