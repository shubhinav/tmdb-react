import './discover-card.css'
import { useState, useContext } from 'react'
import { convertDatefromISO, makeImgUrl, getRatingColor, getGenreById } from "../../Utils/utilityFunctions"
import {ThemeContext} from '../../Context/ThemeContext'

export default function DiscoverCard({ data }) {

    const {theme} = useContext(ThemeContext)

    const [hasImgLoaded, setHasImgLoaded] = useState(false)

    return (
        <div className={`${theme}-shadow discover-card`}>
            <div className={hasImgLoaded ? 'discover-card-img' : 'no-img shine'}>
                <img className={!hasImgLoaded ? 'd-none' : ''} src={makeImgUrl(data.poster_path, 'w500')} alt={data.title} onLoad={() => setHasImgLoaded(true)}/>
                <p className={hasImgLoaded ? 'd-none' : 'p-2 mb-0'}>{data.title}</p>
                <div className='shimmer'></div>
            </div>
            <div className='discover-card-content'>
                <h1 className="discover-card-title mb-0">{data.title}</h1>
                {data.release_date && <p className='mb-0'>{convertDatefromISO(data.release_date, true)}</p>}
                <div className='discover-card-genres d-flex flex-wrap gap-1 mb-0'>
                    {getGenreById(data.genre_ids).map((genre, i) => {
                        if (i == data.genre_ids.length - 1) {
                            return <span key={i} className="discover-card-genre-single mb-0">{genre}</span>
                        }
                        else {
                            return <span key={i} className="discover-card-genre-single mb-0">{genre} &#x2022;</span>
                        }
                    })}
                </div>
                <p className='disocver-card-overview mb-0'>{data.overview}</p>
                {data.vote_count ? <p style={{ backgroundColor: getRatingColor(data.vote_average) }} className="disover-card-rating mb-0">{data.vote_average.toFixed(1)}</p> : <p style={{ backgroundColor: getRatingColor('nr') }} className="disover-card-rating mb-0">NR</p>}
            </div>
        </div>
    )
}