import React, { createContext, useContext, useState } from 'react';

// Create a context to store form data
const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
    const [formData, setFormData] = useState(null);

    return (
        <FormDataContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormDataContext.Provider>
    );
};

export const useFormData = () => useContext(FormDataContext);
