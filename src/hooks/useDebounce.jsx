const { useState, useEffect } = require("react");

function useDebounce(changeValue, delayTime) {
  const [debounceValue, setDebounceValue] = useState(changeValue);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebounceValue(changeValue);
    }, delayTime);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [delayTime, debounceValue]);
  return debounceValue;
}

export default useDebounce;
