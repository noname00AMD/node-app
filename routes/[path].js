import Link from 'next/link'
import Head from 'next/head'
import { connectToDatabase } from '../database'
import cache from "../cache";
export default function Post(props) {
    if (props.err) {
        return (<>
            <NotFound props={props} />
        </>)
    }
    return (
        <>
            <Head>
                <title>{props.post.title}</title>
            </Head>
            <h1>First Post</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
            <p>{props.post.content}</p>
        </>
    )
}

export async function getServerSideProps({ params, req, res }) {
    var props = {}
    if (cache.has(params.path)) {
        props = cache.get(params.path)
        console.log("from cache");
        return {
            props
        }
    }
    var db = await connectToDatabase()
    var post = await db.collection("posts").findOne({ path: params.path }, { _id: 0 })
    if (!post) {
        props = {
            err: true,
            statusCode: 404,
            message: "not found user"
        }
        res.statusCode = 404;
        return { props }
    }
    props.post = JSON.parse(JSON.stringify(post))
    console.log("from database");
    // save to cache
    cache.set(params.path, props)

    return {
        props
    }
}
