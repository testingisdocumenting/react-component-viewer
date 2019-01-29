import { HotKey } from './HotKey';

const modifiers = {
    ALT: 'ALT',
    META: 'META',
    SHIFT: 'SHIFT',
    CTRL: 'CTRL'
};

const mapping = createKeyMapping();

export function hotKeyFromString(definition: string): HotKey {
    const parts = definition.toUpperCase().split(' ');

    return {
        alt: has(modifiers.ALT),
        ctrl: has(modifiers.CTRL),
        meta: has(modifiers.META),
        shift: has(modifiers.SHIFT),
        code: buildCode(keyPart())
    };

    function buildCode(part: string) {
        if (isNumber(part)) {
            return 'Digit' + part;
        }

        if (part.startsWith('F') && part.length > 1 && isNumber(part.substr(1))) {
            return part;
        }

        if (part.length === 1) {
            return 'Key' + part;
        }

        const code = mapping[part];
        if (!code) {
            throw new Error(`cannot map <${part}> to key code`);
        }

        return code;
    }

    function has(part: string) {
        const found = parts.filter(p => p === part);
        return found.length > 0;
    }

    function keyPart() {
        const found = parts.filter(p => !modifiers.hasOwnProperty(p));
        if (found.length === 0) {
            throw new Error('Key part is not present');
        }

        return found[0].toUpperCase();
    }
}

function createKeyMapping() {
    return {
        '.': 'Period',
        ',': 'Comma',
        '[': 'BracketLeft',
        ']': 'BracketRight',
        '/': 'Slash',
        '-': 'Minus',
        '=': 'Equal',
        '`': 'Backquote',
        'DOWN': 'ArrowDown',
        'UP': 'ArrowUp',
        'LEFT': 'ArrowLeft',
        'RIGHT': 'ArrowRight',
    };
}

function isNumber(text: string) {
    return Number.isInteger(Number.parseInt(text, 10));
}
