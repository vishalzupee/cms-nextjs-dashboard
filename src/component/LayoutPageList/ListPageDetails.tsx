'use client'
import React, { useCallback, useEffect, useState } from 'react'
import DraggableVanillaForm from '../DraggableForm/DragableVanilaForm';
import { useSearchParams } from 'next/navigation';

type detailsProps = {
    slug?: string;
}

export default function ListPageDetails({slug}:detailsProps) {
   // console.log(slug);
   const serchParam = useSearchParams();
   const editModeParam = serchParam.get('edit');
   const [editMode, setEditMode] = useState(false);
   const [editPageData, setEditPageData] = useState<any[]>([]);

    useEffect(()=>{
     getDetailsofCurrentJsonData();
    },[slug]);

    useEffect(() => {
      setEditMode(editModeParam === 'true' ? true : false);
    }, [editModeParam]);

    const getDetailsofCurrentJsonData = useCallback(async() =>{
       const resp = await fetch('/api/jsonPagelistdata',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({slug})});
       const data = await resp.json();
      setEditPageData(data.content);
    },[])


  return (
    <>
     <DraggableVanillaForm editMode={editMode} editPageData={editPageData} />
    </>
  )
}
