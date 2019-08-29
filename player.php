<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Player Screen</title>
    <link rel="stylesheet" href="css/style.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/script.js"></script>
    <script src="js/player.js"></script>
</head>

<body class="loaded">
    <?php include 'header.php'?>
    <?php include 'playernav.php'?>
    <section>
        <h2>Money: <span id="funds">00.00</span></h2>
        <h2 id="username">$USER</h2>
    </section>
    <section id="alerts">
        <h1>Alerts:</h1>
    </section> 
    <section id="Projects">
        <h1>Projects:</h1>
    </section>
    
<section>
<?php
$serverName = "localhost"; //serverName\instanceName
$username = "ic5c_player";
$password = "verysecure1";
$dbname = "ic5c_gameSettings";
$conn = new mysqli( $serverName, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " .$conn->connect_error);
} else {
    echo("Connection established");
}
?>
</section>

    <section>
        <form id="search">
            <input type="text" name="searchbar" id="searchbar" placeholder="Employee Profession">
        </form>
    </section>
    <div id="loading" class="loaded"></div>
    <section id="records"></section>

    <article class="record record-template">
			<h2>Name</h2>
			<p class="year">Record Year</p>
			<section class="record-content">
                <p class="branch">Branch</p>
                <p class="position">Postition</p>
                <p class="pay">Renumeration</p>
                <p class="remarks">Remarks</p>
            </section>
            <img src="images/placeholder.jpg">
		</article>

    <?php include 'footer.php' ?>
</body>


</html>