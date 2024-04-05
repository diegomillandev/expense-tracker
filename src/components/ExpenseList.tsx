import { useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import { ExpenseDetail } from '.';

export const ExpenseList = () => {
    const { state } = useBudget();
    const isEmpty = useMemo(
        () => state.expenses.length === 0,
        [state.expenses]
    );
    return (
        <div className="mt-10">
            {isEmpty ? (
                <p className="text-gray-600 text-2xl text-center uppercase font-bold">
                    No expenses
                </p>
            ) : (
                <>
                    <p className="text-gray-600 text-2xl text-center font-bold my-5">
                        List of expenses
                    </p>
                    {state.expenses.map((expense) => (
                        <ExpenseDetail key={expense.id} expense={expense} />
                    ))}
                </>
            )}
        </div>
    );
};
