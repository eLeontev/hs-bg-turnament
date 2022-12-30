export type ButtonProps = { onClick: () => void; label: string };

export const Button = ({ onClick, label }: ButtonProps) => (
    <button onClick={onClick}>{label}</button>
);
