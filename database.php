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
        echo($pID.",".$row["projectName"].",".$row["projectCost"].",".$row["projectComplete"].",".$row["empRequired"].",".$row["projectPlayer"]);
    } else {
        echo("ERROR: Project not found.");
    }
}

function getAllProjectData() {
    global $conn;
    $sql = "SELECT * FROM `gameProject` WHERE `projectComplete` = 'NONE'";
    $playerData = $conn->query($sql);
    if ($playerData->num_rows > 0) {
        while($row = $playerData->fetch_assoc()) {
            echo($row["projectID"].",".$row["projectName"].",".$row["projectCost"].",".$row["empRequired"].";");
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
        echo($uID.",".$playerName.",".$playerMoney);
    } else {
        echo("ERROR: Player not found.");
    }
}

function getAllPLayerData() {
    global $conn;
    $sql = "SELECT * FROM `userCreated`";
    $playerData = $conn->query($sql);
    if ($playerData->num_rows > 0) {
        while($row = $playerData->fetch_assoc()) {
            echo($row["userID"].",".$row["userName"].",".$row["projectMoney"].";");
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
       echo($row["userID"].",".$row["userName"].",".$row["projectMoney"]);
    } else {
        echo("Error: unable to create user");
    }
}

function checkReq() {
    if ($_GET["action"]=="getPlayer" && isset($_GET["uID"])) {
        //echo("searching for player with id ".$_GET["uID"]."<br>");
        getPlayerData($_GET["uID"]);
    }
    else if ($_GET["action"]=="getAllPlayers") {
        getAllPlayerData();
    }
    else if ($_GET["action"]=="getProj" && isset($_GET["pID"])) {
        getProjectData($_GET["pID"]);
    }else if ($_GET["action"]=="getAllProjects") {
        getAllProjectData();
    } else if($_GET["action"]=="createNewPlayer" && isset($_GET["name"])) {
        createUser($_GET["name"]);
    } else {
        echo "Invalid";
    }
}


?>