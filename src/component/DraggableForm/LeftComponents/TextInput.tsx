'use client';
import React, {useState} from 'react'

type textInputProps = {
    className?: string;
    draggable?: string;
    name?:string;
    type?:string;
    label?:string;
    id?: number;
}

type fieldNameProps = {
    type?: string;
    name?: string
}

const checkFieldAreaName =({type, name}: fieldNameProps)=>{
   
    if(type === 'text' || type === ''){
      return <input type={type} className='input_type_field' name={name} />
    }else if(type==='textarea'){
     return <textarea name={name} className='inpuut_type_field' ></textarea>
    }

}

export default function TextInput({ id, name, type, label, className = '', draggable }: textInputProps) {
    const joinedClass = ['input__field__wrapper', className].join(' ');

    return (
        <>
            <div key={id} className={joinedClass} draggable={draggable}>
                <div className='label__field__label'>{label}</div>
                <div className='input__field_area'>
                    {checkFieldAreaName({type, name})}
                </div>
            </div>
        </>
    )
}
