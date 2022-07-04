import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useContext } from 'react';

import { Center, HStack, Icon, LinkBox, LinkOverlay } from '@chakra-ui/react';

import { FaHome } from 'react-icons/fa';

import usePlanStatus from '../../../hook/planStatus';
import { PlanContext } from '../../../context';

import Info from './Info';
import Action from './Action';

const Header = () => {
    const { plan } = useContext(PlanContext);
    const { color } = usePlanStatus(plan.status.name);

    const home = useRouter().pathname.split('/')[1];

    return (
        <HStack flex="1" justifyContent="space-between">
            <Center as={LinkBox} p={5} bgColor={color}>
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
