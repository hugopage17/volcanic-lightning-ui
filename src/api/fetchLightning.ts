import { GeoJSON, HTTPMethods } from "@global-volcanic-lightning/types";
import httpClient from './httpClient';

const fetchLightning = async () => {
    const lightningReq = await httpClient<GeoJSON>({
        path:'lightning',
        method: HTTPMethods.GET
    });

    return lightningReq;
};

export default fetchLightning;
