import { Input } from '@/components/ui/input'
import React from 'react'

function InputField({item, handleInputChange}) {
  return (
    <div>
        <Input 
        name={item?.name} 
        type={item.type} 
        required={item?.required}
        onChange={(e)=>handleInputChange(item.name,e.target.value)}
        ></Input>
    </div>
  )
}



export default InputField