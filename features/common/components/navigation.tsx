import { Header, Container, Title } from '@mantine/core';
import styled from '@emotion/styled';

import { Login } from '../../login/components/login';
import { Logo } from './logo';

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
            <Logo></Logo>
            <Login></Login>
        </StyledContainer>
    </Header>
);
