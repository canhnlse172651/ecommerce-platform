export const formatCurrency = (amount) => {
  if (isNaN(amount)) {
    return 'Invalid number';
  }

  return amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};
