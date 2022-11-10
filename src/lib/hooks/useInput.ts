import { useRef, useState } from "react";

export const useInput = (initialValue = "") => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return { value, setValue, onChange, inputRef };
};
