export interface GlobalActions {
    fullScreenToggle: string;
    nextDemo: string;
    prevDemo: string;
    nextDemoEntry: string;
    prevDemoEntry: string;
}

export const globalActionDescription: GlobalActions = {
    fullScreenToggle: 'toggle full screen',
    nextDemo: 'select next demo',
    prevDemo: 'select previous demo',
    nextDemoEntry: 'select next demo entry',
    prevDemoEntry: 'select prev demo entry',
};

export const globalActionDefaultKeys: GlobalActions = {
    fullScreenToggle: 'Alt F',
    nextDemo: 'Ctrl Alt Down',
    prevDemo: 'Ctrl Alt Up',
    nextDemoEntry: 'Ctrl Alt Right',
    prevDemoEntry: 'Ctrl Alt Left',
};
