import Link from "next/link"
import Image from "next/image"
import styles from "./footer.module.sass"

export default function Footer({ children, props }) {
    return (
        <>
<<<<<<< HEAD
         
=======
            <div className={`${styles.footer} `}>
                <div className=" cont ">
                    <div className="row">
                        <div className={` col-4 ` + styles.address}>
                            <div >
                                <p className={styles.strong}>trụ sở hà nội</p>

                                <p>
                                    Tầng 21, tòa nhà Center Building, Hapulico Complex, số 1 Nguyễn Huy Tưởng, p. Thanh Xuân Trung, quận Thanh Xuân, Hà Nội.
                                    Điện thoại: 024 7309 5555, máy lẻ 370.
                                </p>
                                <a rel="nofollow" href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d931.2056353845325!2d105.80772655513327!3d20.999749453353736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac9788f39f1d%3A0xfe0d7beb1d82d125!2zSGFwdWxpY28gQ29tcGxleCwgVGhhbmggWHXDom4gVHJ1bmcsIFRoYW5oIFh1w6JuLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1434096825076" title="Xem bản đồ">xem bản đồ</a>
                            </div>
                            <div >
                                <p className={styles.strong}>trụ sở tp.hồ chí minh</p>

                                <p>
                                    Tầng 4 Tòa nhà 123, 123 Võ Văn Tần, phường 6, quận 3, Tp. HCM
                                    Điện thoại: 028. 7307 7979
                                </p>
                                <a rel="nofollow" href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.463428635451!2d106.689822!3d10.775774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3b1ecb0111%3A0x45e6492955b75232!2zMTIzIFbDtSBWxINuIFThuqduLCBwaMaw4budbmcgNiwgUXXhuq1uIDMsIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1434097259116" title="Xem bản đồ">xem bản đồ</a>
                            </div>
                        </div>
                        <div className={" col-4 " + styles.contact}>
                            <div>
                                <p className={styles.strong}>Chịu trách nhiệm quản lý nội dung</p>
                                <p >Bà Nguyễn Bích Minh</p>
                            </div>
                            <div >
                                <p className={styles.strong}>Hợp tác truyền thông</p>
                                <p>024.73095555  (máy lẻ 62.370)</p>
                                <a rel="nofollow" href="mailto:marketing@kenh14.vn">marketing@kenh14.vn</a>
                            </div>
                            <div>
                                <p className={styles.strong}>Liên hệ quảng cáo</p>
                                <p >0942 86 11 33</p>
                                <a rel="nofollow" href="mailto:giaitrixahoi@admicro.vn" >giaitrixahoi@admicro.vn</a>
                                <a rel="nofollow" href="https://www.messenger.com/t/K14vn" title="Xem chi tiết" target="_blank" ><span >
                                </span>Chat với tư vấn viên</a>
                                <a rel="nofollow" href="/adv.chn" title="Xem chi tiết" target="_blank" >xem chi tiết</a>
                            </div>
                            <div >
                                <p>

                                    <a rel="nofollow" target="_blank" href="https://kenh14.vn/static/chinh-sach-bao-mat.htm">Chính sách bảo mật</a>
                                </p>
                            </div>
                        </div>
                        <div className={` col-4 ` + ` ${styles.about} `}>
                            <div className={styles["logo"]}>
                                <Image width={120} height={60} src={"/images/logo.png"} />
                            </div>
                            <p className={styles.strong}>  © Copyright 2007 - 2021 – CÔNG TY CỔ PHẦN VCCORP</p>
                            <p>   Tầng 17, 19, 20, 21 Tòa nhà Center Building - Hapulico Complex, Số 1 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội.</p>
                            <p> Giấy phép số 2215/GP-TTĐT do Sở Thông tin và Truyền thông Hà Nội cấp ngày 10 tháng 4 năm 2019</p>
                        </div>
                    </div>
                </div>
            </div>
>>>>>>> e71ea8414222f29fef593b24aba353aca012d40b
        </>
    )
}
