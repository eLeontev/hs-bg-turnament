import { Header, Container, Flex } from '@mantine/core';
import styled from '@emotion/styled';

import { I18nToggler } from '../../../i18n/i18n.toggle.component';
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
            <Flex align="center">
                <I18nToggler></I18nToggler>
                <Login></Login>
            </Flex>
        </StyledContainer>
    </Header>
);
