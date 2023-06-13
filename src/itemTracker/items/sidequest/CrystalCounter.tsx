import ColorScheme from '../../../customization/ColorScheme';

type CrystalCounterProps = {
    colorScheme: ColorScheme;
    current: number;
};

const CrystalCounter = ({ colorScheme, current }: CrystalCounterProps) => (
    <p style={{ fontSize: 'xx-large', margin: 0, color: colorScheme.text }}>
        {current}
    </p>
);

export default CrystalCounter;
