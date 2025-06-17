import {useState} from "react";

export function useBoolean(initial = false) {
    const [value, setValue] = useState(initial);
    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);
    const toggle = () => setValue((v) => !v);
    return { value, setTrue, setFalse, toggle };
}