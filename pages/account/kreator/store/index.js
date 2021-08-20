import React,{useState,useEffect} from 'react'
import { Row, Column,Divider } from '../../../../components/grid'
import styles from '../../../../public/css/Store.module.scss'
import AuthLayout from "../../../../components/authlayout"
import {Button} from '../../../../components/inputPack'
import {Card} from '../../../../components/card'
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import List from '../../../../components/list'
import Router from 'next/router'
import {Spin} from 'antd'
import {ProtectedStoreHeader} from '../../../../components/store/storeHeader'
import ApiService from '../../../../utils/axios'
import {getStore} from '../../../../redux/actions/store.actions'
import { useSelector,useDispatch } from 'react-redux'

const cardStyles = {
    borderRadius:"8px",
    padding:"35px 30px"
}

const progressbarStyles = buildStyles({
    rotation: 0.30,
   strokeLinecap: 'round',
   textSize: '24px',
   fontWeight:600,
   pathTransitionDuration: 0.5,
   pathColor: '#0072EF',
   textColor: '#595959',
   trailColor: '#E6F7FF'
 })



const Index = ()=>{

    const [step] = useState(0)
 
    const {user} = useSelector(state=>state.utils) || {}
   

  

    return(
        <>
        
        
        <AuthLayout>
           
          <ProtectedStoreHeader />
            <Row style={{marginTop:"100px"}}>
                <Column m="7" s="12">
                    <Card style={cardStyles}>
                        <div className={styles.bio_info}>
                            <h5>Description</h5>
                            <p>{user?.bio_data}</p>
                         </div>
                    </Card>
                </Column>
                <Column m="5">
                <Card  style={{...cardStyles}}>
                <div className={styles.progress_wrapper}>
                    <div className={styles.progress}>
                        <CircularProgressbar 
                            text={user?.completed+'%'}
                            value={user?.completed}
                            strokeWidth={15}
                            styles={progressbarStyles} />
                    </div>
                    <div id={styles.progress_text}>
                        <p>You've completed <strong>{user?.completed}%</strong> of your store setup</p>
                    </div>
                </div>
                <Divider />

                <List step={user?.completed <= 40 ? 0: user?.completed > 40 && user?.completed <100 ? 1:3} 
                    list={[
                    "Complete your store profile details",
                    "Add your bank account details to receive your payments",
                    "Add your first product to increase your store completion"]}
                    />
                </Card>
                </Column>
            </Row>

            <Row>
                <Column m="12" s="12" align="center" style={{marginTop:"20px"}}>
                    <p>Almost there, now click the button to add your product</p>
                        <Button label="+ Add Product" style={{marginTop:"20px"}} onClick={()=>Router.push("#")}/>
                </Column>
            </Row>
         
        
        </AuthLayout>
       
        
        </>
    )
}

export default Index