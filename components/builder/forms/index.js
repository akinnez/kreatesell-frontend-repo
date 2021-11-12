import TextFont from './TextFont'
import Uploader from './uploader'
import GroupFormat,{TextFormat,ColorPicker,BoxModel} from './FontFormat'
import { Input } from 'antd'

const MyInput = ({label,value,onChange=()=>{},...rest})=>{

    return(
        <div style={{display:"flex",gap:10, alignItems:"center"}}>
            <label style={{fontSize:16, color:"#595959"}}>{label}</label>
            <Input {...rest} value={value} onChange={(e)=>onChange(e.target.value)}/>
        </div>
    )
}
export{
    TextFont,
    GroupFormat,
    TextFormat,
    ColorPicker,
    BoxModel,
    MyInput,
    Uploader
}