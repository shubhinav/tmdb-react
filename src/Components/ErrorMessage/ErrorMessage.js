import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export default function ErrorMessage({ allowRedirect = false, nothingToShow = false }) {

    if (allowRedirect) return (
        <div className="content-container text-center error-message my-5">
            <div>
                <Icon icon="grommet-icons:document-missing" width="80" height="80" className='mt-5' />
                <h2 className='mt-5'>This page does not exist. Go back to <Link to="/" style={{ color: 'var(--accent-color)' }}>Home</Link>?</h2>
            </div>
        </div>
    )

    if (nothingToShow) return (
        <div className="content-container text-center error-message my-5">
            <div>
                <Icon icon="iconoir:info-empty" width="80" height="80" className='mt-5' />
                <h2 className='mt-4'>Nothing to show, try different filters.</h2>
            </div>
        </div>
    )

    return (
        <div className="content-container text-center error-message my-5">
            <div>
                <h2>Oops, something went wrong.</h2>
                <Icon icon="tabler:face-id-error" width="60" height="60" />
            </div>
        </div>
    )
}