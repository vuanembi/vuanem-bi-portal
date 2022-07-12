import type { AppProps } from 'next/app';

import { DefaultSeo } from 'next-seo';
import { ChakraProvider } from '@chakra-ui/react';

import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from '../components/Layout';
import theme from '../styles/theme';

const App = ({ Component, pageProps }: AppProps) => {
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
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ChakraProvider>
            </QueryClientProvider>
        </>
    );
};

export default App;
