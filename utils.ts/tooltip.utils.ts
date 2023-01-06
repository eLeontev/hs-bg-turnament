import { TooltipProps } from '@mantine/core';

export const shouldDisplayTooltip = (
    visible: boolean
): TooltipProps['events'] => ({
    hover: visible,
    focus: visible,
    touch: visible,
});
