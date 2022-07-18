import type { AppProps } from 'next/app';

import { DefaultSeo } from 'next-seo';
import { ChakraProvider } from '@chakra-ui/react';

import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from '../components/Layout';
import theme from '../styles/theme';
import '../styles/tabulator.scss';

const App = ({ Component, pageProps, router }: AppProps) => {
    const queryClient = new QueryClient();

    return (
        <>
            <DefaultSeo
                title={pageProps.title}
                titleTemplate="%s | vnbi"
                additionalLinkTags={[
                    {
                        rel: 'icon',
                        href: '/favicon.ico',
                    },
                ]}
            />
            <QueryClientProvider client={queryClient}>
                <ChakraProvider theme={theme}>
                    <Layout route={router.route}>
                        <Component {...pageProps} />
                    </Layout>
                </ChakraProvider>
            </QueryClientProvider>
        </>
    );
};

export default App;
