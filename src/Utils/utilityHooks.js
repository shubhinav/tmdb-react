import { useState, useEffect } from "react"


export function useInfiniteScroll(apiCall, apiParam, element){

    const [data, setData] = useState()

    useEffect(()=>{
        apiCall.then((res) => {
            setData(res.data.results)
        })
    },[])

    return null
    
}