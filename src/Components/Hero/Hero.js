import './hero.css'
import Button from '../Utils/Button/Button';
import { Icon } from '@iconify/react';

export default function Hero({inputValue, handleChange, handleSubmit}) {

    return (
        <div className='home-page-hero'>
            <div className='home-page-hero-content content-container'>
                <div className='home-page-hero-content-heading'>
                    <h1 className='home-page-hero-content-title'>
                        Hero Area Tagline goes here, not decided yet.
                    </h1>
                    <h2 className='home-page-hero-content-subtitle'>
                        Hero area subtitle goes here.
                    </h2>
                </div>
                <form className='home-page-hero-content-form d-flex justify-content-between' onSubmit={handleSubmit}>
                    <input value={inputValue} onChange={handleChange} placeholder="Search for a movie or TV show"/>
                    <Button fontSize='1.5rem' padding='0.25em 0.5em'><Icon icon="material-symbols:search-rounded" inline={true} /></Button>
                </form>
            </div>
        </div>
    )
}