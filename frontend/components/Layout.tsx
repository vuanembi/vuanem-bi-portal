import { PropsWithChildren } from 'react';

import { Container, Flex } from '@chakra-ui/react';

import Header from './Header';
import PageTransition from './PageTransition';

const Layout = ({ route, children }: PropsWithChildren<{ route: string }>) => (
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
            <PageTransition route={route}>{children}</PageTransition>
        </Container>
    </>
);

export default Layout;
