import React from 'react'

export const useForm = (initalState) => {
  const [formData, setFormData] = React.useState(initalState);

  const handleChange = React.useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  return {formData, handleChange, setFormData};
}