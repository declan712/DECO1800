<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Player Screen | Projects</title>
    <link rel="stylesheet" href="css/style.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/script.js"></script>
    <script src="js/player.js"></script>
</head>

<body class="loaded">
    <?php include 'header.php'?>
    <?php include 'playernav.php'?>
    <section>
        <h2>Money: <span id="funds">00.00</span></h2>
        <h2 id="username">$USER</h2>
    </section>
    <section id="Projects">
        <h1>Available Projects:</h1>
    </section>




    <section>
        <form id="search">
            <input type="text" name="searchbar" id="searchbar" placeholder="Employee Profession">
        </form>
    </section>
    <div id="loading" class="loaded"></div>
    <section id="records"></section>

    <section id="jobs">
        <h1>Possible Jobs</h1>
        <ul id="joblist">
            <li class="listItem-temp">
                <p class="position">record text</p>
            </li>
        </ul>
    </section>

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

    <?php include 'footer.php' ?>
</body>


</html>