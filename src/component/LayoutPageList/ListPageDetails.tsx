'use client'
import React, { useEffect } from 'react'

type detailsProps = {
    slug: string
}

export default function ListPageDetails({slug}:detailsProps) {
   // console.log(slug);

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
    <div>ListPageDetails</div>
  )
}
