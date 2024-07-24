'use client';
import React, {useState} from 'react'

type textInputProps = {
    className?: string;
    draggable?: boolean;
    name?:string;
    type?:string;
    label?:string;
    id?: number;
    value?: string | number | undefined;
    ref?: React.ReactNode
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void
}

type fieldNameProps = {
    type?: string;
    name?: string;
    value?: string | number | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

}

const checkFieldAreaName =({type, name, value}: fieldNameProps)=>{
   
    if(type === 'text' || type === ''){
      return <input type={type} className='input_type_field' value={value} name={name} />
    }else if(type==='textarea'){
     return <textarea name={name} className='inpuut_type_field' >{value}</textarea>
    }

}

const TextInput= ({ id, name, type, label, className = '', draggable, value, onChange }: textInputProps) =>{
    const joinedClass = ['input__field__wrapper', className].join(' ');

    return (
        <>
            <div key={id} className={joinedClass} draggable={draggable}>
                <div className='label__field__label'>{label}</div>
                <div className='input__field_area'>
                {type === 'textarea' ? (
                    <textarea
                        name={name}
                        className='input_type_field'
                        value={value}
                        onChange={onChange}
                    />
                ) : (
                    <input
                        type={type}
                        className='input_type_field'
                        value={value}
                        name={name}
                        onChange={onChange}
                    />
                )}
                </div>
            </div>
        </>
    )
}
export default TextInput;