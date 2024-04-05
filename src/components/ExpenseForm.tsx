import DatePicker from 'react-date-picker';
import { categories } from '../constants';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { DraftExpense, Value } from '../types';
import { useBudget } from '../hooks/useBudget';
import { MessageAlert } from '.';

const initialExpense: DraftExpense = {
    amount: 0,
    name: '',
    category: 0,
    date: new Date(),
};

export const ExpenseForm = () => {
    const [alert, setAlert] = useState(false);
    const [expense, setExpense] = useState<DraftExpense>(initialExpense);
    const { dispatch } = useBudget();

    const handleChangeInput = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        const { id, value } = event.target;
        setExpense({
            ...expense,
            [id]: id === 'name' ? value : +value,
        });
    };

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value,
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            Object.values(expense).includes('') ||
            Object.values(expense).includes(0)
        ) {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 1500);
            return;
        }

        dispatch({ type: 'add-expense', payload: { expense } });
        setExpense(initialExpense);
        dispatch({ type: 'hidden-modal' });
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="text-center text-2xl font-bold text-gray-700 border-b-4 border-blue-600 pb-2">
                New Expense
            </legend>

            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-gray-800">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Add the name"
                    className="bg-slate-200 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-sm"
                    value={expense.name}
                    onChange={handleChangeInput}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="amount" className="text-gray-800">
                    Amount:
                </label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder="Add the amount"
                    className="bg-slate-200 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-sm"
                    value={expense.amount === 0 ? '' : expense.amount}
                    onChange={handleChangeInput}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="category">Category:</label>
                <select
                    name="category"
                    id="category"
                    className="bg-slate-200 p-3 focus:outline-none focus:ring-1 focus:ring-blue-600 rounded-sm"
                    value={expense.category}
                    onChange={handleChangeInput}
                >
                    <option value={0} disabled>
                        Select Category
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <div className="flex flex-col gap-1 mt-2">
                    <label htmlFor="date-picker" className="text-gray-800">
                        Date Expense:
                    </label>
                    <DatePicker
                        className={'bg-slate-100 p-2 border-0'}
                        value={expense.date}
                        id="date-picker"
                        onChange={handleChangeDate}
                    />
                </div>
            </div>
            <input
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 w-full py-2 font-bold uppercase text-white rounded-sm hover:cursor-pointer block"
            />
            {alert && <MessageAlert>{'All fields are required'}</MessageAlert>}
        </form>
    );
};
