'use client'
import React,{useState} from 'react'
import iconStyle from '@/component/Icons/icons.module.css'

type contentProps = {
    children?: React.ReactNode;
    content?: string;
}

export default function InfoIcon({children, content}: contentProps) {

    const [contentState, setContentState] = useState(false);
    const openAbsoluteContent = () =>{
      setContentState(!contentState);
    }

  return (
    <>
    {content !=='' && content !== undefined ?
    <div className={`${iconStyle.info__icon__box}`} onClick={openAbsoluteContent}>
        <div className={`${iconStyle.info__icon__absolute_content} ${contentState ? iconStyle.info__icon__block:''} `}>
          {content}
        </div>
        <div className={`${iconStyle.info__icon__i}`} >
            i
        </div>
    </div>
   :''}
   </>
  )
}

