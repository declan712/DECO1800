<?php
$serverName = "localhost"; //serverName\instanceName
$username = "ic5c_player";
$password = "verysecure1";
$dbname = "ic5c_gameSettings";
$conn = new mysqli( $serverName, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " .$conn->connect_error);
} else {
    //echo("Connection established");
    checkReq();
}
function getProjectData($pID) {
    global $conn;
    $sql = "SELECT * FROM `gameProject` WHERE `projectID` = '".$pID."' LIMIT 1";
    $projectData = $conn->query($sql);
    if ($projectData->num_rows > 0) {
        $row = $projectData->fetch_assoc();
        echo($pID."|".$row["projectName"]."|".$row["projectCost"]."|".$row["projectComplete"]."|".$row["empRequired"]."|".$row["projectPlayer"]."|".$row["emp1"]."|".$row["emp2"]);
    } else {
        echo("ERROR: Project not found.");
    }
}

function getAllProjectData($uID) {
    global $conn;
    $sql = "SELECT * FROM `gameProject` WHERE `projectComplete` = 'NONE' && `projectPlayer` = '".$uID."'";
    $playerData = $conn->query($sql);
    if ($playerData->num_rows > 0) {
        while($row = $playerData->fetch_assoc()) {
            echo($row["projectID"]."|".$row["projectName"]."|".$row["projectCost"]."|".$row["empRequired"].";");
        }
    } else {
        echo("ERROR: No Projects Found");
    }
}

function getPlayerData($uID) {
    global $conn;
    $sql = "SELECT * FROM `userCreated` WHERE `userID` = '".$uID."' LIMIT 1";
    $playerData = $conn->query($sql);
    if ($playerData->num_rows > 0) {
        $row = $playerData->fetch_assoc();
        $playerName = $row["userName"];
        $playerMoney = $row["projectMoney"];
        $gameProgress = $row["gameProgress"];
        $playerColour = $row["userColour"];
        $playerIncome = $row["userIncome"];
        echo($uID."|".$playerName."|".$playerMoney."|".$playerColour."|".$gameProgress."|".$playerIncome);
    } else {
        echo("ERROR: Player not found.");
    }
}

function getAllPLayerData() {
    global $conn;
    $sql = "SELECT * FROM `userCreated` ORDER BY `gameProgress` DESC";
    $playerData = $conn->query($sql);
    if ($playerData->num_rows > 0) {
        while($row = $playerData->fetch_assoc()) {
            echo($row["userID"]."|".$row["userName"]."|".$row["projectMoney"]."|".$row["gameProgress"]."|".$row["userColour"]."|".$row["userIncome"].";");
        }
    } else {
        echo("ERROR: No Players Found");
    }
}

function createUser($name) {
    global $conn;
    $sql = "INSERT INTO `userCreated` (userName) VALUES ('".$name."')";
    $q1 = $conn->query($sql);
    sleep(2);
    $sql = "SELECT * FROM `userCreated` WHERE `userName` LIKE '".$name."' LIMIT 1";
    //echo("query: ".$sql);
    $userData = $conn->query($sql);
    if ($userData->num_rows > 0) {
       $row = $userData->fetch_assoc();
       echo($row["userID"]."|".$row["userName"]."|".$row["projectMoney"]);
    } else {
        echo("Error: unable to create user");
    }
}

// function setPlayerPos($uID,$pos) {//done
//     global $conn;
//     $sql = "UPDATE `userCreated` SET `gameProgress` = '".$pos."' WHERE `userID` = '".$uID."'";
//     $result = $conn->query($sql);
// }

// function setPlayerColour($uID,$colour) { //done
//     global $conn;
//     $sql = "UPDATE `userCreated` SET `userColour` = '".$colour."' WHERE `userID` = '".$uID."'";
//     $result = $conn->query($sql);
// }

function deletePlayers() {
    global $conn;
    $sql = "DELETE FROM `userCreated` WHERE `userID` > '1'";
    $result = $conn->query($sql);
}

function getGameTime($gID) {
    global $conn;
    $sql = "SELECT `gameTime` FROM `game` WHERE `gameID` = '".$gID."' LIMIT 1";
    $gameData = $conn->query($sql);
    if ($gameData->num_rows > 0) {
        $row = $gameData->fetch_assoc();
        echo($row["gameTime"]);
    } else {
        echo("ERROR: game not found.");
    }
}
function setGameTime($gID,$time) {
    global $conn;
    $sql = "UPDATE `game` SET `gameTime`='".$time."' WHERE `gameID` = '".$gID."'";
    $gameData = $conn->query($sql);
}

// function setPlayerMoney($uID,$playerMoney) { //done
//     global $conn;
//     $sql = "UPDATE `userCreated` SET `projectMoney`='".$playerMoney."' WHERE `userID` = '".$uID."'";
//     $gameData = $conn->query($sql);
// }

function resetGameMoney($gID) {
    global $conn;
    $sql = "UPDATE `userCreated` SET `projectMoney` = '0' WHERE `userID` > '1'";
    $gameData = $conn->query($sql);
}

function setPlayerData($uID,$col,$value) {
    global $conn;
    $sql="";
    switch($col) {
        case "projectMoney":
            $sql = "UPDATE `userCreated` SET `projectMoney` = '".$value."' WHERE `userID` = '".$uID."'";
        break;
        case "userColour":
            $sql = "UPDATE `userCreated` SET `userColour` = '".$value."' WHERE `userID` = '".$uID."'";
        break;
        case "gameProgress":
            $sql = "UPDATE `userCreated` SET `gameProgress` = '".$value."' WHERE `userID` = '".$uID."'";
        break;
        case "userIncome":
            $sql = "UPDATE `userCreated` SET `userIncome` = '".$value."' WHERE `userID` = '".$uID."'";
        break;
    }
    $playerData = $conn->query($sql);
}

function createEmployee($uID, $empName, $empPos, $empDep, $empPay, $empProd, $empEdu, $empExp, $empImg) {
    global $conn;
    $sql = "INSERT INTO `employee` (userID,empName,empPos,empDepartment,empPay,empProd,empEdu,empExp,empImg) 
            VALUES ('".$uID."','".$empName."','".$empPos."','".$empDep."','".$empPay."','".$empProd."','".$empEdu."','".$empExp."','".$empImg."')";
    $q1 = $conn->query($sql);
    // sleep(1);
    $sql = "SELECT * FROM `employee` 
            WHERE `userID` = '".$uID."'
            AND `empName` LIKE '%".$empName."%'
            ORDER BY `empID` DESC
            LIMIT 1";
            // AND `empPos` = '".$empPos."' 
            // AND `empDep` = '".$empDep."'
            // AND `empPay` = '".$empPay."'
            // AND `empProd` = '".$empProd."'
            // AND `empEdu` = '".$empEdu."'
            // AND `empExp` = '".$empExp."'";

    $empData = $conn->query($sql);

    if ($empData->num_rows > 0) {
        $row = $empData->fetch_assoc();
        echo($row["empID"]);
    } else {
        echo("ERROR: createEmpFailed");
    }
}

function empToProj ($empID,$pID,$pos) {
    global $conn;
    $sql = "";
    if ($pos == "1") {
        $sql = "UPDATE `gameProject` SET `emp1` = '".$empID."' WHERE `projectID` = '".$pID."'";
    }
    if ($pos == "2") {
        $sql = "UPDATE `gameProject` SET `emp2` = '".$empID."' WHERE `projectID` = '".$pID."'";
    }
    $q = $conn->query($sql);
}

function getEmployee($empID) {
    global $conn;
    $sql = "SELECT * FROM `employee` WHERE `empID` = '".$empID."' LIMIT 1";
    $q = $conn->query($sql);
    if ($q->num_rows > 0) {
        $row = $q->fetch_assoc();
        echo($row["empID"]."|".$row["empName"]."|".$row["empPos"]."|".$row["empDep"]."|".$row["empPay"]."|".$row["empProd"]."|".$row["empEdu"]."|".$row["empExp"]."|".$row["empImg"]);
    } else {
        echo("ERROR: Employee not found");
    }
}

function getSabProj($uID) {
    global $conn;
    $sql = "SELECT * FROM `sabProject` WHERE `projectComplete` = 'NONE' && `projectPlayer` = '".$uID."'";
    $playerData = $conn->query($sql);
    if ($playerData->num_rows > 0) {
        while($row = $playerData->fetch_assoc()) {
            echo($row["projectID"]."|".$row["projectName"]."|".$row["projectCost"]."|".$row["targetPlayer"]."|".$row["sabEffect"].";");
        }
    } else {
        echo("ERROR: No Projects Found");
    }
}

function giveProject($uID, $pName,$pCost,$emp) {
    global $conn;
    $sql = "INSERT INTO `gameProject` (gameID,projectName,projectCost,projectComplete,empRequired,projectPlayer)
            VALUES ('1','".$pName."','".$pCost."','NONE','".$emp."','".$uID."')";
    $q = $conn->query($sql);
}

function giveSabProject($userID,$targetID,$pName,$pCost,$userEffect) {
    global $conn;
    $sql = "INSERT INTO `sabProject` (gameID,projectName,projectCost,projectComplete,projectPlayer,targetPlayer,sabEffect)
            VALUES ('1','".$pName."','".$pCost."','NONE','".$userID."','".$targetID."','".$userEffect."')";
    $q = $conn->query($sql);
}

function resetPlayers() {
    global $conn;
    $sql = "DELETE FROM `gameProject` WHERE `projectID` >= '1000'";
    $result = $conn->query($sql);

    $sql = "DELETE FROM `gameAlert` WHERE `alertID` >= '1000'";
    $result = $conn->query($sql);

    $sql = "DELETE FROM `employee` WHERE `empID` > '1'";
    $result = $conn->query($sql);

    $sql = "DELETE FROM `sabProject` WHERE `projectID` >= '1000'";
    $result = $conn->query($sql);

    $sql = "UPDATE `userCreated` SET `projectMoney` = '0.00', `gameProgress` = '0', `userIncome` = '5.00'";
    $result = $conn->query($sql);
}

function hireEmp($pID,$empID,$uID,$funds,$inc,$prog) {
    global $conn;
    $sql = "UPDATE `gameProject` SET `projectComplete` = 'DONE' WHERE `projectID` = '".$pID."'";
    $result = $conn->query($sql);

    $sql = "UPDATE `userCreated` SET `projectMoney` = '".$funds."', `gameProgress` = '".$prog."', `userIncome` = '".$inc."'  WHERE `userID` = '".$uID."'";
    $result = $conn->query($sql);
}

function sabComplete($pID,$sabText) {
    global $conn;
    $sql = "UPDATE `sabProject` SET `projectComplete` = 'DONE' WHERE `projectID` = '".$pID."'";
    $result = $conn->query($sql);

    $sql = "INSERT INTO `gameAlert` (alertText) VALUES ('".$sabText."')";
    $result = $conn->query($sql);
}

function getAlerts() {
    global $conn;
    $sql = "SELECT * FROM `gameAlert` ORDER BY `alertID` DESC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo($row["alertID"]."|".$row["alertText"].";");
        }
    } else {
        echo("ERROR: No Alerts Found");
    }
}

function checkReq() {
    // var $msg = ">>";
    switch ($_GET["action"]) {
        case "getPlayer":
            isset($_GET["uID"]) ? getPlayerData($_GET["uID"]) : "invalid";
            break;
        case "getAllPlayers":
            getAllPlayerData();
            break;
        case "setPlayerData":
            (isset($_GET["uID"]) && isset($_GET["col"]) && isset($_GET["val"])) ? setPlayerData($_GET["uID"],$_GET["col"],$_GET["val"]) : "invalid";
            break;
        case "resetMoney":
             isset($_GET["gID"]) ? resetGameMoney($_GET["gID"]) : "invalid";
             break;
        case "resetPlayers":
             isset($_GET["gID"]) ? resetPlayers() : "invalid";
             break;
        case "getProj":
            isset($_GET["pID"]) ? getProjectData($_GET["pID"]) : "invalid";
            break;
        case "createEmployee":
            (isset($_GET["uID"]) && isset($_GET["empName"]) && isset($_GET["empPos"]) && isset($_GET["empDep"]) && isset($_GET["empPay"]) && isset($_GET["empProd"]) && isset($_GET["empEdu"]) && isset($_GET["empExp"]) && isset($_GET["img"])) ? createEmployee($_GET["uID"], $_GET["empName"], $_GET["empPos"], $_GET["empDep"], $_GET["empPay"], $_GET["empProd"], $_GET["empEdu"], $_GET["empExp"], $_GET["img"]) : "invalid";
            break;
        case "getAllProjects":
            isset($_GET["uID"]) ? getAllProjectData($_GET["uID"]) : "invalid";
            break;
        case "getGameTime":
            isset($_GET["gID"]) ? getGameTime($_GET["gID"]) : "invalid";
            break;
        case "setGameTime":
            (isset($_GET["gID"]) && isset($_GET["time"])) ? setGameTime($_GET["gID"], $_GET["time"]) : "Invlaid";
            break;
        case "createNewPlayer":
            isset($_GET["name"]) ? createUser($_GET["name"]) : "invalid";
            break;
        case "deleteAllPlayers":
            deletePlayers();
            break;
        case "getEmployee":
            isset($_GET["empID"]) ? getEmployee($_GET["empID"]) : "invalid";
            break;
        case "empToProj":
            (isset($_GET["empID"]) && isset($_GET["pID"]) && isset($_GET["pos"])) ? empToProj($_GET["empID"],$_GET["pID"],$_GET["pos"]) : "invalid";
            break;
        case "givePlayerProject":
            (isset($_GET["uID"]) && isset($_GET["pName"]) && isset($_GET["pCost"]) && isset($_GET["emp"])) ? giveProject($_GET["uID"],$_GET["pName"],$_GET["pCost"],$_GET["emp"]) : "invalid";
            break;
        case "givePlayerSabProject":
            (isset($_GET["userID"])&& isset($_GET["targetID"]) && isset($_GET["pName"]) && isset($_GET["pCost"]) && isset($_GET["sabEffect"])) ? giveSabProject($_GET["userID"],$_GET["targetID"],$_GET["pName"],$_GET["pCost"],$_GET["sabEffect"]): "invalid";
            break;
        case "getSabProjects":
            isset($_GET["uID"]) ? getSabProj($_GET["uID"]) : "invalid";
            break;
        case "sabComplete":
            isset($_GET["pID"]) && isset($_GET["sabText"]) ? sabComplete($_GET["pID"],$_GET["sabText"]) : "invalid";
            break;
        case "hireEmp":
            (isset($_GET["pID"]) && isset($_GET["empID"]) && isset($_GET["uID"]) && isset($_GET["funds"]) && isset($_GET["inc"]) && isset($_GET["prog"])) ? hireEmp($_GET["pID"],$_GET["empID"],$_GET["uID"],$_GET["funds"],$_GET["inc"],$_GET["prog"]) : "invalid";
            break;
        case "getAlerts":
            getAlerts();
            break;
        default: "invalid";
    }
    // echo($msg.": ".$_GET["action"]);

}


?>