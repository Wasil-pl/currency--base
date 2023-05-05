export const convertPLNToUSD = (PLN) => {
  if (typeof PLN === 'undefined') {
    return NaN;
  }

  if (typeof PLN === 'string') {
    return NaN;
  }

  if (typeof PLN !== 'number') {
    return 'Error';
  }

  if (PLN < 0) {
    PLN = 0;
  }

  const PLNtoUSD = PLN / 3.5;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
};
