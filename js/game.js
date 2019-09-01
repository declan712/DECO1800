
function iteratePlayers(data) {
    $(".player").remove();
    var playerTemplate = $(".player-template");
    var tempPlayers = data.split(";");
    for (i=0;i<tempPlayers.length;i++) {
        var player = tempPlayers[i].split(",");
        var playerID = player[0];
        var playerName = player[1];
        var playerMoney = player[2];

        if (playerID && playerName) {
            var clonedPlayerTemplate = playerTemplate.clone();
            clonedPlayerTemplate.attr("id","player-"+playerID).attr("class","player");
            clonedPlayerTemplate.appendTo("#game-players");

            $("#player-"+playerID+" .username").html(playerName);
            $("#player-"+playerID+" .funds").html(playerMoney);
        }
    }
    setTimeout(getPlayers,5000);
}

// function updatePlayers() {
//     getPlayer();
//     var funds = toShillings(playerFunds);
//     $("#funds").text("£"+funds[0]+(funds[1]>0?", "+funds[1]+" Shillings":"")+(funds[2]>0?", "+funds[2]+" Pence":""));
//     $("#username").text(playerName);
//     setTimeout(updatePlayer, 2000);
// }
// function checkUID() {
//     uID = localStorage.getItem("uID");
//     if (!uID) {
//         console.log("No user ID found");
//         localStorage.setItem("uID", "999999999");
//         console.log("setting uID to 999999999");
//         uID = localStorage.getItem("uID");
//     }
//     //playerName=localStorage.getItem("uname");
// }
function getPlayers() {
    
    $.ajax({
        url: "database.php?action=getAllPlayers",
        //dataType: "json",
        success: function(results) {
            console.log(results);
            iteratePlayers(results);
        }
    });
}


$(document).ready(function() {
    getPlayers();

    $("#clearStorage").click(function(event) {
        event.preventDefault();
        localStorage.clear();
    })
});