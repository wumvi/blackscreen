<?php

namespace Site\Component\BlackScreen\Twig\Wrap;

/**
 * Парсер twig кода
 */
class WrapTokenParser extends \Twig_TokenParser
{
    /**
     * @param \Twig_Token $token
     *
     * @return WrapNode
     * @throws \Twig_Error_Syntax
     */
    public function parse(\Twig_Token $token)
    {
        $lineNo = $token->getLine();
        $stream = $this->parser->getStream();

        $object = null;
        $name = $stream->expect(\Twig_Token::NAME_TYPE)->getValue();

        if ($stream->test(\Twig_Token::BLOCK_END_TYPE)) {
            if (!$this->parser->hasMacro($name)) {
                throw new \Twig_Error_Syntax("The macro '$name' does not exist", $lineNo);
            }
        } else {
            $object = $name;
            $name = $stream->expect(\Twig_Token::NAME_TYPE)->getValue();
        }

        $this->parser->getStream()->expect(\Twig_Token::BLOCK_END_TYPE);
        $body = $this->parser->subparse([$this, 'decideWrapEnd'], true);
        $this->parser->getStream()->expect(\Twig_Token::BLOCK_END_TYPE);

        return new WrapNode($object, $name, $body, $token->getLine(), $this->getTag());
    }

    /**
     * @param \Twig_Token $token
     *
     * @return bool
     */
    public function decideWrapEnd(\Twig_Token $token)
    {
        return $token->test('endwrap');
    }

    /**
     * @return string
     */
    public function getTag()
    {
        return 'wrap';
    }
}
