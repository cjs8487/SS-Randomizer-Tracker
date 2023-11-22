type CrystalCounterProps = {
    current: string | number;
    fontSize: number;
};

export default function CrystalCounter({ current, fontSize }: CrystalCounterProps) {
    return (
        <p style={{ fontSize, margin: 0 }}>
            {current}
        </p>
    );
}
