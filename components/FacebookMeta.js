import Head from "next/head"
export default function FacebookMeta({ children, props }) {
    return (
        <>
            <Head>
                <meta property="fb:pages" content={process.env.FACEBOOK_PAGE_ID}></meta>
                <meta property="og:type" content={props.type} />
                <meta property="og:url" content={props.url} />
                <meta property="og:title" content={props.title} />
                <meta property="og:image" content={props.site_info.thumb_img} />
                <meta property="og:description" content={props.site_info.description} />
                <meta property="fb:app_id" content={process.env.FACEBOOK_APP_ID} />
            </Head>
        </>
    )
}
