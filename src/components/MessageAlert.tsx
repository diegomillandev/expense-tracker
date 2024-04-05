import { ReactNode } from 'react';

type MessajeAlertProps = {
    children: ReactNode;
};

export const MessageAlert = ({ children }: MessajeAlertProps) => {
    return (
        <p className="text-center bg-red-200 py-2 text-red-600 border border-red-300 rounded">
            {children}
        </p>
    );
};
