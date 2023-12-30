import { RootState } from './Store';

/**
 * Turn a selector output from reselect's createSelector which depends on some input
 * other than state, into a function that produces a selector function based on that
 * input. This makes it nicer to use in useSelector.
 *
 * @example
 *
 * const areaHintSelector = createSelector(
 *   (state: RootState) => state.tracker.hints,
 *   (state: RootState, area: string) => area,
 *   (hints, area) => hints[area]
 * )
 *
 * // Hard to put into useSelector:
 * const hint = useSelector((state: RootState) => areaHintSelector(state, area))
 *
 * const curriedAreaHintSelector = currySelector(areaHintSelector)
 *
 * // Nice:
 * const areaHint = useSelector(curriedAreaHintSelector(area))
 *
 * // You can still use it as an input for createSelector:
 * const hasHintSelector = createSelector(
 *   curriedAreaHintSelector.selector,
 *   (hint) => hint !== undefined
 * )
 */
export function currySelector<K, R>(
    selector: (state: RootState, props: K) => R,
): ((props: K) => (state: RootState) => R) & {
    selector: (state: RootState, props: K) => R;
} {
    const fn = (props: K) => (state: RootState) => selector(state, props);
    fn.selector = selector;
    return fn;
}
