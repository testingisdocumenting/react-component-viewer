import * as React from 'react';

export function wrapComponent(Wrapper: React.ComponentType, Component: React.ComponentType) {
    return () => (
        <Wrapper>
            <Component/>
        </Wrapper>
    );
}