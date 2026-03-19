let teams = [];
let roundWinners = [];

function addTeam() {
    let input = document.getElementById('teamInput');
    // Change limit to 16
    if (input.value && teams.length < 16) {
        teams.push(input.value);
        document.getElementById('count').innerText = teams.length;
        input.value = "";
        
        if (teams.length === 16) {
            document.getElementById('setup').style.display = 'none';
            renderRound(teams, "Round of 16");
        }
    }
}

function renderRound(teamsInRound, roundName) {
    const bracket = document.getElementById('bracket');
    let roundDiv = document.createElement('div');
    roundDiv.className = "round";
    roundDiv.innerHTML = `<h3>${roundName}</h3>`;
    
    roundWinners = [];

    for (let i = 0; i < teamsInRound.length; i += 2) {
        let t1 = teamsInRound[i];
        let t2 = teamsInRound[i+1];

        let match = document.createElement('div');
        match.className = "match";
        match.innerText = `${t1} vs ${t2}`;

        match.onclick = function() {
            let win = prompt(`Winner of ${t1} vs ${t2}?`);
            if (win === t1 || win === t2) {
                roundWinners.push(win);
                this.innerText = `✅ ${win}`;
                this.style.background = "#006400"; 
                this.onclick = null;

                // Move to next round when all matches in current round are done
                if (roundWinners.length === teamsInRound.length / 2) {
                    if (roundWinners.length === 1) {
                        showChampion(roundWinners[0]);
                    } else {
                        let nextRoundName = "";
                        if (roundWinners.length === 8) nextRoundName = "Quarter-Finals";
                        else if (roundWinners.length === 4) nextRoundName = "Semi-Finals";
                        else if (roundWinners.length === 2) nextRoundName = "Grand Final";
                        
                        renderRound(roundWinners, nextRoundName);
                    }
                }
            }
        };
        roundDiv.appendChild(match);
    }
    bracket.appendChild(roundDiv);
}

function showChampion(winner) {
    document.getElementById('winner-name').innerText = winner;
    document.getElementById('champion-display').style.color = "#FFD700"; 
    alert("🏆 TOURNAMENT CHAMPION: " + winner);
}
