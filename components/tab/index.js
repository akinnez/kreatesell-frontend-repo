import React from 'react'



export const TabItem = ({children})=>{

    return children
}


const Index = ({children, active=0, titles=[], onSelect=()=>{}})=>{

    return(
        <>
        <ul className="tab-wrapper">
            {
                titles?.map((item,i)=>(
                    <li key={i} 
                   onClick={()=>onSelect(i)}
                    className={active == i ? 'active': active > i ? 'completed':'disabled'}>{item}</li>
                ))
            }
          
        </ul>
        {
            React.Children.map(children,(child,i)=>{
                if(child.type.name == "TabItem" && active == i){
                    return child
                }
                    
                
            })
        }

        <style jsx>{`
            .tab-wrapper{
                list-style-type:none;
                display:flex;
                gap:10px;
                padding:0;
                border-bottom:1px solid #BFBFBF;
                justify-content:center;
            }

            .tab-wrapper li{
                border-bottom:2px solid transparent;
                padding:10px;
                font-size:16px;
                cursor:pointer;
            }

            .tab-wrapper li.active{
                font-weight:700;
                color:#0072EF;
                border-bottom-color:#0072EF;
                transition:all 4ms ease-in-out;
            }

            .tab-wrapper li.completed{
                color:#2DC071;
            }

        
        `}</style>
        </>
    )
}

export default Index