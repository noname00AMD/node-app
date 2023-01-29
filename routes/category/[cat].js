import Link from 'next/link'
import Head from 'next/head'
import { connectToDatabase } from '../../database'
import NotFound from "../../components/notFound";
export default function Cat(props) {
    if (props.err) {
        return (<>
            <NotFound props={props} />
        </>)
    }
    return (
        <>
            <Head>
                <title>{props.cat.name}</title>
            </Head>
            <h1>cate</h1>
            <h2>
                {props.cat.name}
                {props.cat.slug}
            </h2>
        </>
    )
}
// export async function getStaticProps() {
//   var props = {}
//   var db = await connectToDatabase()
//   var tags = await db.collection('tags').find({}).toArray()
//   props.tags = JSON.parse(JSON.stringify(tags))
//   return {
//     props: {
//       tags: tags
//     }
//   }
// }
export async function getServerSideProps({ params, req, res }) {
    var props = {}
    var db = await connectToDatabase()
    var cat = await db.collection("category").findOne({ slug: params.cat }, {_id:0})
    if (!cat) {
        props = {
            err: true,
            statusCode: 404,
            message: "not found category"
        }
        res.statusCode = 404;
        return { props }
    }
    props.cat = JSON.parse(JSON.stringify(cat))
    return {
        props
    }
}
