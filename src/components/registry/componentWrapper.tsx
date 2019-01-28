import * as React from 'react';

export interface WrapperProps {
    OriginalComponent: React.ComponentType;
}

export function wrapComponent(Wrapper: React.ComponentType<WrapperProps>, Component: React.ComponentType) {
    return () => (
        <Wrapper OriginalComponent={Component}/>
    );
}