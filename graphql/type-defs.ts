import { readFileSync } from 'fs';
import path from 'path';

export const typeDefs = readFileSync(
    path.resolve(process.cwd(), 'graphql/schema.graphql'),
    {
        encoding: 'utf-8',
    }
);
