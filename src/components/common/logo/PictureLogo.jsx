import { Link, animateScroll as scroll } from "react-scroll";
import Picture from "../Picture";

export default function PictureLogo() {
    function scrollToTop() {
        scroll.scrollToTop();
    }

    return (
        <Link
            onClick={scrollToTop}
            to="home"
            className="cursor-pointer"
        >
            <span className="sr-only">NFTERS</span>
            <Picture
                src=""
                alt="NFTERS logo"
                extraClasses=""
            />
        </Link>
    );
}
