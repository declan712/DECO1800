var playerFunds = 1.23;
var playerName = "USERNAME"
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
    var funds = toShillings(playerFunds);
    $("#funds").text("£"+funds[0]+(funds[1]>0?", "+funds[1]+" Shillings":"")+(funds[2]>0?", "+funds[2]+" Pence":""));
    $("#username").text(playerName);
    setTimeout(1000);
}
function checkUID() {
    uID = localStorage.getItem("uID");
    if (!uID) {
        console.log("No user ID found");
        localStorage.setItem("uID", "ConnorRyan");
        localStorage.setItem("uname","Connor Ryan")
        console.log("setting uID to ConnorRyan");
        
    }
    uID = localStorage.getItem("uID");
    playerName=localStorage.getItem("uname");
}
$(document).ready(function() {
    checkUID();
    updatePlayer();

    $("#clearStorage").click(function(event) {
        event.preventDefault();
        localStorage.clear();
    })
});