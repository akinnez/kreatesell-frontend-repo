import React,{useState,useEffect} from 'react'


const Index = ({Button,children, ...rest})=>{

    const [show, setShow] = useState(false)

    useEffect(()=>{
        document.addEventListener("mousedown",()=>{
            setShow(false)
        })
    })

    return(
        <>
     
                   <span onClick={()=>setShow(!show)}>{
                       Button || "Click here"
                   }</span>
            <div className="dropdown-wrapper" {...rest}>
               
                {
                    show ? <div className="dropdown-menu">
                    {children}
                </div>:null
                }

            </div>

            <style jsx>{`
                .dropdown-wrapper{
                    position:relative;
                    width:100%;
                    margin-top:10px;
                }


                .dropdown-menu{
                    position:absolute;
                    top:20;
                    left:0;
                    right:0;
                    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
                    border-radius: 8px;
                    padding:5px;
                    animation-name: DropDownSlide;
                    animation-duration: .3s;
                    animation-fill-mode: both;
                    will-change: transform;
                    background-color:#ffffff;
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