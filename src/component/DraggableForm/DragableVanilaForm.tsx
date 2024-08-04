'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './DraggableForm.module.css';
import TextInput from './LeftComponents/TextInput';
import dashboardStyle from '@/styles/dashboard.module.css'
import { jsonFormDataSubmit, draggablesContainerHtmlElement } from '@/utils/dashboardDragableFromFunctions';
import {pageVariable} from '@/utils/constants'
import InfoIcon from '@/component/Icons/InfoIcon';

type fieldProps = {
    name?:string;
    type?:string;
    label?:string;
    id?: string;
    value?: string;
    infoText?: string;
}

type EditProps = {
  editMode?: boolean | null;
  editPageData?: any;
}
type fieldEditProps = {
  pagename: string[];
  [key: string]: string[];
}

export default function DraggableVanillaForm({editMode, editPageData}:EditProps) {

const [fieldsData, setFieldsData] = useState<fieldProps[]>([]);
const [fieldCount, setFieldCount] = useState(1);
const [message, setMessage] = useState('');
const [messageStatus, setMessageStatus] = useState('');
const inputRef = useRef<(HTMLInputElement | null)[]>([]);
const [editPageName, setEditPageName] = useState<string>('');

const addFields = () =>{
    const keyData = {name:'input_type_field_key_'+fieldCount, type: 'text', label: 'Field Key '+fieldCount,id:'key_'+fieldCount, value:'', infoText:"key name for page layout"};
    const valueData = {name:'input_type_field_value_'+fieldCount, type: 'select', label: 'Field Value '+fieldCount,id:'value_'+fieldCount, value:'', infoText:"field type select for content side layout"};
    setFieldsData(prev => [...prev, keyData, valueData]);
    setFieldCount(fieldCount+1);
}

const updateFieldsEdit = (editPageData: fieldEditProps) => {
  for (const [key, value] of Object.entries(editPageData)) {
    if (key === 'pagename') {
      setEditPageName(value[0]); // Assuming `value` is an array with one string
      continue;
    }

    const countValue = key.split('input_type_field_key_');
    if (countValue.length > 1) {
      const countStr = countValue[1];
      const count = Number(countStr);
      setFieldCount(count);
      
      console.log("key: " + key);
      console.log("value: " + value);

      const keyData = { name: key, type: 'text', label: 'Field Key ' + count, id: 'key_' + count, value: '', infoText: "key name for page layout" };
     // setFieldsData(prev => [...prev, keyData]);

      const correspondingValueKey = 'input_type_field_value_' + count;
      const correspondingValue = editPageData[correspondingValueKey];
      
      if (correspondingValue) {
        const fieldType = correspondingValue[0]; // Assuming `correspondingValue` is an array with one string
        const valueData = { name: correspondingValueKey, type: 'select', label: 'Field Value ' + count, id: 'value_' + count, value: fieldType, infoText: "field type select for content side layout" };
        setFieldsData(prev => [...prev, keyData, valueData]);
      }
    }
  }
};

useEffect(()=>{
  editMode ? updateFieldsEdit(editPageData) : '';
},[editPageData]);

useEffect(()=>{
  console.log(fieldsData);
},[]);

  useEffect(() => {
    const draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.container');
    draggablesContainerHtmlElement(draggables, containers);

}, [fieldsData]);

const jsonFormDataSubmitWithCallBack = async(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  await jsonFormDataSubmit(e, (message, status)=>{
      setMessage(message);
      setMessageStatus(status);
      setFieldsData(prev=> prev.map(field => ({
        ...field,
        value: ''
        }))
  );
    //console.log(message+ " update message of submission" + status)
  });

}

const handleInputChange = (index: number, value: string) => {
  const updatedFields = [...fieldsData];
  updatedFields[index].value = value;
  setFieldsData(updatedFields);
};

  return (
    <div className='dragable__layout__wrapper__main'>
    <div className={`development__heading__name__description ${dashboardStyle.display__block} ${dashboardStyle['p-20']} ${dashboardStyle.text__align__left}`}><h1>{editMode !== true ? pageVariable.create_page_development_h1: pageVariable.edit_page_development_h1}</h1><h4>{editMode !== true ? pageVariable.create_page_development_h4 : pageVariable.edit_page_development_h4}</h4></div>
    <div className={` ${dashboardStyle.add__wrapper__button__section} ${dashboardStyle.display__flex} ${dashboardStyle.display__justifycontent__flexend} ${dashboardStyle.width100} ${dashboardStyle['p-20']} ${dashboardStyle.text__align__right}`}><InfoIcon content={pageVariable.create_page_development_button_icon} /><button className={`${dashboardStyle.btn__primary}`} onClick={addFields}>Add Fields</button></div>
    <div className={styles.formContainer}>
      <div className={`${styles.section} ${styles.leftSection} container`}>
        
        {fieldsData.map((flData, index)=> <TextInput infoText={flData.infoText}  key={flData.id} name={flData.name} label={flData.label} type={flData.type} className={`${styles.draggable} draggable`} draggable={true} value={flData.value} onChange={(e) => handleInputChange(index, e.target.value)} /> )}
       {/* <div className={`${styles.draggable} draggable`} draggable="true">Field 3</div>*/}
      </div>
      <form onSubmit={jsonFormDataSubmitWithCallBack} className={`${dashboardStyle.dragable_container_full_with}`}>
        {message && <p className={`submitmessage ${ messageStatus === '500'? dashboardStyle.hard_error : messageStatus === '400' ? dashboardStyle.soft_error : dashboardStyle.green_success }`}>{message}</p>}
      <TextInput infoText={pageVariable.create_page_development_info_icon_page_name} key="1002345" name="pagename" label="Page Name" type='text' className={`${styles.draggable} draggable-none`} value={editPageName} draggable={false} disabled={editMode === true ? editMode : false} />
      <div className={`${styles.section} ${styles.rightSection} container ${dashboardStyle.width100} ${dashboardStyle['p-20']} ${dashboardStyle.m_b_10}`}>
       {/* <div className={`${styles.draggable} draggable`} draggable="true">Field 4</div>*/}
      </div>
      <input type='submit' name='jsonsubmit' value={editMode === true ? 'Update' : 'Submit'} className={`${dashboardStyle.btn__primary}`} />
      </form>
    </div>
    </div>
  );
}
