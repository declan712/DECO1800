<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Player Screen</title>
    <link rel="stylesheet" href="../css/style.css"/>
    <link rel="stylesheet" href="../css/player.css"/>
    <link rel="stylesheet" href="../css/slider.css"/>
    <link rel="icon" href="../images/favicon.png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="../js/script.js"></script>
    <script src="../js/player.js"></script>
</head>

<body class="loaded">
    <?php include '../header.php'?>
    <?php include 'playernav.php'?>
    <div id="loading-bar"></div>
    <section>
        <a href="#" id="show-intro">i</a>
        <h2>Money: <span id="funds">00.00</span></h2>
        <h2 class="username">$USER</h2>
    </section>
    <section id="alerts">
        <h1>Alerts:</h1>
    </section> 
    <section id="projects">
        <h1>Projects:</h1>
        <section id="game-projects">
            <article class="project-template">
                <input type="button" value="i" class="more-info">
                <h2 class="project-name">project name</h2>
                <p class="project-cost">example project cost</p>
                <p class="project-emp">example project employee</p>
                
            </article>
        </section>
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
    
    
    <section id="records"></section>

        <aside class="lightbox" id="lightbox"></aside>
        <aside class="lightbox" id="instructions"><?php include 'intro.php' ?></aside>
    <?php include '../footer.php' ?>
</body>


</html>