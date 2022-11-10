import { useState } from "react";

export const useInput = (
  initialValue = ""
): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  React.ChangeEventHandler<HTMLInputElement>
] => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  return [value, setValue, onChange];
};
