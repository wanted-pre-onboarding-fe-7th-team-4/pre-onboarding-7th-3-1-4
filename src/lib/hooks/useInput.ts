import { useRef, useState } from "react";

export const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return { value, setValue, onChange, inputRef };
};
