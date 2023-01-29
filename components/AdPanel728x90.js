import Link from 'next/link'
import Image from 'next/image'

export default function HotTags({ hotTags }) {
    return (
        <>
            <style jsx>{`
                .ad_panel_728x90{
                 
                }
            `}</style>
            <div className="ad_panel_728x90" style={{ }}>
                <Image src="/images/banner/728x90.png" width={728} height={90} />
            </div>
        </>
    )
}
