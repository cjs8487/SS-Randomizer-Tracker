import { useState } from 'react';
import unknown from '../assets/hints/unknown.png';
import unrequired from '../assets/No_Entrance.png';
import required from '../assets/Entrance.png';

type HintMarkerProps = {
    width: number;
};

const HintMarker = ({ width }: HintMarkerProps) => {
    const [current, setCurrent] = useState(0);

    const images = [unknown, unrequired, required];
    const altTexts = ['Unknown', 'Not Required', 'Required'];
    const max = 2;

    const handleClick = () => {
        setCurrent((xCurrent) => (xCurrent < max ? xCurrent + 1 : 0));
    };

    return (
        <div
            onClick={handleClick}
            onKeyDown={handleClick}
            role="button"
            tabIndex={0}
        >
            <img src={images[current]} alt={altTexts[current]} width={width} />
        </div>
    );
};

export default HintMarker;
