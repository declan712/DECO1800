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
    $(".username").text(playerName);
    setTimeout(updatePlayer, 2000);
}
function checkUID() {
    if (!(uID=localStorage.getItem("uID"))) {
        console.log("No user ID found");
        //localStorage.setItem("uID", "1");
        //console.log("setting uID to 1");
        //uID = localStorage.getItem("uID");
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
    checkUID();
    updatePlayer();
    getProjects();
    if (localStorage.getItem("intro") != "read") {
        $("#instructions").css("display","flex");
    }

    $("#clearStorage").click(function(event) {
        event.preventDefault();
        localStorage.clear();
    });
    $(document).on('click',".more-info",function() {
        var ID = $(this).parent().attr("id");
        var pID = ID.split("-")[1]
        console.log("pID: "+pID);
        showProjectDetails(pID);
    });
    $(document).on('click',"#lightbox .close-preview",function() {
        $("#lightbox").css("display","none");
    });
    $(document).on('click',"#instructions .close-preview",function() {
        localStorage.setItem("intro","read");
        $("#instructions").css("display","none");
    });
});