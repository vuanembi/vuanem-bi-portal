import { listTables } from './[id]';

it('return all tables', async () => {
    return listTables('OP_Marketing').then((tables) =>
        expect(tables).toBeTruthy()
    );
});
