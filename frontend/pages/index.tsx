import type { NextPage, GetStaticProps } from 'next';

import { VStack } from '@chakra-ui/react';

import SignIn from '../feature/auth/component/SignIn';
import Menu from '../feature/home/component/Menu';

const Home: NextPage = () => {
    return (
        <VStack pt="20vh" px="20vw" alignItems="stretch" spacing={4}>
            <SignIn />
            <Menu />
        </VStack>
    );
};

export const getStaticProps: GetStaticProps = async () => ({
    props: {
        title: 'Home',
    },
});

export default Home;
