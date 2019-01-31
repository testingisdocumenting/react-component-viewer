export function findAndReturn<V>(values: V[],
                                 predicate: (v: V) => boolean,
                                 returnFunc: (idx: number) => V | undefined) {
    let idx = 0;
    for (const v of values) {
        if (predicate(v)) {
            return returnFunc(idx);
        }
        idx++;
    }

    return undefined;
}