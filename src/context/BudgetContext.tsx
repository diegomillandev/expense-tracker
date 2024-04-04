import { useReducer, createContext, Dispatch, ReactNode } from 'react';
import {
    BudgetActions,
    BudgetState,
    budgetReducer,
    initialState,
} from '../reducers/budget-reducer';

type BudgetContextProps = {
    state: BudgetState;
    dispatch: Dispatch<BudgetActions>;
};

type BudgetProviderProps = {
    children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);
    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
};
