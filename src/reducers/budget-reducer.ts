import { DraftExpense, Expense } from '../types';
import { v4 as uuidv4 } from 'uuid';

export type BudgetActions =
    | { type: 'add-budget'; payload: { budget: number } }
    | { type: 'show-modal' }
    | { type: 'hidden-modal' }
    | { type: 'add-expense'; payload: { expense: DraftExpense } };

export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
};

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: [],
};

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget,
        };
    }
    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true,
        };
    }

    if (action.type === 'hidden-modal') {
        return {
            ...state,
            modal: false,
        };
    }
    if (action.type === 'add-expense') {
        const newExpense = {
            ...action.payload.expense,
            id: uuidv4(),
        };
        return {
            ...state,
            expenses: [...state.expenses, newExpense],
        };
    }
    return state;
};
