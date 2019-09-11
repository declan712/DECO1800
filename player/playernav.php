<?php $activePage = basename($_SERVER['SCRIPT_FILENAME'], '.php'); ?>
<nav id="player-nav">
        <ul>
            <li <?php echo ($activePage == 'index' ? ' class="active"' : ''); ?>>
                <a href="../player/">Home</a>
            </li>
            <li <?php echo ($activePage == 'player-join' ? ' class="active"' : ''); ?>>
                <a href="player-join.php">Join</a>
            </li>
            <li <?php echo ($activePage == 'player-projects' ? ' class="active"' : ''); ?>>
                <a href="player-projects.php">Projects</a>
            </li>
            <li <?php echo ($activePage == 'player-alerts' ? ' class="active"' : ''); ?>>
                <a href="player-alerts.php">Alerts</a>
            </li>
        </ul>
    </nav>
