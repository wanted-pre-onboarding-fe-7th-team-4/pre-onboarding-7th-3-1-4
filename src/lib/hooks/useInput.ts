import { useRef, useState } from "react";
import useDebounce from "./useDebounce";

export const useInput = (initialValue = "") => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    console.log("onchange실행");
  };

  const debounceValue = useDebounce(value, 200);

  return { value, setValue, onChange, inputRef, debounceValue };
};
