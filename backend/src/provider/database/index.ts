import 'reflect-metadata';
import { DataSource, Connection, getConnectionManager } from 'typeorm';
import Entity from './entity';

export const connection = new DataSource({
    name: 'default',
    type: 'postgres',
    host: process.env.PG_HOST || 'localhost',
    port: parseInt(process.env.PG_PORT || '5432'),
    username: process.env.PG_USERNAME || 'postgres',
    password: process.env.PG_PASSWORD || '',
    database:
        process.env.NODE_ENV === 'production' ? 'postgres' : 'postgres-dev',
    synchronize: process.env.NODE_ENV !== 'production',
    entities: Entity,
});

const options = {
    default: {
        type: 'postgres',
        host: process.env.PG_HOST || 'localhost',
        port: process.env.PG_PORT || 5432,
        username: process.env.PG_USERNAME || 'postgres',
        password: process.env.PG_PASSWORD || '',
        database:
            process.env.NODE_ENV === 'production' ? 'postgres' : 'postgres-dev',
        synchronize: process.env.NODE_ENV !== 'production',
        entities: Entity,
    },
};

const entitiesChanged = (prevEntities: any[], newEntities: any[]): boolean => {
    if (prevEntities.length !== newEntities.length) return true;

    for (let i = 0; i < prevEntities.length; i++) {
        if (prevEntities[i] !== newEntities[i]) return true;
    }

    return false;
};

const updateConnectionEntities = async (
    connection: Connection,
    entities: any[]
) => {
    // @ts-ignore
    if (!entitiesChanged(connection.options.entities, entities)) return;

    // @ts-ignore
    connection.options.entities = entities;

    // @ts-ignore
    connection.buildMetadatas();

    if (connection.options.synchronize) {
        await connection.synchronize();
    }
};

export const ensureConnection = async (
    name: string = 'default'
): Promise<Connection> => {
    const connectionManager = getConnectionManager();

    if (connectionManager.has(name)) {
        const connection = connectionManager.get(name);

        if (!connection.isConnected) {
            await connection.connect();
        }

        if (process.env.NODE_ENV !== 'production') {
            // @ts-ignore
            await updateConnectionEntities(connection, options[name].entities);
        }

        return connection;
    }

    // @ts-ignore
    return await connectionManager.create({ name, ...options[name] }).connect();
};

export default connection;
