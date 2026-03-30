let teams = [];
let currentRoundTeams = [];
let nextRoundWinners = [];

// Sync the limit text with dropdown
document.getElementById('maxTeams').addEventListener('change', function() {
    document.getElementById('limit-text').innerText = this.value;
    teams = []; // Reset if they change size mid-entry
    document.getElementById('count').innerText = "0";
});

function addTeam() {
    let input = document.getElementById('teamInput');
    let limit = parseInt(document.getElementById('maxTeams').value);

    if (input.value.trim() === "") return;

    if (teams.length < limit) {
        teams.push(input.value.trim());
        document.getElementById('count').innerText = teams.length;
        input.value = "";
        
        if (teams.length === limit) {
            startTournament();
        }
    }
}

function startTournament() {
    document.getElementById('setup-section').classList.add('hidden');
    currentRoundTeams = [...teams];
    renderRound(currentRoundTeams, getRoundName(currentRoundTeams.length));
}

function getRoundName(count) {
    if (count <= 2) return "Grand Final";
    if (count <= 4) return "Semi-Finals";
    if (count <= 8) return "Quarter-Finals";
    return `Round of ${count}`;
}

function renderRound(teamsInRound, roundName) {
    const bracket = document.getElementById('bracket');
    let roundDiv = document.createElement('div');
    roundDiv.className = "round";
    roundDiv.innerHTML = `<h3>${roundName}</h3>`;
    
    nextRoundWinners = [];

    for (let i = 0; i < teamsInRound.length; i += 2) {
        let t1 = teamsInRound[i];
        let t2 = teamsInRound[i+1];

        let match = document.createElement('div');
        match.className = "match-card";
        match.innerHTML = `
            <div class="team-slot" onclick="setWinner(this, '${t1}')">${t1}</div>
            <div class="vs">VS</div>
            <div class="team-slot" onclick="setWinner(this, '${t2}')">${t2}</div>
        `;
        roundDiv.appendChild(match);
    }
    bracket.appendChild(roundDiv);
    // Smooth scroll to the new round
    bracket.scrollLeft = bracket.scrollWidth;
}

function setWinner(element, winner) {
    if (element.parentElement.classList.contains('completed')) return;
    
    element.parentElement.classList.add('completed');
    element.classList.add('winner-glow');
    nextRoundWinners.push(winner);

    // Check if round is over
    const totalMatchesInRound = currentRoundTeams.length / 2;
    if (nextRoundWinners.length === totalMatchesInRound) {
        if (nextRoundWinners.length === 1) {
            showChampion(nextRoundWinners[0]);
        } else {
            currentRoundTeams = [...nextRoundWinners];
            renderRound(currentRoundTeams, getRoundName(currentRoundTeams.length));
        }
    }
}

function showChampion(winner) {
    document.getElementById('champion-display').classList.remove('hidden');
    document.getElementById('winner-name').innerText = winner;
    // Trigger your "Rezuan" alert style
    console.log("🏆 Champion crowned: " + winner);
}
