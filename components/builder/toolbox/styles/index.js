import React from 'react'
import Container from '../../sidebar/menu/Container'
import {Select} from 'antd'
import { useEditor } from '@craftjs/core'
import {SingleColumn,DoubleColumn,ThreeColumn,FourColumn} from '../draggables'


const Styles = ({open,onClose=()=>{},title})=>{
    const { selected } = useEditor((state) => {
        const currentNodeId = state.events.selected;
        let selected;
          
        if ( currentNodeId ) {
          selected = {
            id: currentNodeId,
            name: state.nodes[currentNodeId].data.name,
            settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings
          };
        }
    
        return {
          selected
        }
      });

    return(
        <Container open={open} onClose={()=>onClose()} title={selected?.name+ ' Styles'}>
            { 
            selected?.settings && React.createElement(selected?.settings)
            }
        </Container>
    )
}

export default Styles