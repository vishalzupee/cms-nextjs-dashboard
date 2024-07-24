'use client';
import React, { useEffect, useState } from 'react';
import styles from './DraggableForm.module.css';
import TextInput from './LeftComponents/TextInput';
import dashboardStyle from '@/styles/dashboard.module.css'
import { jsonFormDataSubmit, getDragAfterElement, draggablesContainerHtmlElement } from '@/utils/dashboardDragableFromFunctions';

type fieldProps = {
    name?:string;
    type?:string;
    label?:string;
    id?: string;
}

export default function DraggableVanillaForm() {

const [fieldsData, setFieldsData] = useState<fieldProps[]>([]);
const [fieldCount, setFieldCount] = useState(1);

const addFields = () =>{
    const keyData = {name:'input_type_field_key_'+fieldCount, type: 'text', label: 'Field Key '+fieldCount,id:'key_'+fieldCount};
    const valueData = {name:'input_type_field_value_'+fieldCount, type: 'text', label: 'Field Value '+fieldCount,id:'value_'+fieldCount};
    setFieldsData(prev => [...prev, keyData, valueData]);
    setFieldCount(fieldCount+1);
}


  useEffect(() => {
    const draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.container');
    draggablesContainerHtmlElement(draggables, containers);

}, [fieldsData]);


  return (
    <div className='dragable__layout__wrapper__main'>
    
    <div className={` ${dashboardStyle.add__wrapper__button__section} ${dashboardStyle.display__block} ${dashboardStyle['p-20']} ${dashboardStyle.text__align__right}`}><button className={`${dashboardStyle.btn__primary}`} onClick={addFields}>Add Fields</button></div>
    <div className={styles.formContainer}>
      <div className={`${styles.section} ${styles.leftSection} container`}>
        
        {fieldsData.map((flData, index)=> <TextInput key={flData.id} name={flData.name} label={flData.label} type={flData.type} className={`${styles.draggable} draggable`} draggable={true} /> )}
       {/* <div className={`${styles.draggable} draggable`} draggable="true">Field 3</div>*/}
      </div>
      <form onSubmit={jsonFormDataSubmit} className={`${dashboardStyle.dragable_container_full_with}`}>
      <TextInput key="1002345" name="pagename" label="Page Name" type='text' className={`${styles.draggable} draggable-none`} draggable={false} />
      <div className={`${styles.section} ${styles.rightSection} container ${dashboardStyle.width100}`}>
       {/* <div className={`${styles.draggable} draggable`} draggable="true">Field 4</div>*/}
      </div>
      <input type='submit' name='jsonsubmit' value="Submit" className={`${dashboardStyle.btn__primary}`} />
      </form>
    </div>
    </div>
  );
}
