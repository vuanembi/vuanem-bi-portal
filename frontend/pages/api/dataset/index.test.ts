import { listDatasets } from '.';

it('return all datasets', async () => {
    return listDatasets().then((datasets) => expect(datasets).toBeTruthy());
});
