import { useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import { ExpenseDetail } from '.';

export const ExpenseList = () => {
    const { state } = useBudget();
    const isEmpty = useMemo(
        () => state.expenses.length === 0,
        [state.expenses]
    );

    const expenses = state.expenses;

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
                        {/* <div className="self-end bg-white p-2 rounded-md mb-5">
                            <select onChange={handleChangeFilter}>
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
                        </div> */}
                    </div>
                    {expenses.length !== 0 ? (
                        expenses.map((expense) => (
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
