'use client';
import InfoIcon from '@/component/Icons/InfoIcon';
import React, {useState} from 'react'
import dashboardStyle from '@/styles/dashboard.module.css';

type textInputProps = {
    className?: string;
    draggable?: boolean;
    name?:string;
    type?:string;
    label?:string;
    id?: number;
    value?: string | number | undefined;
    ref?: React.ReactNode
    infoText?: string;
    disabled?: boolean;
    pointerevents?: string | null;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>void
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

const TextInput= ({ id, name, type, label, className = '', draggable, value, infoText, pointerevents, disabled, onChange }: textInputProps) =>{
    const joinedClass = ['input__field__wrapper', className].join(' ');

    return (
        <>
            <div key={id} className={joinedClass} draggable={draggable}>
                <div className='label__field__label'>{label}</div>
                <div className={`${dashboardStyle.input__field_area}`}>
                {type === 'textarea' ? (
                    <textarea
                        name={name}
                        className='input_type_field'
                        value={value}
                        onChange={onChange}
                    />
                ) : type=== 'select' ? (
                <select className='input_type_field' name={name} onChange={onChange}>
                    <option value='' selected={!!value}>----</option>
                    <option value='text' selected={value == 'text'}>Text</option>
                    <option value='textarea' selected={value == 'textarea'}>TextArea</option>
                </select>
                ) : (
                    <input
                        type={type}
                        className={`input_type_field ${pointerevents === 'none'? dashboardStyle.pointerevents:''}`}
                        value={value}
                        name={name}
                        onChange={onChange}
                        disabled={disabled}
                    />
                )}
                </div>
               <InfoIcon content={infoText} />
            </div>
        </>
    )
}
export default TextInput;