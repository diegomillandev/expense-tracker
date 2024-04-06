import { Category, DraftExpense, Expense } from '../types';
import { v4 as uuidv4 } from 'uuid';

export type BudgetActions =
    | { type: 'add-budget'; payload: { budget: number } }
    | { type: 'show-modal' }
    | { type: 'hidden-modal' }
    | { type: 'add-expense'; payload: { expense: DraftExpense } }
    | { type: 'delete-expense'; payload: { id: Expense['id'] } }
    | { type: 'get-id-expense'; payload: { id: Expense['id'] } }
    | { type: 'edit-expense'; payload: { expense: Expense } }
    | { type: 'filter-expenses'; payload: { id: Category['id'] } }
    | { type: 'reset-app' };

export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
    editingID: Expense['id'];
    filterExpensesID: Category['id'];
};

const localStorageBudget = (): number => {
    const budgetLS = localStorage.getItem('budget');
    return budgetLS ? JSON.parse(budgetLS) : 0;
};

const localStorageExpenses = (): Expense[] => {
    const expensesLS = localStorage.getItem('expenses');
    return expensesLS ? JSON.parse(expensesLS) : [];
};

export const initialState: BudgetState = {
    budget: localStorageBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingID: '',
    filterExpensesID: 0,
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
            editingID: '',
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

    if (action.type === 'delete-expense') {
        const leakedExpenses = state.expenses.filter(
            (expense) => expense.id !== action.payload.id
        );
        return {
            ...state,
            expenses: leakedExpenses,
        };
    }

    if (action.type === 'get-id-expense') {
        return {
            ...state,
            editingID: action.payload.id,
            modal: true,
        };
    }

    if (action.type === 'edit-expense') {
        const updatedExpenses = state.expenses.map((expense) => {
            if (expense.id === action.payload.expense.id) {
                return action.payload.expense;
            }
            return expense;
        });
        return {
            ...state,
            expenses: updatedExpenses,
            modal: false,
            editingID: '',
        };
    }

    if (action.type === 'filter-expenses') {
        return {
            ...state,
            filterExpensesID: action.payload.id,
        };
    }

    if (action.type === 'reset-app') {
        return {
            budget: 0,
            modal: false,
            expenses: [],
            editingID: '',
        };
    }

    return state;
};
