import DatePicker from 'react-date-picker';
import { categories } from '../constants';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { DraftExpense, Value } from '../types';
import { useBudget } from '../hooks/useBudget';
import { MessageAlert } from '.';
import { calculateAmount } from '../helpers';

const initialExpense: DraftExpense = {
    amount: 0,
    name: '',
    category: '',
    date: new Date(),
};

export const ExpenseForm = () => {
    const [messageAlert, setMessageAlert] = useState('');
    const [amountExpend, setAmountExpend] = useState(0);
    const { state, dispatch } = useBudget();
    const [expense, setExpense] = useState<DraftExpense>(initialExpense);

    useEffect(() => {
        if (state.editingID) {
            const { name, amount, category, date } = state.expenses.filter(
                (expense) => expense.id === state.editingID
            )[0];
            setExpense({
                name,
                amount,
                category,
                date,
            });
            setAmountExpend(amount);
        }
    }, [state.editingID]);

    const handleChangeInput = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        const { id, value } = event.target;
        setExpense({
            ...expense,
            [id]: id === 'amount' ? +value : value,
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
        const spent = calculateAmount(state.expenses);
        const available = state.budget - spent;
        if (
            Object.values(expense).includes('') ||
            Object.values(expense).includes(0)
        ) {
            setMessageAlert('All fields are required');
            setTimeout(() => {
                setMessageAlert('');
            }, 1500);
            return;
        }
        if (expense.amount > available + amountExpend) {
            setMessageAlert(
                `Exceeds the available quantity of ${available + amountExpend}`
            );
            setTimeout(() => {
                setMessageAlert('');
            }, 2000);
            return;
        }
        if (state.editingID) {
            dispatch({
                type: 'edit-expense',
                payload: { expense: { ...expense, id: state.editingID } },
            });
        } else {
            dispatch({ type: 'add-expense', payload: { expense } });
        }
        setExpense(initialExpense);
        dispatch({ type: 'hidden-modal' });
    };

    const handleBtn = () => {
        return state.editingID ? 'Update Expense' : 'Add Expense';
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
                value={handleBtn()}
            />
            {messageAlert && <MessageAlert>{messageAlert}</MessageAlert>}
        </form>
    );
};
