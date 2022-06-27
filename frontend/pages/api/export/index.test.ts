import axios from 'axios';

import { generateId, createExportJob } from '.';

it('generate random id', () => {
    const id = generateId()
    expect(id).toBeTruthy()
})

it('create export job', async () => {
    return createExportJob('IP_NetSuite', 'CLASSES')
        .then((url) => {
            console.log(url);
            return axios.get(url);
        })
        .then((res) => expect(res.status).toBe(200));
});
