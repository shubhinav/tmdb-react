import "./header.css"
import { Link } from "react-router-dom"
import { Icon } from '@iconify/react';
import { ThemeContext } from "../../Context/ThemeContext";
import { useContext } from "react";
import { resetButtonStyles } from "../../Utils/utilityStyles";

export default function Header({ page }) {

    const { theme, changeTheme } = useContext(ThemeContext)

    const homeClassName = () => {
        if (page === "home") {
            return 'nav-link link-active'
        }
        else {
            return 'nav-link'
        }
    }

    const discoverClassName = () => {
        if (page === "discover") {
            return 'nav-link link-active'
        }
        else {
            return 'nav-link'
        }
    }

    return (
        <header>
            <div className="content-container d-flex justify-content-between align-items-center py-4">
                <h1 className="header-logo mb-0"><Link to="/">TMDB<Icon icon="bxs:camera-movie" inline={true} /></Link></h1>
                <nav>
                    <ul className="nav d-flex align-items-center">
                        <li className="nav-item">
                            <button onClick={changeTheme} style={resetButtonStyles}>
                                {theme === 'dark' ? 
                                <Icon icon="ph:sun-bold" width='25px' height='25px'/> 
                                : <Icon icon="ph:moon-stars" width='25px' height='25px'/>}
                            </button>
                        </li>
                        <li className="nav-item"><Link className={homeClassName()} to="/">Home</Link></li>
                        <li className="nav-item"><Link className={discoverClassName()} to="/discover">Discover</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}