import * as React from 'react';
import { DemoInstances } from './DemoInstances';

describe('DemoInstances', () => {
    let demoInstances: DemoInstances;

    beforeEach(() => {
        demoInstances = new DemoInstances();
    });

    it('should report title duplicates', () => {
        demoInstances.add('enabled', 'description', <div/>);
        expect(() => {
            demoInstances.add('enabled', 'description', <div/>);
        }).toThrow('element with \'enabled\' title is already registered');
    });

    it('should create a default group with no description', () => {
        demoInstances.add('enabled', 'description', <div/>);
        expect(demoInstances.groups.length).toEqual(1);
        expect(demoInstances.groups[0].data.length).toEqual(1);
    });

    it('setting description while a group is empty should change that group description', () => {
        const desc = 'group wide description';

        demoInstances.description(desc);
        demoInstances.add('enabled', 'description', <div/>);
        expect(demoInstances.groups.length).toEqual(1);
        expect(demoInstances.groups[0].data.length).toEqual(1);
        expect(demoInstances.groups[0].description).toEqual(desc);
    });

    it('setting description while a group is not empty should create a new group', () => {
        const desc = 'group description';

        demoInstances.add('enabled 1', 'description', <div/>);
        demoInstances.add('enabled 2', 'description', <div/>);
        demoInstances.description(desc);
        demoInstances.add('disabled 1', 'description', <div/>);
        demoInstances.add('disabled 2', 'description', <div/>);
        demoInstances.add('disabled 3', 'description', <div/>);

        expect(demoInstances.groups.length).toEqual(2);
        expect(demoInstances.groups[0].data.length).toEqual(2);
        expect(demoInstances.groups[1].data.length).toEqual(3);
        expect(demoInstances.groups[0].description).toEqual('');
        expect(demoInstances.groups[1].description).toEqual(desc);
    });
});