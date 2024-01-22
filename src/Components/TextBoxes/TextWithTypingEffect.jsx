import React from 'react';
import { useTypingEffect } from '../../hooks/typing-effect';

const TextWithTypingEffect = ({ textToType, interKeyStrokeDurationInMs = 100 }) => {
    const text = useTypingEffect(textToType, interKeyStrokeDurationInMs)

    return <div>{text}</div>
}

export default TextWithTypingEffect;