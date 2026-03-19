let teams = [];
function addTeam() {
    let input = document.getElementById('teamInput');
    if (input.value && teams.length < 22) {
        teams.push(input.value);
        document.getElementById('count').innerText = teams.length;
        input.value = "";
        if (teams.length === 22) startTournament();
    }
}

function startTournament() {
    document.getElementById('setup').style.display = 'none';
    renderRound(teams);
}

function renderRound(currentTeams) {
    const bracket = document.getElementById('bracket');
    if (currentTeams.length === 1) {
        document.getElementById('winner-name').innerText = currentTeams[0];
        return;
    }
    
    let roundDiv = document.createElement('div');
    roundDiv.className = "round";
    let winners = [];
    
    for (let i = 0; i < currentTeams.length; i += 2) {
        let t1 = currentTeams[i];
        let t2 = currentTeams[i+1] || t1; // Handle odd numbers/byes
        let match = document.createElement('div');
        match.className = "match";
        match.innerText = `${t1} vs ${t2}`;
        match.onclick = () => {
            winners.push(prompt(`Who won? Type ${t1} or ${t2}`));
            if (winners.length === Math.ceil(currentTeams.length / 2)) {
                renderRound(winners);
            }
        };
        roundDiv.appendChild(match);
    }
    bracket.appendChild(roundDiv);
}