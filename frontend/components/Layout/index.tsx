import { FC, PropsWithChildren } from 'react';

import { Container } from '@chakra-ui/react';

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <Container h="100vh" w="100vw" pt="10vh" pb="10vh">
        {children}
    </Container>
);

export default Layout;
