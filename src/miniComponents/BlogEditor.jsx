import React from 'react'
import { Controller } from 'react-hook-form'
import {Editor} from '@tinymce/tinymce-react'

function BlogEditor({name,label,control,defaultValue='',}) {
  return (
    <div className='mb-5' >
      {label && <label className="block mb-1 pl-1 text-sm font-medium text-gray-700" >{label}</label>}
      <Controller
      name={name}
      control={control}
      render={( {field: {onChange}} )=>(
        <Editor
        apiKey='vx65saraprxv8nrb1phgbr08tjep69v8st958n0ws324hhhv'
        initialValue={defaultValue}
        onEditorChange={onChange}
        init={
            {
                initialValue:defaultValue,
                height: 500,
                menubar: true,
                plugins: 
                ["image","advlist","autolink","lists","link","image","charmap","preview","anchor","searchreplace","visualblocks","code","fullscreen","insertdatetime","media","table","code","help","wordcount","anchor",],
                toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: 
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }
        }
        />
      )}
      />
    </div>
  )
}

export default BlogEditor

//EXPLANATION FOR USING CONTROLLER(...FIELD) FOR EDITOR
//har bar field ka kam hota hea, custom component ke andar jake unko lagne vali values ko ...spread karna means uske paas component ke har value ka access hota hea like[value,onChange,onBlur,ref, ...] 
// yaha ham Editors properties uske andar spread nahi kar rahe hea because usko zarurat nahi hea tekin hame onChange function chaye to hum use field se access kar rahe hea