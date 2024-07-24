import { ReactNode } from "react";
type CallbackAnswer = (message: string, status: string) => void;
//type CallbackAnswer = (message: string, status: 'success' | 'error') => void;


export const jsonFormDataSubmit = async(e:React.FormEvent<HTMLFormElement>, callBackanswer:CallbackAnswer) =>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const objectFormData = Object.fromEntries(formData.entries());

    const groupedFormData: Record<string, string[]> = {};

   formData.forEach((value, key) => {
     if (!groupedFormData[key]) {
       groupedFormData[key] = [];
     }
     groupedFormData[key].push(value as string);
   });


   try {
       const response = await fetch('/api/jsonSaveData', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(groupedFormData),
       });
 
       if (response.ok) {
         console.log('Form data saved successfully');
         callBackanswer("Form Submmited Successfully", "200");
       } else {
         console.error('Error saving form data');
         callBackanswer("something went wrong.", "400");
       }
     } catch (error) {
        callBackanswer('Request Not able to handel by server: 500', "500");
       console.error('Error:', error);
     }

   }

   export function getDragAfterElement(container:Element, y:number): Element | null {
    //const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    const draggableElements = Array.from(container.querySelectorAll('.draggable:not(.dragging)'));

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY, element: null as Element | null  }).element;
  }
  
  export const draggablesContainerHtmlElement =(draggables: NodeListOf<Element>, containers: NodeListOf<Element>) =>{


    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
          draggable.classList.add('dragging');
        });
  
        draggable.addEventListener('dragend', () => {
          draggable.classList.remove('dragging');
        });
      });
  
      containers.forEach(container => {
        container.addEventListener('dragover', (e) => {
          e.preventDefault();
          const afterElement = getDragAfterElement(container,  (e as DragEvent).clientY);
          const dragging = document.querySelector('.dragging');
          if (dragging && container) {
          if (afterElement == null) {
            container.appendChild(dragging);
          } else {
            container.insertBefore(dragging, afterElement);
          }
        }
        });
      });

  }