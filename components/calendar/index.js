import React,{useState} from "react"
import moment from 'moment'
import { NextIcon,PreviousIcon } from "./icon"



const Calendar = ({width,value,onChange=()=>{},label,format="DD/MM/YYYY",CustomInput,...rest})=>{

    const [date, setDate] = useState({
        year:moment().year(),
        month:moment().month(),
        day:moment().format("D")
    })
    
    const [open, setOpen] = useState(false)
  
    const nextMonth =()=>{
        let month = date.month + 1
        if(month > 11){
            month = 0
        }
        setDate({...date, month})
    }

    const previousMonth = ()=>{
        let month = date.month - 1
        if(month < 0){
            month = 11
        }
        setDate({...date, month})
    }

    const changeYear = (e)=>{
      setDate({...date, year:e.target.value})
    }
   
    const handleDate = (d)=>{
       const selected = moment(`${date.year}-${date.month+1}-${d}`,"YYYY-M-D").format(format)
       onChange(selected)
       setDate({...date,day:d})
       setOpen(false)
    }

    const generateDays = ()=>{
        const tempDays = []

        const startOfMonth = moment().year(date.year).month(date.month).startOf("month").day()

        for(let i = startOfMonth; i > 0; i--){
            tempDays.push('-')
        }

        const totalDays = moment().year(date.year).month(date.month).daysInMonth()

        for(let i =1; i<=totalDays; i++){
            tempDays.push(i)
        }
        return tempDays
    }


    const inputProps = {
        value:value,
        onClick:()=>setOpen(true),
        label:label,
        inputstyle:{},
        onChange:(e)=>{},
        ...rest
    }

    return(
        <>
        <div style={{width:width+"%"}}>
            {
               CustomInput ? <CustomInput {...inputProps}/> : <input {...inputProps}/>
            }
            <div className="calendar-wrapper" onClick={()=>setOpen(false)} style={{display:open ? "flex":"none"}}>
            <div className="calendar-container">
               
                <div className="calender-top">
                    <div className="month">
                    <span className="month-name">{moment().month(date.month).format("MMMM")}</span>
                        <input  
                            onKeyPress={(e)=>e.preventDefault()}
                            onKeyDown={(e)=>e.preventDefault()}
                            type="number" className="year"
                         
                            value={moment(date.year,"YYYY").year()} 
                            onChange={(e)=>changeYear(e)}/>
                   </div>
                   <div className="calendar-cta">
                   <PreviousIcon 
                        className="previous" 
                        onClick={()=>previousMonth()}/>
                    <NextIcon 
                        className="next" 
                        onClick={()=>nextMonth()}/>
                   </div>
                </div>
               
               <div className="days-wrapper">
                   <div>Su</div>
                   <div>Mo</div>
                   <div>Tu</div>
                   <div>We</div>
                   <div>Th</div>
                   <div>Fr</div>
                   <div>Sa</div>
               </div>
               <div className="date-wrapper">
                   {
            

            generateDays().map((item,i)=>(
                     
                    <div key={i} className={date.day == item ? 'active-date':''}>
                        {
                       item != '-'?   <span onClick={()=>handleDate(item)}>
                        {item}
                        </span>:null
                        }
                       
                    </div>
                ))
                   }
               </div>
            </div>
            </div>
            </div>
        <style jsx>{`
            .calendar-wrapper{
                position:absolute;
                top:0;
                right:0;
                left:0;
                bottom:0;
                background:rgba(0,0,0,0.5);
                display:flex;
                align-items:center;
                justify-content:center;
            }
            
            .calendar-container{
              min-height:400px;
              width:400px;
              border-radius:12px;
              padding:20px;
              color:#333333;
              z-index:9999;
              background:#ffffff;
              box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 
                    0 3px 1px -2px rgba(0,0,0,0.12), 
                    0 1px 5px 0 rgba(0,0,0,0.2);
            }

            .numb{
                caret-color: transparent;
            }

            .calender-top{
                display:flex;
                justify-content:space-between;
                padding: 0 18px;
                align-items:center;
            }
            
            .month, .year{
                text-transform:uppercase;
                width:90%;
                font-size:20px;
                margin: 10px auto;
            }

            .year{
                display:inline;
                width:65px;
                text-align:center;
                outline:none;
                border:none;
                font-weight:600;
            }

            .month .month-name{
                font-weight:600;
                margin-right: 20px;
            }

            .days-wrapper{
                display:grid;
                grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                font-weight:600;
                margin-top:30px;
                text-align:center;
            }
            
            .date-wrapper{
                display:grid;
                grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                grid-template-rows:1fr 1fr 1fr 1fr 1fr;
                font-weight:600;
                margin-top:20px;
                text-align:center;
            }

            

            .date-wrapper> div span{
                height:40px;
                width:40px;
                display:block;
                margin: 0 auto;
                border-radius:50%;
                padding:10px;
                cursor:pointer;
            }

            .active-date > span{
                background-color:#2C2A67;
                color:#ffffff;
            }

            .date-wrapper> div span:hover{
                background:#F3F3F3;
                transition: background .2s linear;
            }

            .calendar-cta{
               display:flex
              
            }

            .previous{
                margin-right:20px;
            }

            .previous,.next{
                cursor:pointer;
            }

            .date-input-wrapper{
                position:relative;
                width:${width  ? `${width}${width.endsWith('px') ? '' : '%'}` : '100%'};
                height:40px;
                margin-top:20px;
            }


           

            @media only screen and (max-width: 768px) {
                .date-input-wrapper {
                    width: 80%;
                }
            }

            @media only screen and (max-width: 576px) {
                .date-input-wrapper {
                    width: 100%;
                }
            }
        `}</style>
        </>
    )
}

export default Calendar