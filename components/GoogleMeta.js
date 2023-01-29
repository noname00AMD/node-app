import Script from 'next/script'
import Head from "next/head"
export default function GoogleMeta({ children, props }) {
    return (
        <>
            <Head>
                <link rel="canonical" href={props.canonical} />
                <meta name="robots" content="all" />
                <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />
                {/* -for SEO edit after */}
                {/* <link rel="search" type="application/opensearchdescription+xml"
                    href="//static.hostingcdn.net/20210811/js/provider.xml" title="anh gai xinh moi nhat" /> */}
            </Head>
        </>
    )
}
