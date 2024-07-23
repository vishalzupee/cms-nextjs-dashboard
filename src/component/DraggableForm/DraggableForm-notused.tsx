'use client';
// components/DraggableForm.tsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormField {
  id: string;
  type: string;
  label: string;
}

const initialFields: FormField[] = [
  { id: '1', type: 'text', label: 'First Name' },
  { id: '2', type: 'email', label: 'Email' },
  { id: '3', type: 'password', label: 'Password' },
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const DraggableForm: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>(initialFields);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedFields = Array.from(fields);
    const [removed] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, removed);

    setFields(reorderedFields);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      console.log('Form Values:', values);
    },
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <form onSubmit={formik.handleSubmit}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: '8px',
                        margin: '4px',
                        backgroundColor: '#f0f0f0',
                        ...provided.draggableProps.style,
                      }}
                    >
                      <label htmlFor={field.id}>{field.label}</label>
                      <input
                        id={field.id}
                        name={field.type}
                        type={field.type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[field.type]}
                      />
                      {formik.errors[field.type] && formik.touched[field.type] && (
                        <div style={{ color: 'red' }}>{formik.errors[field.type]}</div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <button type="submit">Submit</button>
      </form>
    </DragDropContext>
  );
};

export default DraggableForm;
