import { Fade } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

const PageTransition = ({
    route,
    children,
}: PropsWithChildren<{ route: string }>) => (
    <Fade key={route} in={true}>
        {children}
    </Fade>
);

export default PageTransition;
