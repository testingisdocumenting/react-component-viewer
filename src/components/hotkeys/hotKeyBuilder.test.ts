import { hotKeyFromString } from './hotKeyBuilder';

describe('hotKeyBuilder', () => {
    it('figures out alt, ctrl, shift, meta modifier presence', () => {
        const altHotKey = hotKeyFromString('Alt F');
        expect(altHotKey).toEqual({code: 'KeyF', shift: false, meta: false, ctrl: false, alt: true});

        const ctrlMetaHotKey = hotKeyFromString('Ctrl Meta A');
        expect(ctrlMetaHotKey).toEqual({code: 'KeyA', shift: false, meta: true, ctrl: true, alt: false});
    });

    it('maps digits and functional keys', () => {
        const shift1 = hotKeyFromString('Shift 1');
        expect(shift1).toEqual({code: 'Digit1', shift: true, meta: false, ctrl: false, alt: false});

        const altF5 = hotKeyFromString('Alt F5');
        expect(altF5).toEqual({code: 'F5', shift: false, meta: false, ctrl: false, alt: true});
    });
});