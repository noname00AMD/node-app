import Link from 'next/link'

export default function HotTags({ hotTags }) {
    return (
        <>
            <style jsx>{`
                .hottags{
                    font-size: 24px;
                }
                .tag{
                    width: 50%;
                    display: inline-block;
                    overflow: hidden;
                }
                .tag a{
                    margin-left: 4px;
                    color: #ada1a6;
                }
            `}</style>
            <div>
                <h2 className="hottags" >#HotTags</h2>
                {
                    Array.from(hotTags).map((tag, i) => {
                        return (
                            <div key={i} className="tag">
                                <span style={{ fontSize: "28px", color: "#ada1a6" }}>#{i + 1}</span>
                                <Link href={"/" + tag.slug}>
                                    <a style={{ fontSize: "18px" }}>{tag.name}</a>
                                </Link>
                            </div>)
                    })
                }
            </div>
        </>
    )
}
