import React, { useId } from 'react';

function InputComp({label, type = 'text', className = '', error = '', ...props}, ref){

  const id = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block mb-1 pl-1 text-sm font-medium text-gray-700"> {label} </label>}

      <input id={id}        
        type={type}
        ref={ref} 
        className={`px-3 py-2 mb-5 rounded-lg bg-white text-black outline-none border w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 border-gray-300 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p> }
    </div>
  );
}

const Input = React.forwardRef(InputComp);
export default Input;
