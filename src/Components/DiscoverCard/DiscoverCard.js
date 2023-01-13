import './discover-card.css'

import { convertDatefromISO, makeImgUrl, getRatingColor, getGenreById} from "../../Utils/utilityFunctions"

export default function DiscoverCard({ data }) {
    return (
        <div className="discover-card">
            <div className="discover-card-img">
                <img src={makeImgUrl(data.poster_path, 'w500')} />
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