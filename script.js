let teams = [];
let currentRoundTeams = [];
let winnersOfThisRound = [];

// Update the limit display when dropdown changes
document.getElementById('maxTeams').addEventListener('change', function() {
    document.getElementById('limit-display').innerText = this.value;
    teams = []; // Reset teams list
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
        
        // CHECK IF LIMIT IS REACHED
        if (teams.length === limit) {
            startTournament();
        }
    }
}

function startTournament() {
    // 1. Hide Setup
    document.getElementById('setup-section').classList.add('hidden');
    
    // 2. Initialize first round
    currentRoundTeams = [...teams];
    winnersOfThisRound = [];
    renderRound(currentRoundTeams);
}

function renderRound(teamsInRound) {
    const bracket = document.getElementById('bracket');
    const roundCount = teamsInRound.length;
    
    let roundDiv = document.createElement('div');
    roundDiv.className = "round";
    roundDiv.innerHTML = `<h3>${getRoundName(roundCount)}</h3>`;
    
    for (let i = 0; i < teamsInRound.length; i += 2) {
        let t1 = teamsInRound[i];
        let t2 = teamsInRound[i+1];

        let match = document.createElement('div');
        match.className = "match-card";
        match.innerHTML = `
            <div class="team-slot" onclick="selectWinner(this, '${t1}')">${t1}</div>
            <div class="vs">VS</div>
            <div class="team-slot" onclick="selectWinner(this, '${t2}')">${t2}</div>
        `;
        roundDiv.appendChild(match);
    }
    bracket.appendChild(roundDiv);
    winnersOfThisRound = []; // Reset for the newly created round
}

function selectWinner(element, winnerName) {
    let matchCard = element.parentElement;
    
    // Prevent changing winner after selection
    if (matchCard.classList.contains('completed')) return;
    
    matchCard.classList.add('completed');
    element.classList.add('winner-glow');
    winnersOfThisRound.push(winnerName);

    // If all matches in current round are decided
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
    window.scrollTo(0, document.body.scrollHeight);
}
