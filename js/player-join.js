var playerName="";

function createNewUser(userName) {
    $.ajax({
        url: "../database.php?action=createNewPlayer&name="+userName,
        //dataType: "json",
        success: function(results) {
            console.log("new user: "+results);
            var user = results.split("|");
            if (user[0]>1000000000) {
                localStorage.setItem("uID",user[0]);
                window.location.href="../player/";
            }
        }
    });
}
function checkUID() {
    if (!(uID=localStorage.getItem("uID"))) {
        console.log("No user ID found");
        // createNewUser();
        $("#player-join").show();
        
    } else {
        //getPlayer();
        if(playerName) {
            $("#player-join").hide();
            $("#player-next").show();
        } else localStorage.setItem("uID","");
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
            if (results.includes("ERROR")){
                localStorage.setItem("uID","");
            } else {
                var playerData = results.split("|");
                playerName = playerData[1];
            }
            //playerFunds = playerData[2];
        }
    });
}


$(document).ready(function() {
    $("#player-next").hide();
    $("#player-join").hide();
    getPlayer();
    setTimeout(checkUID,1000);
    // updatePlayer();

    $("#clearStorage").click(function(event) {
        event.preventDefault();
        localStorage.clear();
    })

    $("#player-join input[type=\"button\"]").click(function(event) {
        event.preventDefault();
        var playerName = $("#player-join input[type=\"text\"]").val();
        createNewUser(playerName);
    });
    $("#player-next input[type=\"button\"]").click(function(event) {
        event.preventDefault();
        window.location.href="../player/";
    });
});