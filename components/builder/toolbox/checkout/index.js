import React from 'react'
import Container from '../../sidebar/menu/Container'
import { CheckoutButton } from '../../icons'




const Checkout = ({open,onClose=()=>{},title})=>{

    return(
        <Container open={open} onClose={()=>onClose()} title="Checkout Button">
            <CheckoutButton />
        </Container>
    )
}

export default Checkout