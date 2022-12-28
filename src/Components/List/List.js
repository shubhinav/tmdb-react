import './list.css'
import Card from '../Card/Card'

export default function List({title, data}){
    return(
        <div className='content-container' style={{marginTop: '1.75em'}}>
            <h1 className='list-title'>{title}</h1>
            <div className='list-content d-flex overflow-auto align-items-stretch'>
                {data.map((ent, i)=>{
                    return <Card key={i} data={ent}/>
                })}
            </div>
        </div>
    )
}