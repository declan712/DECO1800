<?php 
$activePage = basename($_SERVER['SCRIPT_FILENAME'], '.php');
$activePath = $_SERVER['REQUEST_URI'];
//echo ("path: ".$activePath.", tok1: ".strtok($activePath, "/").", tok2: ".strtok("/"));
if ( strtok($activePath, "/") =="trains" && strtok("/")=="player") {
    $activePage = "player";
}

?>
<nav id="main-nav"class="nav-down">
    <h1><span id="burger-icon">&#9776</span> Railway Riot</h1>
        <ul class="collapsed">
            <li <?php echo ($activePage == 'index' ? ' class="active"' : ''); ?>>
                <a href="http://5c.interaction.courses/trains/">Welcome</a>
            </li>
            <li <?php echo ($activePage == 'apisearch' ? ' class="active"' : ''); ?>>
                <a href="http://5c.interaction.courses/trains/apisearch.php">Search API</a>
            </li>
            <li <?php echo ($activePage == 'player' ? ' class="active"' : ''); ?>>
                <a href="http://5c.interaction.courses/trains/player/">Player Screen</a>
            </li>
            <li <?php echo ($activePage == 'gamescreen' ? ' class="active"' : ''); ?>>
                <a href="http://5c.interaction.courses/trains/game/gamescreen.php">Game Screen</a>
            </li>
        </ul>
    </nav>
