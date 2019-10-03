var playerFunds = 0.00;
var playerIncome = 0.00;
var playerName = "LOADING"
var uID;
var playerColour;


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
    // getPlayer();
    var funds = toShillings(playerFunds);
    $("#funds").text("£"+funds[0]+(funds[1]>0?", "+funds[1]+" Shillings":"")+(funds[2]>0?", "+funds[2]+" Pence":""));
    $(".username").text(playerName);
    $(".player-colour").css("background-color","#"+playerColour);
    
    
    // setTimeout(updatePlayer, 5000);
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
    $("#loading-bar").css("transition-duration","0s");
    $("#loading-bar").css("width","0%");
    setTimeout(function() {
        $("#loading-bar").css("transition-duration","5s");
        $("#loading-bar").css("width","100%");
    },10);
    uID = localStorage.getItem("uID");
    $.ajax({
        url: "../database.php?action=getPlayer&uID="+uID,
        //dataType: "json",
        success: function(results) {
            console.log(results);
            var playerData = results.split("|");
            playerName = playerData[1];
            playerFunds = playerData[2];
            playerColour = playerData[3];
        }
    });
}
function strToWage(str) {
    //do something
}

function generateEmployee(prof,proj,option) {
    var resource_id = 'cdafbbbf-c9ca-46a1-9f18-ecd9e8943040';
    $.ajax({
        url: 'https://data.qld.gov.au/api/3/action/datastore_search_sql?sql=SELECT COUNT(*) FROM %22'+resource_id+'%22 WHERE %22Position%22 LIKE %27%25'+prof+'%25%27',//OFFSET n to select nth row
        // data: data,
        dataType: 'jsonp',
        cache: true,
        success: function(count) {
            //console.log(count.result.records[0].count);
            var off = Math.floor(Math.random()*parseInt(count.result.records[0].count));
            console.log("random number: "+off);
            $.ajax({
                url: 'https://data.qld.gov.au/api/3/action/datastore_search_sql?sql=SELECT * FROM %22'+resource_id+'%22 WHERE %22Position%22 LIKE %27%25'+prof+'%25%27 LIMIT 1 OFFSET '+off,//OFFSET n to select nth row
                dataType: 'jsonp',
                cache: true,
                success: function(empData) {
                    var education = Math.floor(Math.random()*10);
                    var experience = Math.floor(Math.random()*10);
                    var productivity = Math.min(10,(Math.random()+0.5)*(education+experience)/2);
                    var empName = "Badname";
                    var empPos = "badpos";
                    var empDep = "baddep";
                    var empPay = "12.34";

                    $.each(empData.result.records, function(recordID, recordValue) {
                        empName = recordValue["Name"];
                        empPos = recordValue["Position"];
                        empDep = recordValue["Branch"];
                        empPay = "30.00";
                        // empPay = recordValue["Remuneration"];//convert to number
                    });
                    $.ajax({
                        url: "../database.php?action=createEmployee&uID="+uID+"&empName="+empName+"&empPos="+empPos+"&empDep="+empDep+"&empPay="+empPay+"&empProd="+productivity+"&empEdu="+education+"&empExp="+experience,
                        //dataType: "json",
                        success: function(results) {
                            console.log("createEmpResults: "+results)
                            $.ajax({
                                url: "../database.php?action=empToProj&empID="+results+"&pID="+proj+"&pos="+option,
                                success: function(result2) {
                                    console.log("Emp Created.")
                                }
                            });
                            //updata project with employee ID
                            //output employee data here
                        }
                    });
                }
              });

        }
      });

}

function iterateProjects(data) {
    $(".project").remove();
    var projectTemplate = $(".project-template");
    var tempProjects = data.split(";");
    for (i=0;i<tempProjects.length;i++) {
        var project = tempProjects[i].split("|");
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
function getProjects() {
    $.ajax({
        url: "../database.php?action=getAllProjects&uID="+uID,
        //dataType: "json",
        success: function(results) {
            // console.log(results);
            iterateProjects(results);
        }
    });
}

function displayEmployees(eID1,eID2) {
    $.ajax({
        url: "../database.php?action=getEmployee&empID="+eID1,
        success: function(R1) {
            $.ajax({
                url: "../database.php?action=getEmployee&empID="+eID2,
                success: function(R2) {
                    // console.log("R1: "+R1+", R2: "+R2);
                    emp1 = R1.split("|");
                    emp2 = R2.split("|");
                    $("#lightbox .employee:nth-of-type(1) .emp-details").text(R1);
                    $("#lightbox .employee:nth-of-type(2) .emp-details").text(R2);
                    //name
                    $("#lightbox .employee:nth-of-type(1) .emp-name").text(emp1[1]);
                    $("#lightbox .employee:nth-of-type(2) .emp-name").text(emp2[1]);
                    //job
                    $("#lightbox .employee:nth-of-type(1) .emp-job").text(emp1[2]);
                    $("#lightbox .employee:nth-of-type(2) .emp-job").text(emp2[2]);
                    //price
                    $("#lightbox .employee:nth-of-type(1) .emp-price").text(emp1[4]);
                    $("#lightbox .employee:nth-of-type(2) .emp-price").text(emp2[4]);
                    //stats
                    $("#lightbox .employee:nth-of-type(1) .emp-stats .stat-bar:nth-of-type(1)").text(emp1[5]);

                    $("#lightbox .employee:nth-of-type(1) .emp-stats .stat-bar:nth-of-type(2)").text(emp1[6]);
                    $("#lightbox .employee:nth-of-type(1) .emp-stats .stat-bar:nth-of-type(3)").text(emp1[7]);
                    $("#lightbox .employee:nth-of-type(2) .emp-stats .stat-bar:nth-of-type(1)").text(emp2[5]);
                    $("#lightbox .employee:nth-of-type(2) .emp-stats .stat-bar:nth-of-type(2)").text(emp2[6]);
                    $("#lightbox .employee:nth-of-type(2) .emp-stats .stat-bar:nth-of-type(3)").text(emp2[7]);

                    // $(".stat-bar").css("background","linear-gradient(to right, green "+$(this).text()+"0%, #222222 "+$(this).text()+"1%)");
                    $.each($(".stat-bar"),function() {
                        var t = $(this).text();
                        $(this).css("background","linear-gradient(to right, green "+t*10+"%, #222222 "+(t*10+1)+"%)");
                    });
                }
            });
        }
    });
}

function displayProjectLightbox(template,data) {
    var lightbox = $("#lightbox");
    var projectData = data.split("|");
    lightbox.html(template);
    $("#lightbox .project-name").html(projectData[1]);
    $("#lightbox .project-cost").html(projectData[2]);
    $("#lightbox .project-status").html(projectData[3]);
    $("#lightbox .project-required").html(projectData[4]);
    var emp1 = projectData[6];
    var emp2 = projectData[7];
    if (!emp1 || emp1=="0"){
        console.log("emp1 not found");
        generateEmployee(projectData[4],projectData[0],1);
    }
    if (!emp2 || emp2=="0"){
        console.log("emp2 not found");
        generateEmployee(projectData[4],projectData[0],2);
    }
    if (emp1 && emp2) {
        displayEmployees(emp1,emp2);
        lightbox.css("display","flex");
    }
    else {
        console.log("nope");
        setTimeout(showProjectDetails,1000,projectData[0]);
    }
    
    // $.ajax({
    //     url: "../database.php?action=getEmployees&uID="+uID+"&empType="+projectData[4],
    //     success: function(results) {
    //         console.log(results)
    //     }
    // });
    
}

function showProjectDetails(pID) {
    $.ajax({
        url: "../database.php?action=getProj&pID="+pID,
        //dataType: "json",
        success: function(data) {
            $.ajax({
                url: "../player/player-project.php",
                success: function(template) {
                    displayProjectLightbox(template,data);
                }
            });
        }
    });
}

function setPlayerColour(R,G,B) {
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
            getPlayer();
        }
    });
}

$(document).ready(function() {
    checkUID();
    getPlayer();
    setInterval(getPlayer,5000);
    setInterval(updatePlayer,1000);
    setInterval(getProjects,5000);
    // updatePlayer();
    // getProjects();
    if (localStorage.getItem("intro") != "read") {
        $("#instructions").css("display","flex");
    }

    $("#clearStorage").click(function(event) {
        event.preventDefault();
        localStorage.clear();
    });
    $(document).on('click',".more-info",function() {
        //start loading animation
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
    $(document).on('click',"#lightbox .employee .emp-hire",function() {
        var empDetails = $(this).parent().children(".emp-details").text();
        console.log("hire: "+empDetails);
    });
    $(document).on('click',".colour-form input[type=button]",function() {
        var R = $(this).parent().children("input:nth-of-type(1)").val();
        var G = $(this).parent().children("input:nth-of-type(2)").val();
        var B = $(this).parent().children("input:nth-of-type(3)").val();
        setPlayerColour(R,G,B);
    });
    $("#show-intro").click(function(event) {
        event.preventDefault();
        $("#instructions").css("display","flex");
    })
});