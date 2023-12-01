
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list':'ordered'},{'list':'bullet'},{'indent':'-1'},{'indent':'+1'}],
        ['link', 'image'],
        ['clean']
    ]
}
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]
const Edit = ({value, onChange}) => {

  return (
    <div>
        <ReactQuill 
            theme="snow" 
            value={value} 
            onChange={onChange}
            modules={modules} 
            formats={formats} />
    </div>
  )
}

export default Edit