<?php

namespace Site\Component\BlackScreen\Twig\Wrap;

/**
 * Class WrapNode
 * @package Flame\Wrap
 */
class WrapNode extends \Twig_Node
{
    /**
     * WrapNode constructor.
     *
     * @param array $object
     * @param array $name
     * @param int $body
     * @param int $lineNo
     * @param string $tag
     */
    public function __construct($object, $name, $body, $lineNo = 0, $tag = null)
    {
        parent::__construct(
            ['body' => $body],
            ['object' => $object, 'name' => $name],
            $lineNo,
            $tag
        );
    }

    /**
     * @param \Twig_Compiler $compiler
     */
    public function compile(\Twig_Compiler $compiler)
    {
        $compiler
            ->addDebugInfo($this)
            ->write('ob_start();');

        $compiler
            ->addDebugInfo($this)
            ->subcompile($this->getNode('body'));

        if (is_null($this->getAttribute('object'))) {
            $compiler
                ->write(sprintf('echo $this->get%s(ob_get_clean());', $this->getAttribute('name')) . PHP_EOL);
        } else {
            $compiler
                ->write('echo $this->getAttribute($this->getContext($context, ')
                ->repr($this->getAttribute('object'))
                ->raw('), ')
                ->repr($this->getAttribute('name'))
                ->raw(', [ob_get_clean()], \'method\');')
                ->raw(PHP_EOL);
        }
    }
}
