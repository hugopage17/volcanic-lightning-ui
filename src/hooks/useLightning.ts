import { useEffect, useState } from "react";
import { GeoJSON } from "@global-volcanic-lightning/types";
import fetchLightning from "../api/fetchLightning";

const useLightning = () => {
    const [lightning, setLightning] = useState<GeoJSON | null>(null);
    const [loading, isLoading] = useState(true);
    const [error, setError] = useState(false);

    const reload = () => isLoading(true);

    useEffect(() => {
        if (loading === true) {
            fetchLightning().then(({ res }) => {
                setLightning(res)
                setError(false)
            })
            .catch(() => setError(true))
            .finally(() => isLoading(false))       
        } 
    }, [loading]);

    return { lightning, loading, reload, error }
};

export default useLightning;
