function move(pData,dir) {
    playerData = pData.split(",");
    pPos = parseInt(playerData[4]);
    if (dir=="forward" && playerData[4] < 15) {
        $.ajax({
            url: "../database.php?action=setPlayerData&uID="+playerData[0]+"&col=gameProgress&val="+(pPos+1),
            success: function(results) {
            }
        });
    } else if (dir=="back" && playerData[4] > 0) {
        $.ajax({
            url: "../database.php?action=setPlayerData&uID="+playerData[0]+"&col=gameProgress&val="+(pPos-1),
            success: function(results) {
            }
        });
    }
}

function movePlayer(pID, dir) {
    $.ajax({
        url: "../database.php?action=getPlayer&uID="+pID,
        //dataType: "json",
        success: function(results) {
            move(results,dir);
        }
    });
}
// function setPlayerColour(uID,R,G,B) {
//     var hexR=parseInt(R,10).toString(16);
//     var hexG=parseInt(G,10).toString(16);
//     var hexB=parseInt(B,10).toString(16);
//     hexR = (hexR.length==1?"0"+hexR:hexR);
//     hexG = (hexG.length==1?"0"+hexG:hexG);
//     hexB = (hexB.length==1?"0"+hexB:hexB);
//     $.ajax({
//         url: "../database.php?action=setPlayerData&uID="+uID+"&col=userColour&val="+hexR+hexG+hexB,
//         //dataType: "json",
//         success: function(results) {
//             console.log("set "+uID+" colour to #"+hexR+hexG+hexB);
//         }
//     });
// }

function setPlayerFunds(playerID,money) {
    $.ajax({
        url: "../database.php?action=setPlayerData&uID="+playerID+"&col=projectMoney&val="+money,
        success: function(result) {
        }
    });
}

function iteratePlayerIncome(players) {
    var tempPlayers = players.split(";");
    for (i=0;i<tempPlayers.length;i++) {
        var player = tempPlayers[i].split("|");
        var playerID = player[0];
        var playerMoney = player[2];
        var playerIncome = player[5];
        var newMoney = (parseFloat(playerMoney) + parseFloat(playerIncome)).toFixed(2);
        $("#player-"+playerID+" .funds").html(newMoney+" (+"+playerIncome+")");
        setPlayerFunds(playerID,newMoney);
    }
}

function givePlayersIncome() {
    $.ajax({
        url: "../database.php?action=getAllPlayers",
        success: function(players) {
            iteratePlayerIncome(players);
        }
    });
}

// function advanceTime(time,gID) {
//     var newTime = time+1
//     $.ajax({
//         url: "../database.php?action=setGameTime&gID="+gID+"&time="+newTime,
//         success: function() {
//             drawTime(newTime);
//             givePlayersIncome();
//             setTimeout(updateTime,6000);
//         }
//     });
// }

function advanceTime() {
    gID=1;
    $.ajax({
        url: "../database.php?action=getGameTime&gID="+gID,
        success: function(time) {
            var currentTime = parseInt(time);
            var newTime = currentTime+1
            if (newTime%3==0) {
                giveProjects();
                console.log("Generating Projects....");
            };
            $.ajax({
                url: "../database.php?action=setGameTime&gID="+gID+"&time="+newTime,
                success: function() {
                    givePlayersIncome();
                    setTimeout(advanceTime,10000);
                }
            });
        }
    });
}


$(document).ready(function() {

    setTimeout(advanceTime,2000);

    $("#delete-players").click(function(event) {
        $.ajax({
            url: "../database.php?action=deleteAllPlayers",
            //dataType: "json",
            success: function(results) {
                Console.log("Deleting Players...");
            }
        });
    });
    $("#reset-players").click(function(event) {
        $.ajax({
            url: "../database.php?action=resetPlayers&gID=1",
            success: function(results) {
                console.log("Resetting Players...");
            }
        });
    });

    $("#reset-time").click(function(event) {
        $.ajax({
            url: "../database.php?action=setGameTime&gID=1&time=0",
            success: function(results) {
            }
        });
        $.ajax({
            url: "../database.php?action=resetMoney&gID=1",
            success: function(results) {
            }
        });
    });

    $(document).on('click',".back-forward input",function() {
        var ID = $(this).parent().parent().attr("id");
        var pID = ID.split("-")[1];
        var dir = $(this).attr("class");
        movePlayer(pID,dir);
    });

    $(document).on('click',".colour-form input[type=button]",function() {
        var ID = $(this).parent().parent().attr("id");
        var pID = ID.split("-")[1];
        var R = $(this).parent().children("input:nth-of-type(1)").val();
        var G = $(this).parent().children("input:nth-of-type(2)").val();
        var B = $(this).parent().children("input:nth-of-type(3)").val();
        setPlayerColour(pID,R,G,B);
    });

});