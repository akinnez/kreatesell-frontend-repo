import { useState } from "react";
// import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css";
import { Toolbar } from "./ProductToolbar";

const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

export default function ProductEditor (){
    const [content, setContent] = useState('')
    return(
        <div className="w-full h-full">
            <ReactQuill
             placeholder="Text here"
            value={content}
            onChange={(e)=>setContent(e)}
            modules={Toolbar.modules}
            formats={Toolbar.formats}
            />
        </div>
    )
}   
