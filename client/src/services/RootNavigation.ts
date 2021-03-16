import * as React from 'react';

export const navigationRef: any = React.createRef();

export const navigate = (name: string, params?: any) => {
    if (navigationRef.current) {
        (navigationRef.current as any).navigate(name, params);
    }
}
