let teams = [];
const TOTAL_SLOTS = 32; // The nearest power of 2 for 22 teams

function addTeam() {
    let input = document.getElementById('teamInput');
    if (input.value && teams.length < 22) {
        teams.push(input.value);
        document.getElementById('count').innerText = teams.length;
        input.value = "";
        // Once 22 teams are in, fill the rest with "BYE"
        if (teams.length === 22) {
            while (teams.length < TOTAL_SLOTS) {
                teams.push("BYE");
            }
            startTournament();
        }
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
        let t2 = currentTeams[i+1];

        // LOGIC: If one team is a "BYE", the other team wins automatically
        if (t1 === "BYE" || t2 === "BYE") {
            let actualTeam = (t1 === "BYE") ? t2 : t1;
            winners.push(actualTeam);
        } else {
            // Normal Match
            let match = document.createElement('div');
            match.className = "match";
            match.innerText = `${t1} vs ${t2}`;
            match.onclick = () => {
                let winner = prompt(`Who won? ${t1} or ${t2}`);
                if (winner === t1 || winner === t2) {
                    winners.push(winner);
                    match.innerText = `Winner: ${winner}`;
                    match.style.background = "#00ff0033";
                    match.onclick = null;
                    if (winners.length === currentTeams.length / 2) renderRound(winners);
                }
            };
            roundDiv.appendChild(match);
        }
    }
    // If all matches in this round were BYEs, move to next round immediately
    if (winners.length === currentTeams.length / 2 && roundDiv.children.length === 0) {
        renderRound(winners);
    } else {
        bracket.appendChild(roundDiv);
    }
}
