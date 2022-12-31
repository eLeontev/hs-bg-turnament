import { Header, Container, Title } from '@mantine/core';
import styled from '@emotion/styled';

import { Login } from './login';

const headerHeight = 60;

const StyledContainer = styled(Container)`
    height: ${headerHeight}px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Navigation = () => (
    <Header height={headerHeight}>
        <StyledContainer fluid>
            <Title order={4}>HS BG Competition</Title>
            <Login></Login>
        </StyledContainer>
    </Header>
);
