import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchPayments } from '../services/paymentService';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPayments = async () => {
        const token = localStorage.getItem('admin_token');
        if (!token || token === 'false') {
            setLoading(false);
            return;
        }
        setLoading(true);
        const res = await fetchPayments();
        if (res.payments) setPayments(res.payments);
        setLoading(false);
    };

    useEffect(() => {
        loadPayments();
    }, []);

    return (
        <PaymentContext.Provider value={{ payments, loading, refreshPayments: loadPayments }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePaymentContext = () => useContext(PaymentContext);
export default PaymentContext;
