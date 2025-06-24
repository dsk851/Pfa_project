import { Input } from '@/components/ui/input'
import React from 'react'

function InputField({item, handleInputChange, carInfo}) {
  // console.log("item input", item);
  return (
    <div>
        <Input 
        name={item?.name} 
        type={item.type} 
        required={item?.required}
        defaultValue={carInfo?.[item?.name] || ''}
        onChange={(e)=>handleInputChange(item.name,e.target.value)}
        ></Input>
    </div>
  )
}



export default InputField