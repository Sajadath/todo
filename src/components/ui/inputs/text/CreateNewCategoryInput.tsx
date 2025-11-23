import type { Dispatch, SetStateAction } from "react";

interface CreateNewCategoryInputProps {
  newCategoryName: string;
  setNewCategoryName: Dispatch<SetStateAction<string>>;
}

function CreateNewCategoryInput({
  newCategoryName,
  setNewCategoryName,
}: CreateNewCategoryInputProps) {
  return (
    <input
      type="text"
      maxLength={30}
      value={newCategoryName}
      onChange={(e) => {
        setNewCategoryName(e.target.value);
      }}
      placeholder="New Category Name"
      className=" w-full max-w-[15rem] border border-gray-300 text-xs text-indigo-600  dark:text-indigo-400 dark:focus:placeholder:text-indigo-500 focus:placeholder:text-indigo-300 focus:text-gray-700 dark:focus:text-gray-200 dark:border-gray-700 dark:bg-gray-800   rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none"
    />
  );
}

export default CreateNewCategoryInput;
