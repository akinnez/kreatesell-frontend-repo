import React from 'react'
import {HoverCopy, HoverDelete, HoverEdit, HoverMove} from '../icons'
import { useEditor,useNode } from '@craftjs/core';

const Index = ()=>{

  const {id} = useNode()

  

  const {moveable,topLevel,isDeletable,actions,query,connectors:{drag}} = useEditor((state,query)=>({
    isRoot: query.node(id).isRoot(),
    isDeletable: query.node(id).isDeletable(),
    moveable:query.node(id).isDraggable(),
    topLevel:query.node(id).isTopLevelNode()
  }));



    return(
        <>
        <div className="btn-wrapper">
                    <div className="wrapper">
                    <HoverEdit />
                    <HoverCopy  onMouseDown={(e)=>{
                            e.stopPropagation()
                            actions.add(id,'ROOT')
                          }}/>
                    {
                      moveable ? (
                        <HoverMove ref={drag}/>
                      ):null
                    }
                    
                   {
                     isDeletable ?
                     <HoverDelete 
                          onMouseDown={(e)=>{
                            e.stopPropagation()
                            actions.delete(id)
                          }}/>
                     :null
                   }
                        
                      
                    
                  </div>
                </div>
                <style jsx>{`
              .render-wrapper{
                font-size: 12px;
                border: 1px dashed transparent;
                position:relative;
                z-index:9999;
            }

            .btn-wrapper{
              position:absolute;
              top:-20px;
              left:0;
              right:0;
              display:flex;
              justify-content:center;
              z-index:9999;
            }

            .wrapper{
              background: #0072EF;
              padding:10px 5px;
              display:flex;
              gap:10px;
              align-items:center;
            }

            .wrapper svg{
              cursor:pointer;
            }
        `}</style>
        </>
    )
}

export default Index