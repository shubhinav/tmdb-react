import "./header.css"
import { Link } from "react-router-dom"
import { Icon } from '@iconify/react';

export default function Header({page}){

    const homeClassName = () =>{
        if(page==="home"){
            return 'nav-link link-active'
        }
        else{
            return 'nav-link'
        }
    }

    const discoverClassName = () =>{
        if(page==="discover"){
            return 'nav-link link-active'
        }
        else{
            return 'nav-link'
        }
    }

    return(
        <header>
            <div className="content-container d-flex justify-content-between align-items-center py-4">
                <h1 className="header-logo mb-0"><Link to="/">TMDB<Icon icon="bxs:camera-movie" inline={true} /></Link></h1>
                <nav>
                    <ul className="nav">
                        <li className="nav-item"><Link className={homeClassName()} to="/">Home</Link></li>
                        <li className="nav-item"><Link className={discoverClassName()} to="/discover">Discover</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}