import {
    ActionIcon,
    Button as UIButton,
    ButtonProps as ButtonUIProps,
    ActionIconProps as ActionIconUIProps,
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

export type IconButtonProps = ActionIconUIProps & {
    onClick?: () => void;
};

export const IconButton = ({ children, ...rest }: IconButtonProps) => (
    <ActionIcon {...rest}>{children}</ActionIcon>
);
