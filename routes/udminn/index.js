import Link from 'next/link'
import Head from 'next/head'
import { connectToDatabase } from '../../database'
import NotFound from "../../components/notFound";

export default function Udmin(props) {
    if (props.err) {
        return (<>
            <NotFound props={props} />
        </>)
    }
    return (
        <>
            <Head>
                <title>{props.tag.title}</title>
            </Head>
            <h1>First Post</h1>
            <h2>
                {props.tag.tagname}
                {props.tag.slug}
            </h2>
        </>
    )
}

export async function getServerSideProps({req ,res }) {
    var props = {}
    var db = await connectToDatabase()
    var tag = await db.collection("tags").findOne({ slug: params.tag }, {_id:0})
    if (!tag) {
        props = {
            err: true,
            statusCode: 404,
            message: "not found tag"
        }
        res.statusCode = 404;
        return { props }
    }
    props.tag = JSON.parse(JSON.stringify(tag))
    return {
        props
    }
}
