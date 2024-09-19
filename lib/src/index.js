import {useState, useCallback} from 'react';
import HookResult from "@ptolemy2002/react-hook-result";

// This needs to be used so that async and event handler function errors can be caught
export default function useManualErrorHandling() {
    const [, setError] = useState();

    const _throw = useCallback(
        (e) => {
            setError(() => {
                throw e;
            });
        },
        [setError]
    );

    const _try = useCallback(
        async (fn) => {
            try {
                return await fn();
            } catch (e) {
                _throw(e);
            }
        },
        [_throw]
    );

    return new HookResult({_throw, _try}, ["_throw", "_try"]);
};