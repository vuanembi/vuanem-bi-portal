import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
    VStack,
    HStack,
    LinkOverlay,
    LinkBox,
    Icon,
    Text,
    UseDisclosureProps,
} from '@chakra-ui/react';
import { FaDatabase, FaFileInvoiceDollar } from 'react-icons/fa';

type MenuProps = {
    onClose: UseDisclosureProps['onClose'];
};

const Menu = ({ onClose }: MenuProps) => {
    const { pathname } = useRouter();

    const links = [
        {
            label: 'Data Service',
            link: '/data-service',
            icon: FaDatabase,
        },
        {
            label: 'Demand Planning',
            link: '/demand-planning',
            icon: FaFileInvoiceDollar,
        },
    ];

    const isCurrentRoute = (link: string) => pathname.includes(link);

    return (
        <VStack spacing={4} alignItems="stretch">
            {links.map((link) => (
                <LinkBox
                    as={HStack}
                    key={link.link}
                    borderWidth="1px"
                    p={2}
                    bgColor={isCurrentRoute(link.link) ? 'purple.300' : 'white'}
                    color={isCurrentRoute(link.link) ? 'white' : 'black'}
                    borderColor="purple.300"
                    _hover={{
                        bgColor: 'purple.300',
                        color: 'white',
                    }}
                >
                    <Icon as={link.icon} fontSize="0.9rem" />
                    <NextLink href={link.link} passHref>
                        <LinkOverlay
                            fontWeight="bold"
                            userSelect="none"
                            onClick={onClose}
                        >
                            <Text>{link.label}</Text>
                        </LinkOverlay>
                    </NextLink>
                </LinkBox>
            ))}
        </VStack>
    );
};

export default Menu;
