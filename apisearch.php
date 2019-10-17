<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>I like Trains</title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:200,400,700,900|Slabo+27px&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/script.js"></script>
    <script src="js/script1.js"></script>
</head>

<body class="loaded">
    <?php include 'header.php'?>
    <section id="api-search">
        train goes toot toot
        <form id="search">
            <input type="text" name="searchbar" id="searchbar" placeholder="Search Database">
            <input type="button" value="Search" id="search-button">
        </form>
        <form id="filter">
			<input id="filter-text" type="text" placeholder="Filter by Record Text" value="">
		</form>
		<p id="record-count"><strong>0</strong> Records Displayed</p>
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