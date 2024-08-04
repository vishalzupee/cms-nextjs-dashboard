'use client'
import React, { useEffect } from 'react'
import DraggableVanillaForm from '../DraggableForm/DragableVanilaForm';
import { useSearchParams } from 'next/navigation';

type detailsProps = {
    slug: string
}

export default function ListPageDetails({slug}:detailsProps) {
   // console.log(slug);
   const serchParam = useSearchParams();
   const editMode = serchParam.get('edit');

    useEffect(()=>{
     getDetailsofCurrentJsonData();
    },[]);

    const getDetailsofCurrentJsonData = async() =>{
       const resp = await fetch('/api/jsonPagelistdata',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({slug})});
       const data = await resp.json();
       console.log(data);
    }


  return (
    <>
     <DraggableVanillaForm edit={editMode} />
    </>
  )
}
