import './index.css'
const Footer = () => {
    return (
        <div className="footer-clean">
            <footer>
                <div className="container">
                    <div className="flex justify-around flex-wrap gap-10">
                        <div className="item">
                            <h3>Services</h3>
                            <ul>
                                <li><a href="#">Web design</a></li>
                                <li><a href="#">Development</a></li>
                                <li><a href="#">Hosting</a></li>
                            </ul>
                        </div>
                        <div className="item">
                            <h3>About</h3>
                            <ul>
                                <li><a href="#">Company</a></li>
                                <li><a href="#">Team</a></li>
                                <li><a href="#">Legacy</a></li>
                            </ul>
                        </div>
                        <div className="item">
                            <h3>Careers</h3>
                            <ul>
                                <li><a href="#">Job openings</a></li>
                                <li><a href="#">Employee success</a></li>
                                <li><a href="#">Benefits</a></li>
                            </ul>
                        </div>
                        <div className="item social">
                            <a href="https://www.facebook.com/smart.xander.77">
                                <i className="icon ion-social-facebook">
                                    <img
                                        src="https://4.bp.blogspot.com/-qYwreqeIN6w/XN0LzjGE2GI/AAAAAAAAAl8/wYzmo96AHKAsbLQ-jYawLem2CJZVr-hYgCLcBGAs/s1600/facebook-logo-Grey-%2Bhigh%2Bresolution.png"
                                        alt="" width="43px" />
                                </i>
                            </a>
                            <a href="https://www.instagram.com/itx_hassaan_55/" target="_blank" rel="noopener">
                                <i className="icon ion-social-facebook">
                                    <img
                                        src="https://totalpng.com//public/uploads/preview/instagram-grey-logo-png-hd-copy-11656657483bsurpsft3i.png"
                                        alt="" width="43px" />
                                </i>
                            </a>
                            <p className="copyright">Reach me!</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer