import { Button as UIButton } from '@mantine/core';

export type ButtonProps = { onClick: () => void; label: string };

export const Button = ({ onClick, label }: ButtonProps) => (
    <UIButton onClick={onClick}>{label}</UIButton>
);
