<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Customise Player</title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:200,400,700,900|Slabo+27px&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css"/>
    <link rel="stylesheet" href="../css/player.css"/>
    <link rel="stylesheet" href="../css/slider.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="../js/script.js"></script>
    <script src="../js/player.js"></script>
</head>

<body>
    <?php include '../header.php'?>
    <?php include 'playernav.php'?>
    <section>
        <a href="#" id="show-intro">i</a>
        <h2>Money: <span id="funds">00.00</span> (+£<span id="income">0.00</span>)</h2>
        <h2 class="username">$USER</h2>
    </section>
    <section id="colour-picker">
        <div class="player-colour"><img src="../images/Choo2.png" id="player-train"></div>
        <form class="colour-form">
            <input type="range" name="R" min="0" max="255">
            <input type="range" name="G" min="0" max="255">
            <input type="range" name="B" min="0" max="255">
            <input type="button" class="colour" value="Set Colour">
        </form>
    </section>

    <?php include '../footer.php' ?>
</body>


</html>