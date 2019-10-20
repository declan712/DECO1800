<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Player Screen</title>
    <link rel="icon" href="../images/favicon.png">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:200,400,700,900|Slabo+27px&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css"/>
    <link rel="stylesheet" href="../css/player.css"/>
    <link rel="stylesheet" href="../css/slider.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="../js/script.js"></script>
    <script src="../js/player.js"></script>
</head>

<body class="loaded">
    <?php include '../header.php'?>
    <?php include 'playernav.php'?>
    <div id="loading-bar"></div>
    <section class="player-info">
        <a href="#" id="show-intro">i</a>
        <h2 class="username">$USER</h2>
        <h2>Money: <span id="funds">00.00</span> (+£<span id="income">0.00</span>)</h2>
        <div class="player-colour"><img src="../images/Choo2.png" id="player-train"></div>
    </section>
    <input type="button" value="Bail Out" class="bail-out">
    
    <section id="projects">
        <h1>Projects:</h1>
        <section id="sab-projects">
            <article class="sab-template">
                <input type="button" value=">" class="sabotage">
                <h2 class="project-name">project name</h2>
                <p class="project-cost">example project cost</p>
                <p class="sab-effect">effect</p>
                <p class="hidden sab-details"></P>
            </article>
        </section>
        <section id="game-projects">
            <article class="project-template">
                <!-- <input type="button" value="i" class="more-info"> -->
                <h2 class="project-name">project name</h2>
                <p class="project-cost">example project cost</p>
                <p class="project-emp">example project employee</p>
                
            </article>
        </section>
    </section>

    

        <aside class="lightbox" id="lightbox"></aside>
        <aside class="lightbox" id="instructions"><?php include 'intro.php' ?></aside>
    <?php include '../footer.php' ?>
</body>


</html>