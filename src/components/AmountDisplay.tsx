import { formatCurrency } from '../helpers';

type AmountDisplayProps = {
    label?: string;
    amount: number;
};

export const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {
    return (
        <p className="text-2xl text-blue-600 font-bold">
            {label && `${label}: `}
            <span className="font-black text-xl text-gray-700">
                {formatCurrency(amount)}
            </span>
        </p>
    );
};
