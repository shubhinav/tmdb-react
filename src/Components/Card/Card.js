import './card.css'
import { Link } from 'react-router-dom'
import { makeImgUrl } from '../../Utils/utilityFunctions'
import { Icon } from '@iconify/react';

export default function Card({ title, name, character, job, movieImgUrl, castImgUrl, vidKey, id }) {
    return (
        <>
            {
                movieImgUrl &&
                <Link to={`/movie/${id}`} className='my-card'>
                    <img loading='lazy' className='my-card-image-hover' src={makeImgUrl(movieImgUrl, 'w500')} alt={`${title}`} />
                </Link>
            }
            {
                name && (character || job) &&
                <div className='my-card'>
                    {castImgUrl ? <img loading='lazy' src={makeImgUrl(castImgUrl, 'w500')} alt={`${name}`} /> : <div className='no-img-availble'><Icon width='70' height='70' icon="ic:round-person" /></div>}
                    <p className='mb-0 mt-1'>{name}</p>
                    {character  && <p className='text-muted mb-0'>{character.replace('(uncredited)', '')}</p>}
                    {job && <p className='text-muted mb-0'>{job}</p>}
                </div>
            }
            {
                vidKey && 
                <div className='my-card-videos'>
                    <iframe loading='lazy' src={`https://www.youtube.com/embed/${vidKey}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowFullScreen></iframe>
                </div>
            }
        </>
    )
}


