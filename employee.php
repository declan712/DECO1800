<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>I like Trains</title>
    <link rel="stylesheet" href="css/style.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/employee.js"></script>
</head>

<body class="loaded">
    <?php include 'header.php'?>
    <section>
        train goes toot toot
        <form id="search">
            <input type="text" name="searchbar" id="searchbar" placeholder="Employee Profession">
        </form>
    </section>
    <div id="loading" class="loaded"></div>
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
		</article>

    <?php include 'footer.php' ?>
</body>


</html>