import type { NextPage, GetStaticProps } from 'next';
import { VStack, Heading, chakra } from '@chakra-ui/react';
import Lottie from 'react-lottie';

import analyticsLottie from '../public/lottie/20578-isometric-website-marketing-design.json';

const Home: NextPage = () => {
    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: analyticsLottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <VStack mt="10vh">
            <Heading px="15rem" textAlign="center">
                <chakra.span color="purple.400">BI&Growth</chakra.span> kiến tạo
                đổi mới và khai phá cơ hội tăng trưởng bằng sức mạnh của{' '}
                <chakra.span color="purple.400">dữ liệu</chakra.span> và{' '}
                <chakra.span color="purple.400">công nghệ</chakra.span>
            </Heading>
            <Lottie options={lottieOptions} height={400} width={400} />
        </VStack>
    );
};

export const getStaticProps: GetStaticProps = async () => ({
    props: {
        title: 'Home',
    },
});

export default Home;
