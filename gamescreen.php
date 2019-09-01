<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Game Screen</title>
    <link rel="stylesheet" href="css/style.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/script.js"></script>
    <script src="js/game.js"></script>
</head>

<body>
    <?php include 'header.php'?>

    <section id="game-screen">
        <section id="game-players">
            <h1>Players</h1>
            <article class="player-template">
                <h2 class="username">USER1</h2>
                <h2>£<span class="funds">00.00</span></h2>
            </article>
        </section>
        <section id="game-map">
        heres a map
        </section>
        <section id="game-projects">
            <article class="project-template project">
                <h2 class="project-name">project name</h2>
                <p class="project-text">example project text</p>
            </article>
        </section>
        <section id="game-alerts">
            <article class="alert-template alert">
                <h2 class="alert-name">alert name</h2>
                <p class="alert-text">example alert text</p>
            </article>
        </section>
    </section>
    
    

    <?php include 'footer.php' ?>
</body>


</html>