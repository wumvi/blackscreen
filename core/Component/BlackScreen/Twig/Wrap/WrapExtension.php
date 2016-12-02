<?php

namespace Site\Component\BlackScreen\Twig\Wrap;

/**
 * Class WrapExtension
 * @package Flame\Wrap
 */
class WrapExtension extends \Twig_Extension
{
    /**
     * @return array
     */
    public function getTokenParsers()
    {
        return array (
            new WrapTokenParser(),
        );
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'wrap';
    }
}
