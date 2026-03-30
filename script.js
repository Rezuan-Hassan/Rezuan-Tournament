let teams = [];
let currentRoundTeams = [];
let winnersOfThisRound = [];

// Focus input on load
window.onload = () => document.getElementById('teamInput').focus();

// Add team on Enter key
document.getElementById('teamInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTeam();
});

// Update limit and reset if dropdown changes
document.getElementById('maxTeams').addEventListener('change', function() {
    document.getElementById('limit-display').innerText = this.value;
    teams = [];
    document.getElementById('count').innerText = "0";
    document.getElementById('teamInput').focus();
});

function addTeam() {
    let input = document.getElementById('teamInput');
    let limit = parseInt(document.getElementById('maxTeams').value);

    // FIX: Block input if limit is reached
    if (teams.length >= limit) return;

    if (input.value.trim() !== "") {
        teams.push(input.value.trim());
        document.getElementById('count').innerText = teams.length;
        input.value = "";
        input.focus(); // Keep cursor in box

        if (teams.length === limit) {
            startTournament();
        }
    }
}

function startTournament() {
    document.getElementById('setup-section').classList.add('hidden');
    currentRoundTeams = [...teams];
    renderRound(currentRoundTeams);
}

function renderRound(teamsInRound) {
    const bracket = document.getElementById('bracket');
    let roundDiv = document.createElement('div');
    roundDiv.className = "round";
    roundDiv.innerHTML = `<h3>${getRoundName(teamsInRound.length)}</h3>`;
    
    for (let i = 0; i < teamsInRound.length; i += 2) {
        let t1 = teamsInRound[i];
        let t2 = teamsInRound[i+1];
        let match = document.createElement('div');
        match.className = "match-card";
        match.innerHTML = `
            <div class="team-slot" onclick="selectWinner(this, '${t1}')">${t1}</div>
            <div style="font-size:10px;color:#444;margin:5px 0;">VS</div>
            <div class="team-slot" onclick="selectWinner(this, '${t2}')">${t2}</div>
        `;
        roundDiv.appendChild(match);
    }
    bracket.appendChild(roundDiv);
    winnersOfThisRound = [];
}

function selectWinner(element, winnerName) {
    let matchCard = element.parentElement;
    if (matchCard.classList.contains('completed')) return;
    
    matchCard.classList.add('completed');
    element.classList.add('winner-glow');
    winnersOfThisRound.push(winnerName);

    if (winnersOfThisRound.length === currentRoundTeams.length / 2) {
        if (winnersOfThisRound.length === 1) {
            finishTournament(winnersOfThisRound[0]);
        } else {
            currentRoundTeams = [...winnersOfThisRound];
            renderRound(currentRoundTeams);
        }
    }
}

function getRoundName(count) {
    if (count === 2) return "Grand Final";
    if (count === 4) return "Semi-Finals";
    if (count === 8) return "Quarter-Finals";
    return `Round of ${count}`;
}

function finishTournament(champion) {
    document.getElementById('champion-display').classList.remove('hidden');
    document.getElementById('winner-name').innerText = champion;
}
