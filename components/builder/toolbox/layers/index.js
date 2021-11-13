import React from 'react'
import Container from '../../sidebar/menu/Container'
import { ActionMethodsWithConfig, useEditor } from '@craftjs/core'
import {MoveLayerIcon} from '../../icons'


const Layer = ()=>{
    const { descendants } = useEditor((state, query) => ({
        descendants: query.node('ROOT').descendants()
      }));

      return(
          <>
          {
              descendants?.map((item,i)=>(
                    <LayerItem id={item}/>
              ))
          }
          </>
      )
}


export const LayerItem = ({id})=>{

    const { displayName, actions, connectors:{select,drag}, query:{node} } = useEditor((state, query) => ({
        displayName: state.nodes[id].data?.displayName
      }));

    return(
        <>
        <div className="layer-item">
            <div style={{display:"flex", alignItems:"center"}}
                 onClick={()=>actions.selectNode(id)}>
                <MoveLayerIcon /> <span>{displayName}</span>
            </div>
            <div className="layer-cta">

            </div>
        </div>
        <style jsx>{`
            .layer-item{
                padding:15px 0;
                border-top:1px solid #BFBFBF;
                display:flex;
                align-items:center;
                
            }

            .layer-cta{

            }
        `}</style>
        </>
    )
}


const Layout = ({open,onClose=()=>{},title})=>{

    return(
        <Container open={open} onClose={()=>onClose()} title={title}>
           
            <Layer />

        </Container>
    )
}

export default Layout