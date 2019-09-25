<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Player Screen</title>
    <link rel="stylesheet" href="../css/style.css"/>
    <link rel="stylesheet" href="../css/player.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="../js/script.js"></script>
    <script src="../js/player.js"></script>
</head>

<body class="loaded">
    <?php include '../header.php'?>
    <?php include 'playernav.php'?>
    <section>
        <a href="#" id="show-intro">i</a>
        <h2>Money: <span id="funds">00.00</span></h2>
        <h2 class="username">$USER</h2>
    </section>
    <section>
        <p>
            this is where we might show the employeees this player has hired
    </section> 
    

    <img src="../images/Choo.png" id="player-train">
    
    <section id="records"></section>

        <aside class="lightbox" id="lightbox"></aside>
        <aside class="lightbox" id="instructions"><?php include 'intro.php' ?></aside>
    <?php include '../footer.php' ?>
</body>


</html>