import Head from "next/head"
export default function TwitterMeta({ children, props }) {
    return (
        <>
            <Head>
            <meta name="twitter:card" content="summary_large_image" />/* constant text of twitter */
                <meta property="twitter:title" content={props.title} />
                <meta property="twitter:description" content={props.site_info.description} />
                <meta property="twitter:site" content={process.env.TWITTER_USER} />
                <meta property="twitter:image" content={props.site_info.thumb_img} />
                <meta property="twitter:url" content={props.url} />
            </Head>
        </>
    )
}
