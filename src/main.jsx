import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './router/Routes';
import { FormDataProvider } from './cv-form/FormDataProvider';


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <FormDataProvider>
      <RouterProvider router={router} />
    </FormDataProvider>

  </React.StrictMode>,
)
