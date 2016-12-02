<?php

namespace Index;

use Site\Component\BlackScreen\Twig\Wrap\WrapExtension;

define('CORE_ROOT', 'lib/');

include '../vendor/autoload.php';
include '../Core/Component/BlackScreen/Twig/Wrap/WrapExtension.php';
include '../Core/Component/BlackScreen/Twig/Wrap/WrapTokenParser.php';
include '../Core/Component/BlackScreen/Twig/Wrap/WrapNode.php';

$loader = new \Twig_Loader_Filesystem('../tpl');

$twig = new \Twig_Environment($loader, array(
    // Uncomment the line below to cache compiled templates
    // 'cache' => __DIR__.'/../cache',
));

$twig->addExtension(new WrapExtension());
echo $twig->render('demo.twig', []);