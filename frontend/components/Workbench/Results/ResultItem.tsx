import { FC } from 'react';

import {
    VStack,
    HStack,
    Fade,
    IconButton,
    LinkBox,
    LinkOverlay,
    Heading,
    Text,
    useClipboard,
    useToast,
} from '@chakra-ui/react';

import { FaCopy, FaCloudDownloadAlt } from 'react-icons/fa';

import dayjs from 'dayjs';

export type ResultItemProps = {
    title: string;
    timestamp: dayjs.Dayjs;
    url: string;
};

const ResultItem: FC<ResultItemProps> = ({ title, timestamp, url }) => {
    const { onCopy } = useClipboard(url);
    const toast = useToast();

    const handleCopy = () => {
        onCopy();
        toast({
            title: 'Copied',
            status: 'info',
            duration: 1000,
            isClosable: true,
        });
    };

    return (
        <Fade in={!!url}>
            <VStack justifyContent="flex-end" alignItems="stretch">
                <Heading as="h3" size="sm">
                    {title}
                </Heading>
                <HStack justifyContent="space-between">
                    <Text>{timestamp.format('YYYY-MM-DD HH:mm:ss')}</Text>
                    <HStack>
                        <IconButton
                            aria-label="Copy"
                            size="sm"
                            icon={<FaCopy />}
                            onClick={handleCopy}
                        ></IconButton>
                        <LinkBox>
                            <LinkOverlay isExternal href={url}>
                                <IconButton
                                    aria-label="Download"
                                    size="sm"
                                    icon={<FaCloudDownloadAlt fill="white" />}
                                    colorScheme="blue"
                                ></IconButton>
                            </LinkOverlay>
                        </LinkBox>
                    </HStack>
                </HStack>
            </VStack>
        </Fade>
    );
};

export default ResultItem;
