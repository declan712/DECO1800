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

        if ( $("#player-"+playerID).length ) {
            $("#player-"+playerID).removeClass("old");
            $("#player-"+playerID+" .username").html(playerName);
            $("#player-"+playerID+" .funds").html(playerMoney);
            $("#player-"+playerID+" .player-colour").css("background-color","#"+playerColour);

            var clonedPlayerPiece = $("#player-"+playerID+" .player-colour").clone();
            clonedPlayerPiece.attr("id","player-piece-"+playerID).attr("class","player-piece");
            clonedPlayerPiece.appendTo(".station:nth-of-type("+gameProgress+")");

        } else if (playerID && playerName) {
            var clonedPlayerTemplate = playerTemplate.clone();
            clonedPlayerTemplate.attr("id","player-"+playerID).attr("class","player");
            clonedPlayerTemplate.appendTo("#game-players");

            $("#player-"+playerID+" .username").html(playerName);
            $("#player-"+playerID+" .funds").html(playerMoney);
            $("#player-"+playerID+" .player-colour").css("background-color","#"+playerColour);

            var clonedPlayerPiece = $("#player-"+playerID+" .player-colour").clone();
            clonedPlayerPiece.attr("id","player-piece-"+playerID).attr("class","player-piece");
            clonedPlayerPiece.appendTo(".station:nth-of-type("+gameProgress+")");
        }
    }
    $(".player.old").remove();
    setTimeout(getPlayers,500);
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
    setTimeout(getProjects,5000);
}

function move(pData,dir) {
    playerData = pData.split(",");
    pPos = parseInt(playerData[4]);
    if (dir=="forward" && playerData[4] < 15) {
        $.ajax({
            url: "../database.php?action=movePlayer&uID="+playerData[0]+"&pos="+(pPos+1),
            success: function(results) {
            }
        });
    } else if (dir=="back" && playerData[4] > 0) {
        $.ajax({
            url: "../database.php?action=movePlayer&uID="+playerData[0]+"&pos="+(pPos-1),
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

function setPLayerColour(uID,R,G,B) {
    var hexR=parseInt(R,10).toString(16);
    var hexG=parseInt(G,10).toString(16);
    var hexB=parseInt(B,10).toString(16);
    hexR = (hexR.length==1?"0"+hexR:hexR);
    hexG = (hexG.length==1?"0"+hexG:hexG);
    hexB = (hexB.length==1?"0"+hexB:hexB);
    $.ajax({
        url: "../database.php?action=setPlayerColour&uID="+uID+"&colour="+hexR+hexG+hexB,
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

$(document).ready(function() {
    getPlayers();
    getProjects();
    drawLines();
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
    $("#delete-players").click(function(event) {
        $.ajax({
            url: "../database.php?action=deleteAllPlayers",
            //dataType: "json",
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
        setPLayerColour(pID,R,G,B);
    });
    // $(".project-template").click(function(event) {
    //     event.preventDefault();
        
    //     //var pID = $(this.attr("id"));
    //     //console.log("pID: "+pID);
    //     //showProjectDetails(pID);
    // });
});