var HomePage = require('../containers/homepage')
var connectToDatabase = require('../database');

var cache = require("../cache");


module.exports.default = function Home(props) {
    // console.log(props);
    return (<>
        <HomePage props={props}/>
    </>)
}

module.exports.getServerSideProps = async function ({params}) {
    var props = {}
    var db = await connectToDatabase()
    if (cache.has("home_data")) {
        props.home_data = cache.get("home_data")
    } else {
        var home_data = await db.collection('home_data').find({}, {_id: false}).toArray()
        props.home_data = home_data
        cache.set("home_data", home_data)
    }
    if (cache.has("category")) {
        props.category = cache.get("category")
    } else {
        props.category = await db.collection('category').find({}, {_id: false}).toArray()
        cache.set("category", props.category)
    }
    if (cache.has("site_info")) {
        props.site_info = cache.get("site_info")
    } else {
        props.site_info = await db.collection('site_info').findOne({}, {_id: false})
        cache.set("site_info", props.site_info)
    }
    if (cache.has("hotTags")) {
        props.hotTags = cache.get("hotTags")
    } else {
        props.hotTags = await db.collection('trending').find({type: "tag"}, {_id: false}).toArray()
        cache.set("hotTags", props.hotTags)
    }
    props.canonical = process.env.HOST
    props.url = process.env.HOST
    var hotContent = await db.collection("trending").find({type: "post"}, {_id: false}).toArray()


    // console.log(os.totalmem());
    props.title = process.env.HOST + " - " + props.site_info.site_name
    props = JSON.parse(JSON.stringify(props))
    return {
        props
    }
}

// export async function getServerSideProps({ req, res }) {
//     res.setHeader(
//         'Cache-Control',
//         'public, s-maxage=10, stale-while-revalidate=59'
//     )

//     return {
//         props: {},
//     }
// }
