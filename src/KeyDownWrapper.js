const SPACE_KEY = ' ';

export default function keyDownWrapper(handler) {
    return (event) => {
        if (event.key === SPACE_KEY) {
            handler(event);
        }
    };
}
