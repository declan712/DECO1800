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

function checkReq() {
    if ($_GET["action"]="getPlayer" && isset($_GET["uID"])) {
        //echo("searching for player with id ".$_GET["uID"]."<br>");
        getPlayerData($_GET["uID"]);
    }
    else if ($_GET["action"]="getAllPlayers") {
        getAllPlayerData();
    }
}


?>