import axios from 'axios';
import { HTTPMethods } from '@global-volcanic-lightning/types';

interface Args<P> {
    path: string;
    method: HTTPMethods;
    body?: P;
}

const httpClient = async <T, P = {}>({ path, method, body }: Args<P>): Promise<{ res: T, status: number }> => {
    const url = `${process.env.REACT_APP_API_URL}/v0/rest`
    if (method === HTTPMethods.GET) {
        const req = await axios.get(`${url}/${path}`);
        return {
            res: req.data,
            status: req.status
        }
    }
    const req = await axios.post(`${url}/${path}`, body);
    return {
        res: req.data,
        status: req.status
    }
};

export default httpClient;
