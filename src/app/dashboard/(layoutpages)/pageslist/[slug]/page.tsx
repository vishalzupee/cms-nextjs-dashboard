import ListPageDetails from '@/component/LayoutPageList/ListPageDetails';
import React from 'react'

type paramsProps = {
    params: {
    slug: string
    }
}

export default function slugLayoutPage({params}:paramsProps) {
    
    const {slug} = params;

  return (
    <>
     <ListPageDetails slug={slug}/>
    </>
  )
}

