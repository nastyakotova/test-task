import { v4 as uuidv4 } from 'uuid';
import { DataType } from './types';

export const concatItems = (items: DataType[], items2: DataType[]) => {
    return items.concat(items2).map((item) => ({ ...item, key: uuidv4() }));
};
