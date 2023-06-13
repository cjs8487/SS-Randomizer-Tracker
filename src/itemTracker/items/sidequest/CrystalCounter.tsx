import ColorScheme from '../../../customization/ColorScheme';

type CrystalCounterProps = {
    colorScheme: ColorScheme;
    current: number;
    fontSize: number;
};

const CrystalCounter = ({ colorScheme, current, fontSize }: CrystalCounterProps) => (
    <p style={{ fontSize, margin: 0, color: colorScheme.text }}>
        {current}
    </p>
);

export default CrystalCounter;
