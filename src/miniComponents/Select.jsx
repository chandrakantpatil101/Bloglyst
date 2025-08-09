import React, { useId } from 'react'


function SelectComp({
  label,  
  options,
  //undefined
  className,
  ...props
},ref) {

    const id = useId();

  return (
    <div className='w-full mb-5'>
      {label && <label htmlFor={id} className="block mb-1 pl-1 text-sm font-medium text-gray-700"> {label} </label>}
      {/* select */}
      <select 
      {...props} 
      id={id}
      ref={ref}
      className={`px-3 py-2 rounded-lg bg-white text-black outline-none
      focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map( (option)=>(
          <option key={option} value={option}>
            {option}
          </option>
        ) )}
      </select>
    </div>
  )
}

const Select = React.forwardRef(SelectComp)

export default Select