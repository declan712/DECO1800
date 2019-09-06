var playerFunds = 0.00;
var playerName = "LOADING"
var uID;


function toShillings(num) {
    if (Math.ceil(num) > num) {
        var leftover = num-Math.floor(num);
        var sh = Math.floor(leftover/0.05);
        var p = Math.floor(100*(leftover%0.05));
        return [Math.floor(num),sh,p];
    }
    return [num, 0, 0];
}
function updatePlayer() {
    getPlayer();
    var funds = toShillings(playerFunds);
    $("#funds").text("£"+funds[0]+(funds[1]>0?", "+funds[1]+" Shillings":"")+(funds[2]>0?", "+funds[2]+" Pence":""));
    $("#username").text(playerName);
    setTimeout(updatePlayer, 2000);
}
function checkUID() {
    if (!(uID=localStorage.getItem("uID"))) {
        console.log("No user ID found");
        localStorage.setItem("uID", "1");
        console.log("setting uID to 1");
        uID = localStorage.getItem("uID");
    }
    //playerName=localStorage.getItem("uname");
}
function getPlayer() {
    uID = localStorage.getItem("uID");
    $.ajax({
        url: "../database.php?action=getPlayer&uID="+uID,
        //dataType: "json",
        success: function(results) {
            console.log(results);
            var playerData = results.split(",");
            playerName = playerData[1];
            playerFunds = playerData[2];
        }
    });
}


$(document).ready(function() {
    checkUID();
    updatePlayer();

    $("#clearStorage").click(function(event) {
        event.preventDefault();
        localStorage.clear();
    })
});