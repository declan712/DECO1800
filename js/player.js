var playerFunds = 0.00;
var playerIncome = 0.00;
var playerName = "LOADING"
var uID;
var playerColour;
var progress;


function playSound(type) {
    var file = "";
    switch (type) {
        case "fail":
            file = "../audio/wrong.mp3";
            break;
        case "pass":
            file = "../audio/right.mp3";
            break;
        case "bonus":
                file = "../audio/fanfare.mp3";
            break;
        case "sab":
                file = "../audio/evil.mp3";
            break;
        case "click":
                file = "../audio/click.mp3";
            break;
    }
    var audio = new Audio(file);
    audio.play();
}

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
    $("#income").text(playerIncome);
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
            playerIncome = playerData[5];
            progress = playerData[4];
        }
    });
}
function strToWage(str) {
    arr = (str.split(";")[0]).split(" ");
    var X = 0;
    var Xmult = 0;
    var Y = 0;
    var Ymult = 0;
    var T = 0;
    // X things per T
    // OR
    // X things Y other per T
    X = parseInt(arr[0]);
    switch (arr[1]) {
        case "pence":
            Xmult=1;
            break;
        case "shillings":
            Xmult=12;
            break;
        case "pounds":
            Xmult=240;
            break;
    }
    if (arr[2] == "per") {
        switch (arr[3]) {
            case "day":
                T = 0.05;
                break;
            case "week":
                T = 0.25;
                break;
            case "month":
                T = 1;
                break;
            case "annum":
                T = 12;
                break;
        }
    } else {
        Y = parseInt(arr[2]);
        switch (arr[3]) {
            case "pence":
                Ymult=1;
                break;
            case "shillings":
                Ymult=12;
                break;
            case "pounds":
                Ymult=240;
                break;
        }
        switch (arr[5]) {
            case "day":
                T = 0.05;
                break;
            case "week":
                T = 0.25;
                break;
            case "month":
                T = 1;
                break;
            case "annum":
                T = 12;
                break;
        }
    }

    var wage = ((X*Xmult + Y*Ymult)/(240*T)).toFixed(2);
    return wage;
    // console.log(str+" -> "+wage);
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
                        empPay = "00.00";
                        empPay = strToWage(recordValue["Remuneration"]);//convert to number
                    });
                    var query = empPos.replace(/ /g,"|");
                    var imageData="../images/placeholder.jpg"
                    $.ajax({
                        url: "https://pixabay.com/api/?key=7227013-50ebabaacc01b845a5e54e34b&q="+query+"&image_type=photo&safesearch=true&category=people",
                        dataType: "jsonp",
                        cache: true,
                        success: function(results) {
                            if(results.hits.length > 0) {
                                imageData = results.hits[(Math.round(Math.random()*results.hits.length))].largeImageURL;
                                console.log("image: "+imageData);
                            }
                            
                            $.ajax({
                                url: "../database.php?action=createEmployee&uID="+uID+"&empName="+empName+"&empPos="+empPos+"&empDep="+empDep+"&empPay="+empPay+"&empProd="+productivity+"&empEdu="+education+"&empExp="+experience+"&img="+imageData,
                                //dataType: "json",
                                success: function(results) {
                                    console.log("createEmpResults: "+results)
                                    if (!results.includes("ERROR")) {
                                    // if (1) {
                                        $.ajax({
                                            url: "../database.php?action=empToProj&empID="+results+"&pID="+proj+"&pos="+option,
                                            success: function(result2) {
                                                console.log("Emp Created.")
                                            }
                                        });
                                    }
                                    
                                }
                            });

                        }
                    });



                }
              });

        }
      });

}
function iterateSabProjects(data) {
    // projectID|projectName|projectCost|targetPlayer|userEffect|targetEffect
    $(".sab-project").remove();
    var projectTemplate = $(".sab-template");
    var tempProjects = data.split(";");
    for (i=0;i<tempProjects.length;i++) {
        var project = tempProjects[i].split("|");
        var projectID = project[0];
        var projectName = project[1];
        var projectCost = project[2];
        var target = project[3];
        var effect = project[4];

        if (projectID && projectName) {
            var clonedProjectTemplate = projectTemplate.clone();
            clonedProjectTemplate.attr("id","sab-"+projectID).attr("class","sab-project");
            clonedProjectTemplate.appendTo("#sab-projects");

            $("#sab-"+projectID+" .project-name").html(projectName);
            $("#sab-"+projectID+" .project-cost").html("£"+projectCost);
            $("#sab-"+projectID+" .sab-effect").html(effect);
            $("#sab-"+projectID+" .sab-details").html(tempProjects[i]);
        }
    }
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
    $.ajax({
        url: "../database.php?action=getSabProjects&uID="+uID,
        //dataType: "json",
        success: function(results) {
            // console.log(results);
            iterateSabProjects(results);
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

                    $("#lightbox .employee:nth-of-type(1) img").attr("src",emp1[8]);
                    $("#lightbox .employee:nth-of-type(2) img").attr("src",emp2[8]);

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

function displayProjectLightbox(template,data,attempt) {
    var lightbox = $("#lightbox");
    var projectData = data.split("|");
    lightbox.html(template);
    $("#lightbox .project-name").html(projectData[1]);
    $("#lightbox .project-cost").html(projectData[2]);
    $("#lightbox .project-required").html(projectData[4]);
    $("#project-string").html(data);
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
        if (attempt <3) {
            setTimeout(showProjectDetails,1000,projectData[0],attempt+1);
        } else {
            alert("something went wrong, please try again");
        }
    }
    
    // $.ajax({
    //     url: "../database.php?action=getEmployees&uID="+uID+"&empType="+projectData[4],
    //     success: function(results) {
    //         console.log(results)
    //     }
    // });
    
}

function showProjectDetails(pID,attempt) {
    $.ajax({
        url: "../database.php?action=getProj&pID="+pID,
        //dataType: "json",
        success: function(data) {
            $.ajax({
                url: "../player/player-project.php",
                success: function(template) {
                    displayProjectLightbox(template,data,attempt);
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

function bailPlayer(){
    var newFunds=Math.max(playerFunds/2,playerFunds-100);
    var newProg=parseInt(progress);
    var newInc=parseFloat(playerIncome);
    if (playerIncome <0) {
        newInc = 5.00;
    } else {
        newInc += 5.00;
    }
    if (newProg > 0) {
        newProg -= 1;
    } else {
        newInc = 5.00;
    }
    
    $.ajax({
        url: "../database.php?action=setPlayerData&uID="+uID+"&col=projectMoney&val="+newFunds,
        success: function(result) {
            $.ajax({
                url: "../database.php?action=setPlayerData&uID="+uID+"&col=userIncome&val="+newInc,
                success: function(result) {
                    $.ajax({
                        url: "../database.php?action=setPlayerData&uID="+uID+"&col=gameProgress&val="+newProg,
                        success: function(result) {
                            playSound("fail");
                        }
                    });
                }
            });
        }
    });
}

function executeSabotage(details) {
    //pID | name | cost | targetID | effect
    var sab = details.split("|");
    var sabName = sab[1].replace(/ /g,"+");

    if (playerFunds >= parseFloat(sab[2])) {
        var sabType = sab[4].split(",");
        var uNewFund = parseFloat(playerFunds) - parseFloat(sab[2]);

        $.ajax({
            url: "../database.php?action=getPlayer&uID="+sab[3],
            //dataType: "json",
            success: function(result) {
                //uID | nam | funds | colour | prog | inc
                var targetData = result.split("|");
                var tID = targetData[0];
                var tFund = targetData[2]
                var tProg = targetData[4];
                var tInc = targetData[5];

                var sabText= uID+"|"+tID+"|"+sabType[0]+"|"+sabType[1]+"|"+playerName+"+Completed+Project:+"+sabName;
    
                switch(sabType[0]) {
                    case "PROG":
                        var uNewProg = Math.min(15,parseInt(progress)+1);
                        var tNewProg = Math.max(0,parseInt(tProg)-1);
                        console.log(sabText);//-----------------
                        $.ajax({
                            url: "../database.php?action=setPlayerData&uID="+uID+"&col=projectMoney&val="+uNewFund,
                            success: function(result) {
                                $.ajax({
                                    url: "../database.php?action=setPlayerData&uID="+tID+"&col=gameProgress&val="+tNewProg,
                                    success: function(result) {
                                        $.ajax({
                                            url: "../database.php?action=setPlayerData&uID="+uID+"&col=gameProgress&val="+uNewProg,
                                            success: function(result) {
                                                $.ajax({
                                                    url: "../database.php?action=sabComplete&pID="+sab[0]+"&sabText="+sabText,
                                                    success: function(result) {
                                                        getProjects();
                                                        playSound("sab");
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                        break;
                    case "INC":
                        var uNewInc = parseFloat(playerIncome)+parseFloat(sabType[1]);
                        var tNewInc = parseFloat(tInc) - parseFloat(sabType[1]);
                        sabText += "+taking+%A3"+sabType[1]+"+per+month.";
                        console.log(sabText);//---------------
                        $.ajax({
                            url: "../database.php?action=setPlayerData&uID="+uID+"&col=projectMoney&val="+uNewFund,
                            success: function(result) {
                                $.ajax({
                                    url: "../database.php?action=setPlayerData&uID="+tID+"&col=userIncome&val="+tNewInc,
                                    success: function(result) {
                                        $.ajax({
                                            url: "../database.php?action=setPlayerData&uID="+uID+"&col=userIncome&val="+uNewInc,
                                            success: function(result) {
                                                $.ajax({
                                                    url: "../database.php?action=sabComplete&pID="+sab[0]+"&sabText="+sabText,
                                                    success: function(result) {
                                                        getProjects();
                                                        playSound("sab");
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                        break;
                    case "FUND":
                            uNewFund += parseFloat(sabType[1]);
                            var tNewFund = parseFloat(tFund) - parseFloat(sabType[1]);
                            sabText += "+taking+%A3"+parseFloat(sabType[1])+".";
                            console.log(sabText);//-----------------
                                $.ajax({
                                    url: "../database.php?action=setPlayerData&uID="+tID+"&col=projectMoney&val="+tNewFund,
                                    success: function(result) {
                                        $.ajax({
                                            url: "../database.php?action=setPlayerData&uID="+uID+"&col=projectMoney&val="+uNewFund,
                                            success: function(result) {
                                                $.ajax({
                                                    url: "../database.php?action=sabComplete&pID="+sab[0]+"&sabText="+sabText,
                                                    success: function(result) {
                                                        getProjects();
                                                        playSound("sab");
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                        break;
                }
    

            }
        });

    } else {
        alert("You cant afford this");
    }
    
    

}

function hireEmployee(empDetails,projDetails) {
    var empData = empDetails.split("|");
    var projData = projDetails.split("|");
    // empID|empName|empPos|empDep|empPay|empProd|empEdu|empExp
    // pID|projectName|projectCost|projectComplete|empRequired|projectPlayer|emp1|emp2

    //playerFunds
    //playerIncome
    //pCost = projData[2]
    //eWage = empData[4]
    var funds = parseFloat(projData[2]);
    var wage = parseFloat(empData[4]);

    var newProg = parseInt(progress);
    var newFunds = playerFunds;
    var newInc = playerIncome;

    if (playerFunds < funds ){
        alert("You're too poor for that");
    }
    if (playerIncome <= wage) {
        alert("you'll be losing money if this doesnt pay off");
    }
    if (playerFunds >= funds ) {
        newFunds = playerFunds-funds;
        newInc = playerIncome-wage;
        var projStatus = "Incomplete;"

        var failChance = Math.max(0,10-parseInt(empData[7])+Math.random()-0.5)/10;
        if (Math.random() < failChance) {
            // console.log("project failed. RIP");
            projStatus="Project Failed";
            playSound("fail");
        } else {

            newProg = Math.min(parseInt(progress)+1,15);
            var reward = (Math.random()+0.5)*(parseInt(empData[5])/5)*(wage+funds/10);
            // console.log("you passed, getting and extra "+reward.toFixed(2)+" per month");
            newInc += reward;
            projStatus = "Project Successful"
            playSound("pass");

            var bonusChance = (parseInt(empData[6])+ 2*Math.random()-1)/15;
            if (Math.random() < bonusChance) {
                newInc += 3*wage;
                projStatus = "Project Very Successful"
                playSound("bonus");
                // console.log("yay you get extra money");
            }

        }
    newInc = newInc.toFixed(2);
    newFunds = newFunds.toFixed(2);
    var incDiff = ((newInc-playerIncome) >=0)?"+"+(newInc-playerIncome).toFixed(2):(newInc-playerIncome).toFixed(2);
    console.log("progress: "+newProg);
    console.log("income: "+newInc);
    console.log("funds: "+newFunds);
    var projectResult = "<input type=\"button\" value=\"X\" class=\"close-preview\"> <section class=\"project-result\"><h1>"+projStatus+"</h1> <p> Railway Completion: "+(Math.round((newProg+1)*100/16))+"%</P> <p>Remaining Funds: £"+newFunds+"</p> <p>Income: "+newInc+"/month (£"+incDiff+")</p></section>";
    $.ajax({
        url: "../database.php?action=hireEmp&pID="+projData[0]+"&empID="+empData[0]+"&uID="+uID+"&funds="+newFunds+"&inc="+newInc+"&prog="+newProg,
        success: function(template) {
            // $(".lightbox").css("display","none");
            $("#lightbox").html(projectResult);
            $("#lightbox").addClass("result");
            getProjects();
            getPlayer();
        }
    });
    }   

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
        playSound("click");
    });
    $(document).on('click',".project",function() {
        //start loading animation
        var ID = $(this).attr("id");
        var pID = ID.split("-")[1]
        console.log("pID: "+pID);
        playSound("click");
        showProjectDetails(pID,1);
    });
    $(document).on('click',".sabotage",function() {
        //start loading animation
        var details = $(this).parent().children(".sab-details").text();
        console.log("sab: "+details);
        executeSabotage(details);
    });
    $(document).on('click',"#lightbox .close-preview",function() {
        $("#lightbox").removeClass("result");
        $("#lightbox").css("display","none");
        playSound("click");
    });
    $(document).on('click',"#instructions .close-preview",function() {
        localStorage.setItem("intro","read");
        $("#instructions").css("display","none");
        playSound("click");
    });
    $(document).on('click',"#lightbox .employee .emp-hire",function() {
        var empDetails = $(this).parent().children(".emp-details").text();
        var projDetails = $(this).parent().parent().children("#project-details").children("#project-string").text();
        //------for debugging ----{
        var empID = (empDetails).split("|")[0];
        var projID = (projDetails).split("|")[0];
        console.log("attempt to hire: "+empID+" for project: "+projID);
        //-----}
        playSound("click");
        hireEmployee(empDetails,projDetails);
    });
    $(document).on('click',".colour-form input[type=button]",function() {
        var R = $(this).parent().children("input:nth-of-type(1)").val();
        var G = $(this).parent().children("input:nth-of-type(2)").val();
        var B = $(this).parent().children("input:nth-of-type(3)").val();
        setPlayerColour(R,G,B);
        playSound("click");
    });
    $("#show-intro").click(function(event) {
        event.preventDefault();
        $("#instructions").css("display","flex");
        playSound("click");
    });
    $(".bail-out").click(function(event) {
        event.preventDefault();
        playSound("click");
        bailPlayer();
    })
});