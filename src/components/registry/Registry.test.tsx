import * as React from 'react';

import { Registry } from './Registry';

describe('Registry', () => {
    const registry = new Registry('widgets');
    registry.registerAsRows('demo one', registerDemo);
    registry.registerAsRows('demo two', registerDemo);
    registry.registerAsRows('demo three', registerDemo);

    it('should find demo by name', () => {
        const byName = registry.findDemoByName('demo two');
        expect(byName!.name).toEqual('demo two');

        const notFound = registry.findDemoByName('demo 2');
        expect(notFound).toEqual(null);
    });

    it('should find next demo by current name', () => {
        const byName = registry.findNextDemoByCurrentName('demo two');
        expect(byName!.name).toEqual('demo three');
    });

    it('should return last demo when no next demo is available', () => {
        const byName = registry.findNextDemoByCurrentName('demo three');
        expect(byName!.name).toEqual('demo three');
    });

    it('should find prev demo by current name', () => {
        const byName = registry.findPrevDemoByCurrentName('demo two');
        expect(byName!.name).toEqual('demo one');
    });

    it('should return first demo when no prev demo is available', () => {
        const byName = registry.findPrevDemoByCurrentName('demo one');
        expect(byName!.name).toEqual('demo one');
    });
});

function registerDemo(registry: Registry) {
    registry.add('demo entry', () => <div/>);
}