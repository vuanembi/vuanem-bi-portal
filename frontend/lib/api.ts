import axios from 'axios';

const getApiClient = (module: string) => {
    const baseURL = [process.env.NEXT_PUBLIC_API_URL || '/api', module].join(
        '/',
    );
    return axios.create({ baseURL });
};

export default getApiClient;
