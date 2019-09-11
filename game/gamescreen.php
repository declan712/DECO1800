<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Game Screen</title>
    <link rel="stylesheet" href="../css/style.css"/>
    <link rel="stylesheet" href="../css/game.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="../js/script.js"></script>
    <script src="../js/game.js"></script>
</head>

<body>
    <?php include '../header.php'?>

    <section id="game-screen">
        <p id="game-time">TIME</p>
        <section id="game-players">
            <h1>Players</h1>
            <article class="player-template">
                <h2 class="username">USER1</h2>
                <h2>£<span class="funds">00.00</span></h2>
            </article>
        </section>
        <section id="game-map">
        </section>
        <section id="game-projects">
            <article class="project-template">
                <input type="button" value="i" class="more-info">
                <h2 class="project-name">project name</h2>
                <p class="project-cost">example project cost</p>
                <p class="project-emp">example project employee</p>
                
            </article>
        </section>
        <section id="game-alerts">
            <article class="alert-template">
                <h2 class="alert-name">alert name</h2>
                <p class="alert-text">example alert text</p>
            </article>
        </section>
        <aside id="lightbox"></aside>
    </section>
    
    

    <?php include '../footer.php' ?>
</body>


</html>