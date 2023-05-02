import React from 'react';

const Input = ( type: string, placeholder: string, value: string ) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

    return (
    <input
        className='input'
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
    />
  );
}

export default Input;