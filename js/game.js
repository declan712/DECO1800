function iteratePlayers(data) {
    $(".player").addClass("old");
    $(".player-piece").remove();
    var playerTemplate = $(".player-template");
    var tempPlayers = data.split(";");
    for (i=0;i<tempPlayers.length;i++) {
        var player = tempPlayers[i].split(",");
        var playerID = player[0];
        var playerName = player[1];
        var playerMoney = player[2];
        var playerColour = player[4];
        var gameProgress = 1+parseInt(player[3]);
        var playerIncome = player[5];

        if ( $("#player-"+playerID).length ) {
            $("#player-"+playerID).removeClass("old");
            $("#player-"+playerID+" .username").html(playerName);
            $("#player-"+playerID+" .funds").html(playerMoney+" (+"+playerIncome+")");
            $("#player-"+playerID+" .player-colour").css("background-color","#"+playerColour);

            var clonedPlayerPiece = $("#player-"+playerID+" .player-colour").clone();
            clonedPlayerPiece.attr("id","player-piece-"+playerID).attr("class","player-piece");
            clonedPlayerPiece.appendTo(".station:nth-of-type("+gameProgress+")");

        } else if (playerID && playerName) {
            var clonedPlayerTemplate = playerTemplate.clone();
            clonedPlayerTemplate.attr("id","player-"+playerID).attr("class","player");
            clonedPlayerTemplate.appendTo("#game-players");

            $("#player-"+playerID+" .username").html(playerName);
            $("#player-"+playerID+" .funds").html(playerMoney+" (+"+playerIncome+")");
            $("#player-"+playerID+" .player-colour").css("background-color","#"+playerColour);

            var clonedPlayerPiece = $("#player-"+playerID+" .player-colour").clone();
            clonedPlayerPiece.attr("id","player-piece-"+playerID).attr("class","player-piece");
            clonedPlayerPiece.appendTo(".station:nth-of-type("+gameProgress+")");
        }
    }
    $(".player.old").remove();
    // setTimeout(getPlayers,500);
}

function iterateProjects(data) {
    $(".project").remove();
    var projectTemplate = $(".project-template");
    var tempProjects = data.split(";");
    for (i=0;i<tempProjects.length;i++) {
        var project = tempProjects[i].split(",");
        var projectID = project[0];
        var projectName = project[1];
        var projectCost = project[2];
        var projectEmp = project[3];

        if (projectID && projectName) {
            var clonedProjectTemplate = projectTemplate.clone();
            clonedProjectTemplate.attr("id","project-"+projectID).attr("class","project");
            clonedProjectTemplate.appendTo("#game-projects");

            $("#project-"+projectID+" .project-name").html(projectName);
            $("#project-"+projectID+" .project-cost").html("£"+projectCost);
            $("#project-"+projectID+" .project-emp").html("Need: "+projectEmp);
        }
    }
    // setTimeout(getProjects,5000);
}

// function move(pData,dir) {
//     playerData = pData.split(",");
//     pPos = parseInt(playerData[4]);
//     if (dir=="forward" && playerData[4] < 15) {
//         $.ajax({
//             url: "../database.php?action=setPlayerData&uID="+playerData[0]+"&col=gameProgress&val="+(pPos+1),
//             success: function(results) {
//             }
//         });
//     } else if (dir=="back" && playerData[4] > 0) {
//         $.ajax({
//             url: "../database.php?action=setPlayerData&uID="+playerData[0]+"&col=gameProgress&val="+(pPos-1),
//             success: function(results) {
//             }
//         });
//     }
// }

// function movePlayer(pID, dir) {
//     $.ajax({
//         url: "../database.php?action=getPlayer&uID="+pID,
//         //dataType: "json",
//         success: function(results) {
//             move(results,dir);
//         }
//     });
// }

function getPlayers() {
    
    $.ajax({
        url: "../database.php?action=getAllPlayers",
        //dataType: "json",
        success: function(results) {
            // console.log(results);
            iteratePlayers(results);
        }
    });
}

function getProjects() {
    
    $.ajax({
        url: "../database.php?action=getAllProjects",
        //dataType: "json",
        success: function(results) {
            // console.log(results);
            iterateProjects(results);
        }
    });
}

function displayProjectLightbox(data) {
    var lightbox = $("#lightbox");
    var projectData = data.split(",");
    lightbox.html("<input type=\"button\" value=\"X\" class=\"close-preview\"><section id=\"project-details\"> <p class=\"project-name\">"+projectData[1]+"</p> <p class=\"project-status\">"+projectData[3]+"</p> <p class=\"project-cost\">"+projectData[2]+"</p> <p class=\"project-required\">"+projectData[4]+"</p> <p class=\"project-player\">"+projectData[5]+"</p> </section> ");
    lightbox.css("display","flex");
}

function showProjectDetails(pID) {
    $.ajax({
        url: "../database.php?action=getProj&pID="+pID,
        //dataType: "json",
        success: function(results) {
            console.log(results);
            displayProjectLightbox(results);
        }
    });
}

function setPlayerColour(uID,R,G,B) {
    var hexR=parseInt(R,10).toString(16);
    var hexG=parseInt(G,10).toString(16);
    var hexB=parseInt(B,10).toString(16);
    hexR = (hexR.length==1?"0"+hexR:hexR);
    hexG = (hexG.length==1?"0"+hexG:hexG);
    hexB = (hexB.length==1?"0"+hexB:hexB);
    $.ajax({
        url: "../database.php?action=setPlayerData&uID="+uID+"&col=userColour&val="+hexR+hexG+hexB,
        //dataType: "json",
        success: function(results) {
            console.log("set "+uID+" colour to #"+hexR+hexG+hexB);
        }
    });
}

function drawLines() {
    for (var i=1;i<16;i++) {
        var line = $("#line"+i);
        var p1 = $(".station:nth-of-type("+i+")");
        var p2 = $(".station:nth-of-type("+(i+1)+")");
        var pos1 = p1.position();
        var pos2 = p2.position();
        line
            .attr('x1',pos1.left+25)
            .attr('y1',pos1.top+25)
            .attr('x2',pos2.left+25)
            .attr('y2',pos2.top+25);
    }
}
function drawTime(time) {
    var month = "";
    switch(time%12) {
        case 1:
            month = "January";
            break;
        case 2:
            month = "February";
            break;
        case 3:
            month = "March";
            break;
        case 4:
            month = "April";
            break;
        case 5:
            month = "May";
            break;
        case 6:
            month = "June";
            break;
        case 7:
            month = "July";
            break;
        case 8:
            month = "August";
            break;
        case 9:
            month = "September";
            break;
        case 10:
            month = "October";
            break;
        case 11:
            month = "November";
            break;
        case 0:
            month = "December";
            break;
        default:
            month = "not good";
    }
    var year = Math.floor((time-1)/12) + 1890;
    $("#game-time").text(month+" "+year);
}

// function setPlayerFunds(playerID,money) {
//     $.ajax({
//         url: "../database.php?action=setPlayerData&uID="+playerID+"&col=projectMoney&val="+money,
//         success: function(result) {
//         }
//     });
// }

// function iteratePlayerIncome(players) {
//     var tempPlayers = players.split(";");
//     for (i=0;i<tempPlayers.length;i++) {
//         var player = tempPlayers[i].split(",");
//         var playerID = player[0];
//         var playerMoney = player[2];
//         var playerIncome = player[5];
//         var newMoney = (parseFloat(playerMoney) + parseFloat(playerIncome)).toFixed(2);
//         $("#player-"+playerID+" .funds").html(newMoney+" (+"+playerIncome+")");
//         setPlayerFunds(playerID,newMoney);
//     }
// }

// function givePlayersIncome() {
//     $.ajax({
//         url: "../database.php?action=getAllPlayers",
//         success: function(players) {
//             iteratePlayerIncome(players);
//         }
//     });
// }

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

function updateTime() {
    gID=1;
    $.ajax({
        url: "../database.php?action=getGameTime&gID="+gID,
        success: function(time) {
            drawTime(parseInt(time));
        }
    });
}

function refreshScreen(i) {
    getPlayers();
    if (i=0) {
        getProjects();
        updateTime();
    }
    if (i=5) {
        i=0;
    } else {
        i +=1;
    }
    console.log("refresh - i="+i);
    //setTimeout(refreshScreen(i),1000);
}

$(document).ready(function() {
    refreshScreen(0);
    drawLines();
    // getPlayers();
    // getProjects();
    // drawLines();
    // updateTime();
    window.addEventListener("resize", drawLines);
    $("#clearStorage").click(function(event) {
        event.preventDefault();
        localStorage.clear();
    })
    $(document).on('click',".more-info",function() {
        var ID = $(this).parent().attr("id");
        var pID = ID.split("-")[1]
        console.log("pID: "+pID);
        showProjectDetails(pID);
    });
    $(document).on('click',".close-preview",function() {
        $("#lightbox").css("display","none");
    });
    // $("#delete-players").click(function(event) {
    //     $.ajax({
    //         url: "../database.php?action=deleteAllPlayers",
    //         //dataType: "json",
    //         success: function(results) {
    //         }
    //     });
    // });
    // $("#reset-time").click(function(event) {
    //     $.ajax({
    //         url: "../database.php?action=setGameTime&gID=1&time=0",
    //         success: function(results) {
    //         }
    //     });
    //     $.ajax({
    //         url: "../database.php?action=resetMoney&gID=1",
    //         success: function(results) {
    //         }
    //     });
    // });
    // $(document).on('click',".back-forward input",function() {
    //     var ID = $(this).parent().parent().attr("id");
    //     var pID = ID.split("-")[1];
    //     var dir = $(this).attr("class");
    //     movePlayer(pID,dir);
    // });
    $(document).on('click',".colour-form input[type=button]",function() {
        var ID = $(this).parent().parent().attr("id");
        var pID = ID.split("-")[1];
        var R = $(this).parent().children("input:nth-of-type(1)").val();
        var G = $(this).parent().children("input:nth-of-type(2)").val();
        var B = $(this).parent().children("input:nth-of-type(3)").val();
        setPlayerColour(pID,R,G,B);
    });
    // $(".project-template").click(function(event) {
    //     event.preventDefault();
        
    //     //var pID = $(this.attr("id"));
    //     //console.log("pID: "+pID);
    //     //showProjectDetails(pID);
    // });
});