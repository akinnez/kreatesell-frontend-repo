import React,{useEffect, useState} from 'react'
import Countdown,{zeroPad} from 'react-countdown'
import { useNode } from '@craftjs/core'
import { Collapse,Row,Col,Divider,DatePicker } from 'antd'
import {ColorPicker} from '../../forms'
import moment from 'moment'


const renderer = ({days, hours, minutes, seconds})=>{


    return(
        <>
        
            <div className="time-wrapper">
                <h2>{zeroPad(days)}</h2>
                <span>Days</span>
            </div>
            <div className="time-wrapper">
                <h2>{zeroPad(hours)}</h2>
                <span>Hours</span>
            </div>
            <div className="time-wrapper">
                <h2>{zeroPad(minutes)}</h2>
                <span>Minutes</span>
            </div>
            <div className="time-wrapper">
                <h2>{zeroPad(seconds)}</h2>
                <span>Seconds</span>
            </div>
            
      

        <style jsx>{`
            

            .time-wrapper h2{
                font-size:40px;
                margin:0;
                font-weight:800;
                line-height:1;
            }

            .time-wrapper span{
                margin:0;
                color:#8C8C8C;
            }
        
        `}</style>
        </>
    )
}


const CountdownTimer = ({date,color})=>{
    const {connectors:{connect,drag}} = useNode()
    console.log(color)

   
    return(
        <>
        <div className="renderer-wrapper" ref={ref=>connect(drag(ref))}
        style={{color:color}}>
            <Countdown 
                date={date}
                autoStart={true}
            renderer={renderer}>
            
        </Countdown>
      </div>
      <style jsx>{`
        .renderer-wrapper{
            display:flex;
            gap:40px;
            text-align:center;
        }
      `}</style>
      </>
    )
}

export default CountdownTimer



const {Panel} = Collapse
const CountdownSettings = ()=>{
    const [timer,setTimer] = useState({
        date:'',
        time:''
    })
    const {color,date, actions: {setProp}} = useNode((node) => ({
        color: node.data.props.color,
        date: node.data.props.date,
    }))

    const handleTimer = ()=>{
    
        if(timer.date && timer.time){
            const newDate = timer.date+' '+timer.time
             
           const time = new Date(newDate).getTime()
            
           setProp(props=>props.date = time)   
        }
    
    }

    useEffect(()=>{
        handleTimer()
    },[timer])
    
    return(
        <>
        <Divider />
            <Row>
                <Col span={24}>
                    <div className="date-input-wrapper">
                    <label>Time</label>
                    <DatePicker.TimePicker  
                        defaultValue={moment(Date(date))} format="HH:mm" 
                        onChange={(_,dateString)=>setTimer({...timer, time:dateString})}
                     style={{width:"100%"}} />
                    </div>
                </Col>
            </Row>
            <Row style={{marginTop:20}}>
                <Col span={24}>
                    <div className="date-input-wrapper">
                    <label>Date</label>
                    <DatePicker defaultValue={moment(Date(date))}
                    onChange={(_,dateString)=>setTimer({...timer, date:dateString})} 
                    style={{width:"100%"}}
                     format="YYYY-MM-DD" />
                    </div>
                </Col>
            </Row>

            <Divider />
            <Row style={{marginTop:20}}>
                <Col span={24}>
                    <div className="date-input-wrapper" style={{justifyContent:"space-between"}}>
                    <label>Color</label>
                    <ColorPicker value={color} onChange={(e)=>setProp(props=>props.color=e)} style={{width:"100%"}}
                     format="DD/MM/YYYY" />
                    </div>
                </Col>
            </Row>

      <style jsx>{`
        .date-input-wrapper{
            display:flex;
            gap:10px;
            align-items:center;
        }

        .date-input-wrapper label{
            color:#8C8C8C;
            font-weight:500;
            font-size:16px;
        }
      
      `}</style>
        </>
    )
}




CountdownTimer.craft = {
    displayName:"Countdown",
    props:{
        date:(Date.now()+15000),
        color:"#003A8C"
    },
    related:{
        settings:CountdownSettings
    }
}
