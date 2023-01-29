import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
    return (
        <Html lang='vi'>
            <Head>
            </Head>
            <body>
                <Main />
                <NextScript />
                <Script async src="www.google-analytics.com/analytics.js" />
                <Script async src="https://www.googletagmanager.com/gtm.js?id=GTM-MB45R3G" />

            </body>
        </Html>
    )
}
