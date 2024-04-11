const createFooter = () => {
    let footer = document.querySelector('.footer');

    footer.innerHTML = `
        <div class="footer-content">
            <img src="/images/mainlogo.png" class="logo" alt="">
            <div class="footer-content1">
                <div class="company">
                    <p class="company-name">Medicomm</p>
                    <p class="company-address">Medicomm, 289 Cooper St. Watertown, MA 02472</p>
                </div>
                <div class="socials">
                    <a href="https://www.facebook.com/medicomm.in" class="social-link1"><img src="/images/facebook.png" class="social-icon"></a>
                    <a href="https://www.instagram.com/medicomm.in" class="social-link"><img src="/images/instagram.png" class="social-icon"></a>
                    <a href="https://www.twitter.com/medicomm.in" class="social-link"><img src="/images/twitter.png" class="social-icon"></a>
                </div>
                <div class="footer-ul-container">
                    <ul class="footer-ul">
                        <li class="footer-li"><a href="/html/about.html" class="footer-link">About Us</a></li>
                        <li class="footer-li"><a href="/html/contact.html" class="footer-link">Contact Us</a></li>
                        <li class="footer-li"><a href="/html/seller.html" class="footer-link">Sell With Us</a></li>
                        <li class="footer-li"><a href="/html/terms.html" class="footer-link">Terms & Conditions</a></li>
                        <li class="footer-li"><a href="/html/privacy.html" class="footer-link">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <p class="footer-credit">All Rights Reserved</p>
        </div>
    `;
}

createFooter();