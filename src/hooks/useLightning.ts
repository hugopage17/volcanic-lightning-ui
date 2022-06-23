import { useEffect, useState } from "react";
import { GeoJSON } from "@global-volcanic-lightning/types";
import axios from 'axios';

const useLightning = () => {
    const [lightning, setLightning] = useState<GeoJSON | null>(null);
    const [loading, isLoading] = useState(true);
    const [error, setError] = useState(false);

    const toggleLoading = () => isLoading(true);

    useEffect(() => {
        if (loading === true) {
            axios.get(`${process.env.REACT_APP_API_URL}/v0/rest/lightning`)
                .then(res => {
                    setLightning(res.data)
                    setError(false)
                })
                .catch(() => setError(true))
                .finally(() => isLoading(false))
        } 
    }, [loading]);

    return { lightning, setLightning, loading, toggleLoading, error }
};

export default useLightning;
