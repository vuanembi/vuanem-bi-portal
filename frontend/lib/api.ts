import axios from 'axios';

const getApiClient = (module: string) => {
    const baseURL = [
        process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
        module,
    ].join('/');
    return axios.create({ baseURL });
};

export default getApiClient;
