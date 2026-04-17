
import Dexie, { type EntityTable } from 'dexie';
import type { Task } from '../domain/task/task.types';

const db = new Dexie('TodoAppDB') as Dexie & {
    tasks: EntityTable<Task, 'id'>;
};

db.version(2).stores({
    tasks: 'id, completed, addedAt'
});

export { db };