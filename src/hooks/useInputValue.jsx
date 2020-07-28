import { useState } from 'react';

export const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onValueChange = (e) => setValue(e.target.value);
  return [value, setValue, onValueChange];
};
