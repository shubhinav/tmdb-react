import './hero.css'
import '../../Pages/Home/home.css'
import '../../Pages/Details/details.css'

export default function Hero({ bgUrl, children, paddingY = '4em', paddingX = '2em', opacity='0.55'}) {

    const backgroundStyle = {
        borderRadius: "10px",
        padding: `${paddingY} ${paddingX}`,
        background: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        backgroundBlendMode: "multiply"
    }

    return (
        <div style={backgroundStyle} className='hero-content content-container'>
            {children}
        </div>
    )
}