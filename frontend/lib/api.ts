import axios from 'axios';

const apiClient = (module: string) => {
    const baseURL = [process.env.NEXT_PUBLIC_API_URL || '/api', module].join(
        '/',
    );
    return axios.create({ baseURL });
};

export default apiClient;
