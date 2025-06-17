import {useEffect, useRef} from "react";

export function useEventListener<K extends keyof WindowEventMap>(
    event: K,
    handler: (ev: WindowEventMap[K]) => void,
    target: EventTarget = window
) {
    const savedHandler = useRef(handler);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const eventListener = (event: Event) => savedHandler.current(event as any);
        target.addEventListener(event, eventListener);
        return () => target.removeEventListener(event, eventListener);
    }, [event, target]);
}