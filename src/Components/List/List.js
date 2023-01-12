import './list.css'
import Card from '../Card/Card'

export default function List({title, data}){
    return(
        <div className='content-container' style={{marginTop: '1.75em'}}>
            <h1 className='list-title'>{title}</h1>
            <div className='list-content d-flex overflow-auto'>
                {data.map((ent, i)=>{
                    return <Card key={i}
                                 title={ent.title} 
                                 name={ent.name} 
                                 character={ent.character} 
                                 job={ent.job} 
                                 movieImgUrl={ent.poster_path} 
                                 castImgUrl={ent.profile_path} 
                                 vidKey={ent.key}
                                 id={ent.id}/>
                })}
            </div>
        </div>
    )
}