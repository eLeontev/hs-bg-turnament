import {
    Button as UIButton,
    ButtonProps as ButtonUIProps,
} from '@mantine/core';

export type ButtonProps = ButtonUIProps & {
    onClick?: () => void;
    label: string;
};

export const Button = ({ onClick, label, ...rest }: ButtonProps) => (
    <UIButton onClick={onClick} {...rest}>
        {label}
    </UIButton>
);
