import './footer.css'

export default function Footer() {

    return (
        <footer className="text-center mt-5 py-4">
            <p className='content-container mb-0'>
                Made by <a style={{color: 'var(--accent-color)'}} href="https://github.com/shubhinav" target="_blank" rel="noreferrer">Shubhinav Dua</a> using <a style={{color: 'var(--accent-color)'}} href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">themoviedb.org</a>'s API.
            </p>
        </footer>
    )
}