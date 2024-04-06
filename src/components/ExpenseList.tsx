import { useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import { ExpenseDetail } from '.';
import { categories } from '../constants';

export const ExpenseList = () => {
    const { state, dispatch } = useBudget();
    const isEmpty = useMemo(
        () => state.expenses.length === 0,
        [state.expenses]
    );

    const filterExpenses = useMemo(() => {
        if (!state.filterExpensesID) return state.expenses;
        const filter = state.expenses.filter(
            (expense) => expense.category === state.filterExpensesID
        );
        return filter;
    }, [state.filterExpensesID]);

    const handleChangeFilter = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const idCategory = +event.target.value;
        dispatch({ type: 'filter-expenses', payload: { id: idCategory } });
    };

    return (
        <div className="mt-0">
            {isEmpty ? (
                <p className="text-gray-600 text-2xl text-center uppercase font-bold">
                    No expenses
                </p>
            ) : (
                <>
                    <div className="flex flex-col">
                        <p className="text-gray-600 text-2xl text-center font-bold my-5">
                            List of expenses
                        </p>
                        <div className="self-end bg-white p-2 rounded-md mb-5">
                            <select
                                defaultValue={''}
                                onChange={handleChangeFilter}
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.name}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {filterExpenses.length !== 0 ? (
                        filterExpenses.map((expense) => (
                            <ExpenseDetail key={expense.id} expense={expense} />
                        ))
                    ) : (
                        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center cursor-pointer rounded-lg">
                            <p className=" text-gray-600 font-bold">
                                No Found Expends this Category
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
