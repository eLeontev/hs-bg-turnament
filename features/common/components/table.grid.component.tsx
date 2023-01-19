import { ReactElement } from 'react';
import { Grid } from '@mantine/core';

export type GridComponentProps = {
    children: Array<ReactElement>;
};
export const GridComponent = ({ children }: GridComponentProps) => {
    return (
        <Grid>
            {children.map((child, i) => (
                <Grid.Col key={i} span={12}>
                    {child}
                </Grid.Col>
            ))}
        </Grid>
    );
};
