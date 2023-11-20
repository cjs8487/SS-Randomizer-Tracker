const SPACE_KEY = ' ';

export default function keyDownWrapper<T extends { key: string }>(
    // FIXME
    handler: (event: any) => void,
) {
    return (event: T) => {
        if (event.key === SPACE_KEY) {
            handler(event);
        }
    };
}
