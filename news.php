<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>example newspaper</title>
    <link rel="stylesheet" href="css/style.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/script.js"></script>
    <script src="js/script1.js"></script>
</head>

<body>
    <?php include 'header.php' ?>
    <div id="loading" class="loaded"></div>
    <section id="records"></section>
    <section id="paper">
        <article>
            <h1>The Queensland Rail Times</h1>
            <h2>Top 10 best trains, number 7 will shock you</h2>
            <div id="article-image"></div>
            <p id="article-date">
                1 August 1890
            </p>
            <section id="article-text">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam nisi tincidunt magna sodales, ac ullamcorper arcu vulputate. Mauris sem magna, porttitor non est et, dignissim consectetur leo. Nam dapibus, quam id sagittis rhoncus, nibh mauris vehicula felis, eget consequat neque mauris vitae mi. Fusce pellentesque porttitor ultricies. Etiam vulputate mi laoreet nulla dignissim lobortis. Curabitur scelerisque, ex id rutrum vestibulum, magna diam scelerisque nisi, eget ultrices nibh enim nec felis. Suspendisse potenti. Quisque egestas quam at massa laoreet lobortis sit amet eget quam. Aliquam accumsan justo at interdum consectetur. Sed dictum vel augue at condimentum. Donec finibus, dolor a feugiat egestas, sapien diam tincidunt sem, nec eleifend est metus ac nulla.
            </p>
            <p>Maecenas convallis hendrerit enim, sed vestibulum sem pulvinar sit amet. Donec et venenatis ex. Phasellus sit amet ipsum in turpis rhoncus blandit vel ut mauris. Ut hendrerit rutrum bibendum. Maecenas at fringilla lectus, vitae malesuada lacus. Maecenas sit amet augue nisi. Nam elementum lectus at feugiat consequat. Nulla porttitor urna erat, eleifend fringilla metus pellentesque vitae. Quisque vel pharetra eros. Vivamus molestie dapibus libero, et iaculis odio porttitor in. Sed sit amet mi ut augue hendrerit malesuada eget a risus.
                </p>
                
                </section>
                <section id='article-text-additional'>
                    <p>Etiam egestas aliquet volutpat. Morbi varius facilisis risus, vel posuere augue mollis a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras gravida accumsan orci at blandit. Nullam ultricies pharetra cursus. Cras ligula nunc, malesuada eget justo sed, consectetur tincidunt dui. Duis feugiat suscipit lacus, et sagittis augue. Donec vehicula ultricies metus, ultrices sagittis libero ultrices et. Ut porta sed orci placerat pharetra. Suspendisse eget ultrices lectus. Integer dignissim vel sem at maximus. Curabitur maximus eget arcu quis faucibus. Mauris eget facilisis quam. Nullam pharetra id dui dapibus egestas. Maecenas ut eleifend orci, hendrerit sagittis ex.

                </p>
                <p>Etiam egestas aliquet volutpat. Morbi varius facilisis risus, vel posuere augue mollis a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras gravida accumsan orci at blandit. Nullam ultricies pharetra cursus. Cras ligula nunc, malesuada eget justo sed, consectetur tincidunt dui. Duis feugiat suscipit lacus, et sagittis augue. Donec vehicula ultricies metus, ultrices sagittis libero ultrices et. Ut porta sed orci placerat pharetra. Suspendisse eget ultrices lectus. Integer dignissim vel sem at maximus. Curabitur maximus eget arcu quis faucibus. Mauris eget facilisis quam. Nullam pharetra id dui dapibus egestas. Maecenas ut eleifend orci, hendrerit sagittis ex.

                    </p>
                </section>

        </article>
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
		</article>
    <?php include 'footer.php' ?>
</body>


</html>