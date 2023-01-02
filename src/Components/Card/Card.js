import './card.css'
import { Link } from 'react-router-dom'
import { makeImgUrl } from '../../Utils/utilityFunctions'

export default function Card({ data }) {
    return (
        <Link to={`/movie/${data.id}`} className='my-card'>
            <img className='my-card-image' src={makeImgUrl(data.poster_path, 'w500')} alt={`${data.title}`} />
        </Link>
    )
}