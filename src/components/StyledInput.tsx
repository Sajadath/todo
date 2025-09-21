"use client";

import { useState } from "react";

interface StyledTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  customClassName?: string;
  handleOnBlur?: () => void;
}

function StyledTextInput({
  handleOnBlur,
  customClassName,
  ...props
}: StyledTextInputProps) {
  const [isBeingFocused, setIsBeingFocused] = useState(false);

  function handleBlur() {
    handleOnBlur?.();
    setIsBeingFocused(false);
  }
  return (
    <div className="relative mt-2 grow ">
      <label className="sr-only">Task title</label>
      <label
        className={`absolute  text-xs transition-all duration-300 px-3 -translate-y-1/2   select-none ${
          isBeingFocused
            ? "top-0 text-indigo-500 left-2"
            : props.value
            ? "top-0 text-gray-500 left-2"
            : "top-1/2 text-gray-500 left-3"
        }  px-2 bg-[#f7f9fa] cursor-text`}
        htmlFor="task-title"
      >
        {props.placeholder}
      </label>
      <input
        type="text"
        onFocus={() => setIsBeingFocused(true)}
        onBlur={handleBlur}
        {...Object.fromEntries(
          Object.entries(props).filter(([key]) => key !== "placeholder")
        )}
        className={`w-full border  border-gray-200 transition-all  duration-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:placeholder:text-indigo-300 focus:outline-none ${customClassName}`}
      />
    </div>
  );
}

export default StyledTextInput;
