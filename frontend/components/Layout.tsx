import { FC, PropsWithChildren } from 'react';

import { Container, Flex } from '@chakra-ui/react';

import Header from './Header';

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <Header />
        <Container
            as={Flex}
            minW="80vw"
            px={0}
            pt="10vh"
            alignItems="stretch"
            flexDirection="column"
        >
            {children}
        </Container>
    </>
);

export default Layout;
