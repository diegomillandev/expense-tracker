import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { useBudget } from '../hooks/useBudget';

export const BudgetForm = () => {
    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget();

    const handleBudget = (event: ChangeEvent<HTMLInputElement>) => {
        const inputText: number = event.target.valueAsNumber;
        if (!isNaN(inputText)) {
            setBudget(inputText);
        } else {
            setBudget(0);
        }
    };

    const isValidBudget = useMemo(() => {
        return budget === 0 ? false : true;
    }, [budget]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch({
            type: 'add-budget',
            payload: { budget },
        });
    };

    return (
        <form action="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label
                    htmlFor="budget"
                    className="text-4xl text-blue-600 font-bold text-center"
                >
                    Define Budget
                </label>
                <input
                    type="number"
                    className="border bg-gray-100 md:w-2/3 w-full md:mx-auto py-2 rounded-md ps-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Add budget"
                    value={budget === 0 ? '' : budget}
                    onChange={handleBudget}
                    name="budget"
                    id="budget"
                />
            </div>
            <input
                type="submit"
                value={'Define Budget'}
                className="bg-blue-600 mt-5 md:w-2/3 w-full md:mx-auto block py-2 font-bold text-white text-lg rounded-md hover:cursor-pointer hover:bg-blue-700 transition-colors duration-200 ease-in-out disabled:opacity-25 disabled:cursor-not-allowed"
                disabled={!isValidBudget}
            />
        </form>
    );
};
