
import Link from 'next/link'
import Image from 'next/image'

export default function TopAds({ hotTags }) {
    return (
        <>
            <style jsx>{`
                .top_ads1{
                    width: 970px;
                    margin: 20px auto;

                }
              
            `}</style>
            <div className="top_ads1">
                <Image style={{margin:"0 auto", display:"block"}} width={"970px"} height={"180px"} src={"/images/banner/970x180.gif"}/>
            </div>
        </>
    )
}







