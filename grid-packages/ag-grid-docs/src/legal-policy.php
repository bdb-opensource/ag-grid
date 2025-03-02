<?php
$navKey = "about";
require_once 'includes/html-helpers.php';
gtm_data_layer('about');
?>
<!DOCTYPE html>
<html lang="en">
    <head>
<?php
meta_and_links("Our Mission, Our Principles and Our Team at AG Grid", "About AG Grid", "AG Grid is a feature-rich datagrid available in Community or Enterprise versions. This is the story of AG Grid and explains our mission, where we came from and who we are.", "legal-policy.php", true);
?>
    <link rel="stylesheet" href="dist/homepage.css">
    <title>Legal Policy</title>
    </head>

    <body>
    <?php include_once("./includes/analytics.php"); ?>
        <header id="nav" class="compact">
<?php
    $version = 'latest';
    include './includes/navbar.php';
?>
        </header>

        <div class="info-page">
            <div class="row">
                <section>
                    <h1 class="text-center">Legal Policy</h1>
                    <hr />

                    <div class="text-center">
                        <p>Welcome to AG Grid's legal policies page.</p>
                        <p>Here you can navigate through our legal policies, including our
                            <strong>Privacy Policy</strong> and <strong>Cookies Policy</strong>.
                        <hr/>
                    </div>

                    <div class="text-center">
                        <p>Welcome to AG Grid's Privacy Policy.<br/>
                            <strong>Your privacy is important to us.</strong><br/>
                            At ag-grid, we are fully committed to protecting your personal data and complying with all data privacy laws.<br/>
                            This policy serves as a guide and reference point for how we may collect and use personal information, and the rights and
                            choices available to all our visitors and customers.
                            <br/><br/>
                            We strongly recommend you read our policy and understand what we collect, how we collect it, what we do with it, how we protect it,
                            and your rights regarding information, <strong>before</strong> you use or access any of our services.
                        </p>
                    </div>

                    <a href="privacy.php">
                        <button type="button" class="btn btn-primary btn-lg btn-block">Privacy Policy</button>
                    </a>
                    <hr/>
                    <p class="text-center">Welcome to AG Grid's Cookie Policy.<br/>
                        <strong>Your choice is important to us.</strong>
                        <br/><br/>
                        This site uses cookies – small text files that are placed on your machine to help the site provide a better user experience.
                        In general, cookies are used to retain user preferences, store information for things like shopping baskets, and provide anonymised
                        tracking data to third party applications like Google Analytics. As a rule, cookies will make your browsing experience better.
                        However, you may prefer to disable cookies on this site and on others.
                        <br/><br/>
                        We strongly recommend you read our policy and understand what a cookie is, how we use them and your rights in relation to them.
                        <br/><br/>
                        <a href="cookies.php">
                            <button type="button" class="btn btn-primary btn-lg btn-block" href="cookies.php">Cookies Policy</button>
                        </a>
                    </p>
                    <hr>
                </section>
            </div>
        </div>
<?php include_once("./includes/footer.php"); ?>
    </body>
</html>
