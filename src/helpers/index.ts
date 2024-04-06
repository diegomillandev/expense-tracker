import { Expense } from '../types';

export const formatCurrency = (_amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(_amount);
};

export const formatDate = (_date: string): string => {
    const date = new Date(_date);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const calculateAmount = (_arrayObj: Expense[]): number => {
    const estimatedAmount = _arrayObj.reduce(
        (total, Obj) => total + Obj.amount,
        0
    );
    return estimatedAmount;
};
