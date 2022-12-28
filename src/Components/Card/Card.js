import './card.css'
import { imgBaseUrl, apiKey } from '../../API/axiosInstance'
import { Link } from 'react-router-dom'

export default function Card({ data }) {
    return (
        <Link to={`/movie/${data.id}`} className='my-card'>
            <img className='my-card-image' src={`${imgBaseUrl}/w500${data.poster_path}?api_key=${apiKey}`} alt={`${data.title}`} />
        </Link>
    )
}