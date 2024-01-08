class HeaderMobile extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(){
        this.innerHTML = /*html */`
        <div class="mobile-menu d-block d-lg-none">
            <nav class="nav-main mainmenu-nav mt--30">
                <ul class="mainmenu menuMobile" id="mobile-menu-active">
                    <li class="has-droupdown">
                        <a href="#" class="main">Home</a>
                        <ul class="submenu">
                            <li><a class="mobile-menu-link" href="index.html">Home 01 - Main</a></li>
                            <li><a class="mobile-menu-link" href="index-two.html">Home 02 - Fashion</a></li>
                            <li><a class="mobile-menu-link" href="index-three.html">Home 03 - Technology</a></li>
                            <li><a class="mobile-menu-link" href="index-four.html">Home 04 - Gamming</a></li>
                            <li><a class="mobile-menu-link" href="index-five.html">Home 05 - Sports</a></li>
                            <li><a class="mobile-menu-link" href="index-six.html">Home 06 - Travel</a></li>
                            <li><a class="mobile-menu-link" href="index-seven.html">Home 07 - AI</a></li>
                            <li><a class="mobile-menu-link" href="index-eight.html">Home 08 - Politics</a></li>
                            <li><a class="mobile-menu-link" href="index-nine.html">Home 09 - Food</a></li>
                            <li><a class="mobile-menu-link" href="index-ten.html">Home 10 - Photography</a></li>
                        </ul>
                    </li>
                    <li class="menu-item"><a class="main mobile-menu-link" href="about.html">About</a></li>
                    <li class="has-droupdown">
                        <a href="#" class="main">Category</a>
                        <ul class="submenu">
                            <li><a class="mobile-menu-link" href="category-style-1.html">Category Style 1</a></li>
                            <li><a class="mobile-menu-link" href="category-style-2.html">Category Style 2</a></li>
                            <li><a class="mobile-menu-link" href="category-style-3.html">Category Style 3</a></li>
                        </ul>
                    </li>
                    <li class="has-droupdown">
                        <a href="#" class="main">Features</a>
                        <ul class="submenu">
                            <li><a class="mobile-menu-link" href="author.html">Author</a></li>
                            <li><a class="mobile-menu-link" href="team.html">Team</a></li>
                            <li><a class="mobile-menu-link" href="404.html">Error Page</a></li>
                        </ul>
                    </li>
                    <li class="has-droupdown">
                        <a href="#" class="main">Post</a>
                        <ul class="submenu">
                            <li><a class="mobile-menu-link" href="post-style-1.html">Post Style 1</a></li>
                            <li><a class="mobile-menu-link" href="post-style-2.html">Post Style 2</a></li>
                            <li><a class="mobile-menu-link" href="post-style-3.html">Post Style 3</a></li>
                            <li><a class="mobile-menu-link" href="post-details.html">Post Details</a></li>
                        </ul>
                    </li>
                    <li class="menu-item"><a class="main mobile-menu-link" href="contact.html">Contact</a></li>
                </ul>
            </nav>

            <div class="social-wrapper-one">
                <ul>
                    <li>
                        <a href="#">
                            <i class="fa-brands fa-facebook-f"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa-brands fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa-brands fa-youtube"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa-brands fa-linkedin-in"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>`
    }
}

customElements.define('x-headermobile', HeaderMobile)