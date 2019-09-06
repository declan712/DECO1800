
function updateProject(data) {
    var projectData = data.split(",");
    $("#project-details .project-name").html(projectData[1]);
    $("#project-details .project-status").html("Completion: "+projectData[3]);
    $("#project-details .project-cost").html("Project Cost: £"+projectData[2]);
    $("#project-details .project-required").html("Employee Required: "+projectData[4]);
    $("#project-details .project-player").html("userID: "+projectData[5]);
}


function getProject(pID) {
    $.ajax({
        url: "../database.php?action=getProj&pID="+pID,
        //dataType: "json",
        success: function(results) {
            console.log(results);
            updateProject(results);
        }
    });
}


$(document).ready(function() {
    getProject("00000001");

    $("#clearStorage").click(function(event) {
        event.preventDefault();
        localStorage.clear();
    })
});