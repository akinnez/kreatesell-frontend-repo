import React from 'react'
import { useEditor } from '@craftjs/core';
import LayerItem from './Item';


const Layer = ()=>{
    const { descendants } = useEditor((state, query) => ({
        descendants: query.node('ROOT').descendants()
      }));

      return(
          <>
          {
              descendants?.map((item,i)=>(
                    <LayerItem id={item} key={i}/>
              ))
          }
          </>
      )
}

export default Layer