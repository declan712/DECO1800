<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Game Screen</title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:200,400,700,900|Slabo+27px&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css"/>
    <link rel="stylesheet" href="../css/game.css"/>
    <link rel="stylesheet" href="../css/slider.css"/>
    <link rel="icon" href="../images/favicon.png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="../js/script.js"></script>
    <script src="../js/game.js"></script>
</head>

<body>
    <?php include '../header.php'?>

    <section id="game-screen">
        <div id="game-time">
            <div id="progress-bar"></div>
            <p>TIME</p>
        </div>
        <section id="game-players">
            <article class="player-template">
                <h2 class="username">USER1</h2>
                <h2>£<span class="funds">00.00</span></h2>
                <div class="player-colour"><img src="../images/Choo2.png" class="choo"></div>
                <!-- <form class="colour-form">
                    <input type="range" name="R" min="0" max="255">
                    <input type="range" name="G" min="0" max="255">
                    <input type="range" name="B" min="0" max="255">
                    <input type="button" class="colour" value="Set Colour">
                </form> -->
            </article>
        </section>
        <section id="game-map">
            <div class="station">0</div>
            <div class="station">1</div>
            <div class="station">2</div>
            <div class="station">3</div>
            <div class="station">4</div>
            <div class="station">5</div>
            <div class="station">6</div>
            <div class="station">7</div>
            <div class="station">8</div>
            <div class="station">9</div>
            <div class="station">10</div>
            <div class="station">11</div>
            <div class="station">12</div>
            <div class="station">13</div>
            <div class="station">14</div>
            <div class="station">15</div>
            <svg>
            <line class="train-line" id="line1"/>
            <line class="train-line" id="line2"/>
            <line class="train-line" id="line3"/>
            <line class="train-line" id="line4"/>
            <line class="train-line" id="line5"/>
            <line class="train-line" id="line6"/>
            <line class="train-line" id="line7"/>
            <line class="train-line" id="line8"/>
            <line class="train-line" id="line9"/>
            <line class="train-line" id="line10"/>
            <line class="train-line" id="line11"/>
            <line class="train-line" id="line12"/>
            <line class="train-line" id="line13"/>
            <line class="train-line" id="line14"/>
            <line class="train-line" id="line15"/>
            </svg>
            <!-- <img src="../images/Choo2.png" id="game-train"> -->
        </section>
        <!-- <section id="game-projects">
            <article class="project-template">
                <input type="button" value="i" class="more-info">
                <h2 class="project-name">project name</h2>
                <p class="project-cost">example project cost</p>
                <p class="project-emp">example project employee</p>
                
            </article>
        </section> -->
        <section id="game-alerts">
            <article class="alert-template">
                <p class="alert-text">example alert text</p>
            </article>
        </section>
        <aside id="lightbox"></aside>
    </section>
    
    
    <?php include '../footer.php' ?>
</body>


</html>