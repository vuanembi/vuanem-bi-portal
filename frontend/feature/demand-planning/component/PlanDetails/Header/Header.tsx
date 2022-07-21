import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Center, HStack, Icon, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

import { usePlan } from '../../../provider/plan.context';
import Info from './Info';
import Action from './Action';

const Header = () => {
    const { config } = usePlan();

    const home = useRouter().pathname.split('/')[1];

    return (
        <HStack justifyContent="space-between">
            <Center as={LinkBox} p={5} bgColor={config.color}>
                <Icon
                    as={FaHome}
                    fontSize="xxx-large"
                    style={{ fill: 'white' }}
                />
                <NextLink href={`/${home}`} passHref>
                    <LinkOverlay />
                </NextLink>
            </Center>
            <Info />
            <Action />
        </HStack>
    );
};

export default Header;
