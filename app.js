// ============================================
// DRIFT APP — Main Application Logic
// ============================================

let currentCity = 'cologne';
let currentNeighborhood = '';
let daysCount = 2;
let energyLevel = 'balanced';
let budgetLevel = 'mid';

// Drift state
let driftTimer = null;
let driftTimeLeft = 90 * 60; // seconds
let driftPaused = false;
let currentDriftStep = 0;
let observations = ['', '', ''];

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

// ============================================
// NO TOURIST MODE
// ============================================

// City selector
document.querySelectorAll('.city-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCity = this.dataset.city;
        updateNeighborhoods();
    });
});

// Energy selector
document.querySelectorAll('.energy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.energy-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        energyLevel = this.dataset.energy;
    });
});

// Budget selector
document.querySelectorAll('.budget-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.budget-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        budgetLevel = this.dataset.budget;
    });
});

function updateNeighborhoods() {
    const select = document.getElementById('neighborhood');
    const city = CITIES[currentCity];
    select.innerHTML = '<option value="">Kies een wijk...</option>';

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
    const avoidTourist = document.getElementById('avoid-tourist').checked;

    // Show loading
    const btn = document.querySelector('.generate-btn');
    btn.querySelector('.btn-text').style.display = 'none';
    btn.querySelector('.btn-loader').style.display = 'flex';

    setTimeout(() => {
        const places = city.places;
        const results = [];

        // Filter function
        const filterPlace = (place) => {
            if (neighborhood && place.neighborhood !== neighborhood) return false;
            return true;
        };

        // Pick random items from array
        const pickRandom = (arr, count) => {
            const filtered = arr.filter(filterPlace);
            const shuffled = [...filtered].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, count);
        };

        // 3 coffee spots
        results.push(...pickRandom(places.coffee, 3));
        // 2 character spots
        results.push(...pickRandom(places.character, 2));
        // 1 cultural wildcard
        results.push(...pickRandom(places.cultural, 1));
        // 1 evening walk
        results.push(...pickRandom(places.walks, 1));
        // 1 locals dinner
        results.push(...pickRandom(places.dinner, 1));

        // If not enough results with neighborhood filter, add without filter
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

        renderTripResults(results, city.name, neighborhood);

        // Reset button
        btn.querySelector('.btn-text').style.display = 'block';
        btn.querySelector('.btn-loader').style.display = 'none';
    }, 1200);
}

function renderTripResults(results, cityName, neighborhood) {
    const container = document.getElementById('trip-cards');
    const subtitle = document.getElementById('results-subtitle');

    const hoodName = neighborhood ? CITIES[currentCity].neighborhoods[neighborhood]?.name : 'alle wijken';
    subtitle.textContent = `${daysCount} dagen in ${cityName} — ${hoodName}`;

    container.innerHTML = '';

    // Group by type
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
            card.innerHTML = `
                <div class="place-header">
                    <h4 class="place-name">${place.name}</h4>
                    <span class="place-budget">${getBudgetLabel(place.budget)}</span>
                </div>
                <p class="place-address">📍 ${place.address}</p>
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

    // Show results
    document.querySelector('.input-section').style.display = 'none';
    document.getElementById('trip-results').style.display = 'block';

    // Animate cards
    setTimeout(() => {
        container.querySelectorAll('.place-card').forEach((card, i) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, i * 100);
        });
    }, 100);
}

function getBudgetLabel(budget) {
    switch(budget) {
        case 'low': return '€';
        case 'mid': return '€€';
        case 'high': return '€€€';
        default: return '€€';
    }
}

function getEnergyEmoji(energy) {
    switch(energy) {
        case 'chill': return '😌';
        case 'balanced': return '⚡';
        case 'explorer': return '🔥';
        default: return '⚡';
    }
}

// ============================================
// 90-MINUTE DRIFT MODE
// ============================================

function startDrift() {
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

function renderDriftStep() {
    const step = DRIFT_STEPS[currentDriftStep];
    const container = document.getElementById('drift-current-step');

    // Add random direction for first step
    let extra = '';
    if (currentDriftStep === 0) {
        const randomDirection = DRIFT_DIRECTIONS[Math.floor(Math.random() * DRIFT_DIRECTIONS.length)];
        extra = `<div class="drift-direction">💡 ${randomDirection}</div>`;
    }

    container.innerHTML = `
        <div class="step-icon">${step.icon}</div>
        <h3 class="step-title">${step.title}</h3>
        <p class="step-duration">${step.duration} minuten</p>
        <p class="step-instruction">${step.instruction}</p>
        <p class="step-details">${step.details}</p>
        ${extra}
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

    // Update progress dots
    updateProgressDots();

    // Update next button
    const nextBtn = document.getElementById('drift-next-btn');
    if (currentDriftStep >= DRIFT_STEPS.length - 1) {
        nextBtn.textContent = 'Voltooi Drift ✨';
    } else {
        nextBtn.textContent = 'Volgende stap →';
    }
}

function renderProgressDots() {
    const container = document.getElementById('progress-dots');
    container.innerHTML = '';
    DRIFT_STEPS.forEach((step, i) => {
        const dot = document.createElement('div');
        dot.className = 'progress-dot' + (i === 0 ? ' active' : '');
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
    if (currentDriftStep >= DRIFT_STEPS.length - 1) {
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

    // Update circle progress
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
            <span class="stat-value">${currentDriftStep + 1}/${DRIFT_STEPS.length}</span>
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
    document.getElementById('drift-complete').style.display = 'none';
    document.getElementById('drift-active').style.display = 'none';
    document.getElementById('drift-intro').style.display = 'block';
    currentDriftStep = 0;
    driftTimeLeft = 90 * 60;
    observations = ['', '', ''];
}

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    updateNeighborhoods();
});
