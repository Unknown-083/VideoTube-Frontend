import React, { forwardRef, useId } from "react";

const Input = ({
  label,
  type = "text",
  classname = "",
  placeholder = "",
  value,
  bgColor = "",
  textColor = "text-white",
  ...props
}, ref) => {
  const id = useId();

  return (
    <div className="flex flex-col">
      {label && <label htmlFor={id} className="text-sm mb-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...(type !== "file" && { value })}
        className={`border border-gray-700 rounded-full px-4 py-2 ${bgColor} ${textColor} ${classname}`}
        id={id}
        {...props}
      />
    </div>
  );
};

export default forwardRef(Input);
