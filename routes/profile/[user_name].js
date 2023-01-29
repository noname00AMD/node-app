import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../containers/home_layout'
import { connectToDatabase } from '../../database'
import NotFound from "../../components/notFound";

export default function User(props) {
    if (props.err) {
        return (<>
            <NotFound props={props} />
        </>)
    }
    return (
        <>
            <Head>
                <title>{props.user.user_name}</title>
            </Head>
            <h1>{props.user.user_name}</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </>
    )
}

export async function getServerSideProps({ params, req, res }) {
    console.log("profile: " + params.user_name);
    var props = {}
    var db = await connectToDatabase()
    var user = await db.collection("users").findOne({ user_name: params.user_name }, { _id: 0 })
    if (!user) {
        props = {
            err: true,
            statusCode: 404,
            message: "not found user"
        }
        res.statusCode = 404;
        return { props }
    }
    props.user = JSON.parse(JSON.stringify(user))
    return {
        props
    }
}
