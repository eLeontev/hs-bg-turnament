import { LoadingOverlay } from '@mantine/core';

export type OverlayLoaderProps = {
    visible?: boolean;
};

export const OverlayLoader = ({ visible }: OverlayLoaderProps) => (
    <LoadingOverlay visible={visible ?? true} overlayBlur={2} />
);
