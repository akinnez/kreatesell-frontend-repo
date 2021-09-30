import React from 'react'
import { useQuery } from '../networking/utils'

const Index = ()=>{

    const {data,loading} = useQuery({path:'v1/kreatesell/utils/get-countries'})
    console.log(loading)

    return(
        <>
        <p>Test page</p>
        </>
    )
}

export default Index