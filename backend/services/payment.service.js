export const processPaymentGateway = async ({ amount, paymentMethod }) => {
    // Simulated secure payment verification gateway service
    const transactionId = `TXN_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    return {
        success: true,
        transactionId,
        amount,
        paymentMethod,
        timestamp: new Date().toISOString()
    };
};
