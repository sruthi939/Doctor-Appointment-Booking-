export const formatCurrency = (amount) => {
    return `$${Number(amount || 0).toLocaleString()}.00`;
};

export const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
};
