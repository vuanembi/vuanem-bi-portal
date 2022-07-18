import NextLink from 'next/link';
import {
    Center,
    HStack,
    Flex,
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
        <>
            <HStack
                as="nav"
                w="100vw"
                px="10vw"
                bgColor="white"
                position="fixed"
                py={4}
                justifyContent="space-between"
                alignItems="stretch"
                borderBottomWidth="1px"
                borderRadius="0px"
            >
                <Flex flex="1" justifyContent="flex-start">
                    <IconButton
                        aria-label="menu"
                        variant="ghost"
                        bgColor="purple.400"
                        color="white"
                        fontSize="0.5rem"
                        borderWidth="1px"
                        p={1}
                        _hover={{}}
                        as={MdMenu}
                        onClick={onToggle}
                    />
                </Flex>
                <Flex flex="1" justifyContent="center">
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
                </Flex>
                <Flex flex="1" justifyContent="flex-end">
                    <SignIn />
                </Flex>
            </HStack>
            <SideBar isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default Header;
