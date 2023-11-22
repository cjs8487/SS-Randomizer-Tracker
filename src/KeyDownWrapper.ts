const SPACE_KEY = ' ';

export default function keyDownWrapper(
    handler: (event: React.UIEvent) => void,
) {
    return (event: React.KeyboardEvent) => {
        if (event.key === SPACE_KEY) {
            handler({ ...event, type: 'click' });
        }
    };
}
