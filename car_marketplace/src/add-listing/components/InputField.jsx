import { Input } from '@/components/ui/input'
import React from 'react'

function InputField({item}) {
    console.log
    console.log(item?.type)
  return (
    <div>
        <Input name={item?.name} type={item.type} required={item?.required}></Input>
    </div>
  )
}



export default InputField