import { useMemo } from 'react';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatDate } from '../helpers';
import { Category, Expense } from '../types';
import { AmountDisplay } from './AmountDisplay';
import { categories } from '../constants';
import { useBudget } from '../hooks/useBudget';

type ExpenseDetailProps = {
    expense: Expense;
};

export const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
    const { dispatch } = useBudget();
    const categoryInfo: Category = useMemo(
        () =>
            categories.filter(
                (category) => category.id === expense.category
            )[0],
        [expense]
    );

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() =>
                    dispatch({
                        type: 'get-id-expense',
                        payload: { id: expense.id },
                    })
                }
            >
                Edit
            </SwipeAction>
        </LeadingActions>
    );
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() =>
                    dispatch({
                        type: 'delete-expense',
                        payload: { id: expense.id },
                    })
                }
            >
                Deleted
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={30}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center cursor-pointer">
                    <div className="">
                        <img
                            src={`/${categoryInfo.icon}_icon.svg`}
                            alt="icons expense"
                            className="w-20"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <p className="text-slate-700 text-xl font-semibold">
                            {expense.name}
                        </p>
                        <p className="text-xs font-bold uppercase text-slate-500">
                            {categoryInfo.name}
                        </p>
                        <p className="text-slate-600 text-xs">
                            {formatDate(expense.date!.toString())}
                        </p>
                    </div>
                    <AmountDisplay amount={expense.amount} />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};
