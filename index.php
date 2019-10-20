<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>I like Trains</title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:200,400,700,900|Slabo+27px&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css"/>
    <link rel="icon" href="images/favicon.png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/script.js"></script>
    <script src="js/script1.js"></script>
</head>

<body>
    <?php include 'header.php'?>

    <section id="welcome-screen">
        <img id="big-choo" src="images/big-choo.png">
        <a href="/trains/player/player-join.php"><input type="button" id="join-game" value="Join Game"></a>
    </section>
    <input type="button" id="clearStorage" value="Clear Local Storage">
    <?php include 'footer.php' ?>
</body>


</html>