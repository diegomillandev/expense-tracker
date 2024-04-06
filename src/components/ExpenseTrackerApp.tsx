import { useEffect, useMemo } from 'react';
import {
    BudgetForm,
    BudgetTracker,
    ExpenseList,
    ExpenseModal,
    Header,
} from '.';
import { useBudget } from '../hooks/useBudget';

export const ExpenseTrackerApp = () => {
    const { state } = useBudget();

    useEffect(() => {
        localStorage.setItem('budget', JSON.stringify(state.budget));
        localStorage.setItem('expenses', JSON.stringify(state.expenses));
    }, [state.budget, state.expenses]);

    const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);
    return (
        <>
            <Header />
            <section className=" max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
                {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
            </section>
            {isValidBudget && (
                <main className="max-w-3xl mx-auto py-10">
                    <ExpenseList />
                    <ExpenseModal />
                </main>
            )}
        </>
    );
};
