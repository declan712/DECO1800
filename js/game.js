
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



$(document).ready(function() {
    getPlayers();
    getProjects();

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
    // $(".project-template").click(function(event) {
    //     event.preventDefault();
        
    //     //var pID = $(this.attr("id"));
    //     //console.log("pID: "+pID);
    //     //showProjectDetails(pID);
    // });
});