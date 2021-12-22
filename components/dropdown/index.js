import React,{useState,useEffect, useRef} from 'react'


const Index = ({Button,children,width, ...rest})=>{

    const container = useRef()

    const [show, setShow] = useState(false)

    useEffect(()=>{
        document.addEventListener("mouseup",(event)=>{
            if (
                container.current &&
                !container.current.contains(event.target)
              ) {
                setShow(false)
              }
        })
    })

    return(
        <>
     
                   <span onClick={()=>setShow(!show)}>{
                       Button || "Click here"
                   }</span>
                    <div className="dropdown-wrapper" {...rest} ref={container}>
                        {
                            show ? 
                        <div className="dropdown-menu">
                           {children}
                        </div>:null
                        }

                    </div>

            <style jsx>{`
                .dropdown-wrapper{
                    position:relative;
                    width:auto;
                    right:0;
                    margin-top:10px;
                    background:blue
                }


                .dropdown-menu{
                    position:absolute;
                    display:inline-block;
                    top:20;
                    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
                    border-radius: 8px;
                    padding:5px;
                    animation-name: DropDownSlide;
                    animation-duration: .3s;
                    animation-fill-mode: both;
                    will-change: transform;
                    background-color:#ffffff;
                }

                .dropdown-menu div{
                    width:200px
                }

                @keyframes DropDownSlide{
                    100% {
                        transform: translateY(0);
                    }
                    0% {
                        transform: translateY(20px);
                    }
                }
            
            `}</style>
        </>
    )
}


export default Index