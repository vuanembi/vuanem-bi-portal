import NextLink from 'next/link';
import {
    Center,
    HStack,
    IconButton,
    Icon,
    LinkOverlay,
    LinkBox,
    useDisclosure,
} from '@chakra-ui/react';
import { MdMenu, MdHomeFilled } from 'react-icons/md';

import SideBar from './SideBar';
import SignIn from '../feature/auth/component/SignIn';

const Header = () => {
    const { isOpen, onClose, onToggle } = useDisclosure();

    return (
        <HStack
            w="100vw"
            px="10vw"
            position="fixed"
            py={4}
            justifyContent="space-between"
            alignItems="stretch"
            borderBottomWidth="1px"
            borderRadius="0px"
        >
            <IconButton
                aria-label="menu"
                variant="ghost"
                bgColor="purple.400"
                color="white"
                fontSize="0.5rem"
                as={MdMenu}
                onClick={onToggle}
                borderWidth="1px"
                p={1}
                _hover={{}}
            />
            <SideBar isOpen={isOpen} onClose={onClose} />
            <LinkBox as={Center} bgColor="purple.400" px={2} py={1}>
                <NextLink href="/" passHref>
                    <LinkOverlay
                        fontWeight="bold"
                        userSelect="none"
                        lineHeight={0}
                    >
                        <Icon
                            as={MdHomeFilled}
                            fontSize="1.5rem"
                            color="white"
                        />
                    </LinkOverlay>
                </NextLink>
            </LinkBox>
            <SignIn />
        </HStack>
    );
};

export default Header;
