import { FC, PropsWithChildren } from 'react';

import { Container, Flex } from '@chakra-ui/react';

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <Container
        as={Flex}
        h="100vh"
        minW="80vw"
        pt="5vh"
        pb="10vh"
        alignItems="stretch"
        flexDirection="column"
    >
        {children}
    </Container>
);

export default Layout;
