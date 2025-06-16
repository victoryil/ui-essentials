import { useEffect, useState } from "react";
import { getAdaptiveLayout } from "../core/adaptiveLayout";
import {Breakpoint, Layout} from "../utils/types";

export function useAdaptiveLayout(breakpoints: Breakpoint[]): Layout {
    const [layout, setLayout] = useState<Layout>(() =>
        getAdaptiveLayout(breakpoints)
    );

    useEffect(() => {
        const update = () => setLayout(getAdaptiveLayout(breakpoints));
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [breakpoints]);

    return layout;
}