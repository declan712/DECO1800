<?php $activePage = basename($_SERVER['SCRIPT_FILENAME'], '.php'); ?>
<nav id="player-nav">
        <ul>
            <li <?php echo ($activePage == 'index' ? ' class="active"' : ''); ?>>
                <a href="../player/">Home</a>
            </li>
            <li <?php echo ($activePage == 'player-customise' ? ' class="active"' : ''); ?>>
                <a href="player-customise.php">Customise</a>
            </li>
            <li <?php echo ($activePage == 'player-join' ? ' class="active"' : ''); ?>>
                <a href="player-join.php">+</a>
            </li>
        </ul>
    </nav>
