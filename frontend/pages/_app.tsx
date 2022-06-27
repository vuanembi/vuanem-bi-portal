import type { AppProps } from 'next/app';

import { DefaultSeo } from 'next-seo';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '../components/Layout';
import theme from '../styles/theme';

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <DefaultSeo
            title={pageProps.title}
            titleTemplate="%s | vnbi"
            additionalLinkTags={[
                {
                    rel: 'icon',
                    href: 'favicon.ico',
                },
            ]}
        />
        <ChakraProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    </>
);

export default App;
