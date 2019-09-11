<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Player Screen</title>
    <link rel="stylesheet" href="../css/style.css"/>
    <link rel="stylesheet" href="../css/player.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="../js/script.js"></script>
    <script src="../js/player-join.js"></script>
</head>

<body>
    <?php include '../header.php'?>
    <?php include 'playernav.php'?>

    <section id="player-join">
    <input type="text" placeholder="Name">
    <input type="button" value="Join">
    </section>
    <section id="player-next">
    <h2>You've already made a character</h2>
    <input type="button" value="Rejoin">
    </section>

    <?php include '../footer.php' ?>
</body>


</html>