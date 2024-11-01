declare module 'react-typing-effect' {
    import * as React from 'react';

    interface TypingEffectProps {
        text: string | string[];
        speed?: number;
        eraseSpeed?: number;
        eraseDelay?: number;
        typingDelay?: number;
        cursor?: string;
        displayTextRenderer?: (text: string, i: number) => JSX.Element;
        className?: string;
        staticText?: string;
        [key: string]: any;
    }

    const TypingEffect: React.FC<TypingEffectProps>;
    export default TypingEffect;
}
