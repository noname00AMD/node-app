
import Link from 'next/link'
import Image from 'next/image'

export default function GroupHotContent({ posts }) {
    return (
        <>
            <style jsx>{`
                .tag{
                  
                }
            `}</style>
            <div >
                <h2 style={{ marginBottom: "10px" }}>Hot tag :
                    <Link href={"/"}>
                        <a className="title2" > #damcoiminhhang</a>
                    </Link>
                </h2>
                <div className="row" >
                    {
                        Array.from(posts).map((post, i) => {
                            return (
                                <div key={i} className={`special col-4`} >
                                    <div>
                                        <Link href={post.value.path}>
                                            <a style={{ display: "inline-block", width: "100%" }}>
                                                <Image className="border" layout="responsive" width={1.6} height={1} src={post.value.thumb_img} />
                                            </a>
                                        </Link>
                                        <Link href={post.value.path}>
                                            <a className="title3" style={{ verticalAlign: "top" }}> {post.value.title}</a>
                                        </Link>
                                        <span style={{ fontSize: "13px", color: "#777" }}>- 4 gio truoc</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div >
            </div >
        </>
    )
}
