var players = [];
var positions = [];
var currentMonth = 0;
var suburbs=[];
// uID, name, money, progress, colour, income

function iteratePlayers(data) {
    $(".player").addClass("old");
    $(".player-piece").remove();
    var playerTemplate = $(".player-template");
    var tempPlayers = data.split(";");
    players = [];
    for (i=0;i<tempPlayers.length;i++) {
        var player = tempPlayers[i].split("|");
        players[i] = player;
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
            $("#player-"+playerID).css("background","#"+playerColour+" linear-gradient(45deg, #222222AA 60%, transparent, #EEEEEE77)");//-------!


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
            $("#player-"+playerID).css("background","#"+playerColour+" linear-gradient(45deg, #222222AA 60%, transparent, #EEEEEE77)");//-------!

            var clonedPlayerPiece = $("#player-"+playerID+" .player-colour").clone();
            clonedPlayerPiece.attr("id","player-piece-"+playerID).attr("class","player-piece");
            clonedPlayerPiece.appendTo(".station:nth-of-type("+gameProgress+")");
        }
    }
    $(".player.old").remove();
    // setTimeout(getPlayers,500);
}

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



function getAlerts() {
    $.ajax({
        url: "../database.php?action=getAlerts",
        success: function(results) {
            // console.log(results);
            $(".alert").remove();
            var alertTemplate = $(".alert-template");
            var tempAlerts = results.split(";");

            for (i=0;i<tempAlerts.length;i++) {
                // alertID | userID | targetID | TYPE | AMOUNT | str
                var alertDetails = tempAlerts[i].split("|");
                var aID = alertDetails[0];
                var alertStr = alertDetails[5];
                if (aID && alertStr) {
                    alertStr = alertStr.replace("�","£");
                    var clonedAlertTemplate = alertTemplate.clone();
                    clonedAlertTemplate.attr("id","alert-"+aID).attr("class","alert");
                    clonedAlertTemplate.appendTo("#game-alerts");

                    $("#alert-"+aID+" .alert-text").html(alertStr);
                }
                
            }
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
        var stationwidth = parseInt($(".station").css("width"))/2;
        line
            .attr('x1',pos1.left+stationwidth)
            .attr('y1',pos1.top+stationwidth)
            .attr('x2',pos2.left+stationwidth)
            .attr('y2',pos2.top+stationwidth);
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
    
    if ($("#game-time p").text() != month+" "+year) {
        $("#progress-bar").css("transition-duration","0s");
        $("#progress-bar").css("width","1%");
        setTimeout(function(){
            $("#progress-bar").css("transition-duration","10s");
            $("#progress-bar").css("width","100%");
        },20);  
    }
    $("#game-time p").text(month+" "+year);
}

function getPositions() {
    var resource_id = 'cdafbbbf-c9ca-46a1-9f18-ecd9e8943040'
    var data = {
        resource_id: 'cdafbbbf-c9ca-46a1-9f18-ecd9e8943040', // the resource id
        limit: 500,
      };
      $.ajax({
        url: 'https://data.qld.gov.au/api/3/action/datastore_search_sql?sql=SELECT DISTINCT %22Position%22 FROM %22'+resource_id+'%22 ',
        data: data,
        dataType: 'jsonp',
        cache: true,
        success: function(data) {
            positions=data.result.records;
        }
      });
};

function generateProject() {
    var action = ["Upgrade","Maintenance","Construction"];
    var object = ["Station","Line"];
    var rand1 = Math.floor(Math.random()*suburbs.length);
    var rand2 = Math.floor(Math.random()*object.length);
    var rand3 = Math.floor(Math.random()*action.length);

    var pDetails = [];
    //project name
    pDetails[0] = suburbs[rand1]+" "+object[rand2]+" "+action[rand3];
    //project cost
    pDetails[1] = (Math.random()*(20+1.5*parseInt(currentMonth))).toFixed(2);
    //project employee
    pDetails[2] = positions[Math.round(Math.random()*positions.length)].Position;
    return pDetails;
}

function giveSabProject(user,target) {
    var projDetails = generateProject();
    projDetails[0] = "Sabotage "+target[1]+": ";
    var sabEffect;
    // types: 
    //      1. steal 1 place
    //      2. steal income
    //      3. steal money
    //      income debuff?
    var sabType = Math.round(Math.random()*2);
    switch (sabType) {
        case 0:
            projDetails[0] += "Steal a station";
            sabEffect = "PROG,1";
            break;
        case 1:
            projDetails[0] += "Steal employee";
            var rand = (Math.random()*target[5]*0.6).toFixed(2);
            sabEffect = "INC,"+rand;
            projDetails[1] = Math.min(projDetails[1],rand*5);
            break;
        case 2:
            projDetails[0] += "Steal cash";
            var rand = (Math.random()*target[2]*0.6).toFixed(2);
            sabEffect = "FUND,"+rand;
            projDetails[1] = Math.min(projDetails[1],rand*0.75);
            break;
    }
    $.ajax({
        url: "../database.php?action=givePlayerSabProject&userID="+user[0]+"&targetID="+target[0]+"&pName="+projDetails[0]+"&pCost="+projDetails[1]+"&sabEffect="+sabEffect,
        //dataType: "json",
        success: function(results) {
        }
    });
}

//  give each player a project, and a chance of getting a sabatage project
function giveProjects() {
    if (players.length < 2) {
        return 0;
    }
    var firstPlace = players[0];
    var fPos = parseInt(firstPlace[3]);
    console.log("first place: "+firstPlace[1]);
    var pDetails = generateProject();
    for(i=0; i<players.length;i++) {
        $.ajax({
            url: "../database.php?action=givePlayerProject&uID="+players[i][0]+"&pName="+pDetails[0]+"&pCost="+pDetails[1]+"&emp="+pDetails[2],
            //dataType: "json",
            success: function(results) {
            }
        });
        var curPos = parseInt(players[i][3])
        if ( curPos < fPos) {
            var sabChance = Math.round(((fPos-curPos)/10)*100);
            if (Math.random()*100 < sabChance) {
                console.log(players[i][1]+" is "+(fPos-curPos)+" places behind and gets a chance to sabotage");
                giveSabProject(players[i],firstPlace);
            }
            // console.log(players[i][1]+" is "+(fPos-curPos)+" places behind. Chance of sabotage: "+sabChance+"%");
        }
    }
}

function updateTime() {
    gID=1;
    $.ajax({
        url: "../database.php?action=getGameTime&gID="+gID,
        success: function(time) {
            currentMonth = time;
            drawTime(parseInt(time));
        }
    });
}

function loadSuburbs() {
    $.ajax({
        url: "../suburbs.txt",
        success: function(result) {
            suburbs = result.split("|");
        }
    });
}

function refreshScreen() {
    getPlayers();
    getAlerts();
    //getProjects();
    updateTime();
    // console.log("players: "+(players.length-1));
    // for (i=0;i<players.length-1;i++) {
    //     console.log("player "+i+": "+players[i]);
    // }
    setTimeout(refreshScreen,10000);
}

$(document).ready(function() {
    refreshScreen();
    drawLines();
    getPositions();
    loadSuburbs();


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

    $(document).on('click',".colour-form input[type=button]",function() {
        var ID = $(this).parent().parent().attr("id");
        var pID = ID.split("-")[1];
        var R = $(this).parent().children("input:nth-of-type(1)").val();
        var G = $(this).parent().children("input:nth-of-type(2)").val();
        var B = $(this).parent().children("input:nth-of-type(3)").val();
        setPlayerColour(pID,R,G,B);
    });

});