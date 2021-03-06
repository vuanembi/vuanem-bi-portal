import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
    fonts: {
        heading: 'Open Sans, sans-serif',
        body: 'Open Sans, sans-serif',
    },
    styles: {
        global: {
            '*:not(svg)': {
                borderStyle: 'solid',
                borderRadius: 'md',
            },
            '.shadow': {
                boxShadow: 'base',
            },
            '.hover-shadow': {
                _hover: {
                    boxShadow: 'lg',
                },
            },
            '.hover-color': {
                _hover: {
                    borderColor: 'purple.400',
                },
                _groupHover: {
                    color: 'purple.400',
                },
            },
        },
    },
    components: {
        Container: {
            baseStyle: {
                minW: 'container.xl',
            },
        },
        Link: {
            baseStyle: {
                textDecor: 'underline',
            },
            variants: {
                button: {
                    textDecor: 'none',
                    _hover: {
                        textDecor: 'none',
                    },
                },
            },
        },
    },
});
