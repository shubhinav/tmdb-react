import './card.css'
import { Link } from 'react-router-dom'
import { makeImgUrl } from '../../Utils/utilityFunctions'

export default function Card({ title, name, character, job, movieImgUrl, castImgUrl, vidKey, id }) {
    return (
        <>
            {
                movieImgUrl &&
                <Link to={`/movie/${id}`} className='my-card'>
                    <img className='my-card-image' src={makeImgUrl(movieImgUrl, 'w500')} alt={`${title}`} />
                </Link>
            }
            {
                castImgUrl &&
                <div className='my-card'>
                    <img className='my-card-image-cast' src={makeImgUrl(castImgUrl, 'w500')} alt={`${name}`} />
                    <p className='mb-0 mt-1'>{name}</p>
                    {character  && <p className='text-muted mb-0'>{character.replace('(uncredited)', '')}</p>}
                    {job && <p className='text-muted mb-0'>{job}</p>}
                </div>
            }
            {
                vidKey && 
                <div className='my-card-videos'>
                    <iframe src={`https://www.youtube.com/embed/${vidKey}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowFullScreen></iframe>
                </div>
            }
        </>
    )
}


