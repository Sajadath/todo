import { TextareaHTMLAttributes } from "react";

interface StyledTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  customClassName?: string;
}

function StyledTextarea({ customClassName, ...props }: StyledTextareaProps) {
  return (
    <>
      <label className="sr-only">Notes</label>
      <textarea
        {...props}
        className={`mt-2 w-full resize-y  transition-color duration-300 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-md px-3  py-2 text-sm focus:ring-2 min-h-[100px] focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:placeholder:text-indigo-300 dark:focus:placeholder:text-indigo-500 focus:outline-none ${customClassName} `}
      />
    </>
  );
}

export default StyledTextarea;
