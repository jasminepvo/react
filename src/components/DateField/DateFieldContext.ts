import { createContext, useContext } from 'react';
import type { DateFieldContextProps } from './types';

export const DateFieldContext = createContext<DateFieldContextProps | undefined>(undefined);

export const useDateFieldContext = () => {
    const context = useContext(DateFieldContext);
    if (!context) {
        throw new Error('DateField compound components must be used within DateField');
    }
    return context;
}; 