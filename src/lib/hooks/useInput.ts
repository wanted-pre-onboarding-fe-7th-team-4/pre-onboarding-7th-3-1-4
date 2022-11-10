import { useRef, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useInput = (initialValue = "") => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);
  const debounce = useDebounce();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    debounce(() => setValue(value), 100);
  };

  return { value, setValue, onChange, inputRef };
};
