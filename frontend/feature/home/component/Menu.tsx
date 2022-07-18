import NextLink from 'next/link';
import {
    HStack,
    SimpleGrid,
    LinkOverlay,
    LinkBox,
    Icon,
    Text,
} from '@chakra-ui/react';
import { FaDatabase, FaFileInvoiceDollar } from 'react-icons/fa';

const Menu = () => {
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
    return (
        <SimpleGrid columns={2} spacing={4}>
            {links.map((link) => (
                <LinkBox
                    as={HStack}
                    key={link.link}
                    borderWidth="1px"
                    p={2}
                    _hover={{
                        bgColor: 'purple.300',
                        color: 'white'
                    }}
                >
                    <Icon as={link.icon} fontSize="0.9rem" />
                    <NextLink href={link.link} passHref>
                        <LinkOverlay fontWeight="bold" userSelect="none">
                            <Text>{link.label}</Text>
                        </LinkOverlay>
                    </NextLink>
                </LinkBox>
            ))}
        </SimpleGrid>
    );
};

export default Menu;
