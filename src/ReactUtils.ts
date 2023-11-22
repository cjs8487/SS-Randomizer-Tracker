import { useCallback, useState } from "react";

/**
 * Use this in cases where the mutability of most data gets in the way of
 * React's reactivity and you just have to force an update.
 */
export function useForceRerender() {
    const [_state, setState] = useState({});
    return useCallback(() => setState({}), []);
}