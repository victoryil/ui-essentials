import {useEffect, useRef} from "react";

export function useFirstRender(): boolean {
    const isFirst = useRef(true);
    useEffect(() => { isFirst.current = false; }, []);
    return isFirst.current;
}