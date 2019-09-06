<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Player Screen</title>
    <link rel="stylesheet" href="../css/style.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="../js/script.js"></script>
    <script src="../js/player.js"></script>
</head>

<body class="loaded">
    <?php include '../header.php'?>
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

    <?php include '../footer.php' ?>
</body>


</html>