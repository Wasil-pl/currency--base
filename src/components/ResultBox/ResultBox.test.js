import { cleanup, render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

const testCases = [
  { amount: '100', from: 'PLN', to: 'USD', result: '28.57' },
  { amount: '20', from: 'USD', to: 'PLN', result: '70.00' },
  { amount: '200', from: 'PLN', to: 'USD', result: '57.14' },
  { amount: '345', from: 'USD', to: 'PLN', result: '1,207.50' },
];

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  testCases.forEach((testCase) => {
    it('should render proper info about conversion when PLN -> USD and USD -> PLN', () => {
      render(<ResultBox from={testCase.from} to={testCase.to} amount={Number(testCase.amount)} />);

      const resultField = screen.getByTestId('result');

      const fromCurrencySymbol = testCase.from === 'USD' ? '$' : 'PLN ';
      const toCurrencySymbol = testCase.to === 'USD' ? '$' : 'PLN ';

      let amount = Number(testCase.amount).toFixed(2);
      if (amount.split('.')[1].length === 1) {
        // jeśli wartość amount ma jedno miejsce po przecinku, dodaj zero
        amount += '0';
      } else if (amount.split('.')[1].length === 0) {
        // jeśli wartość amount nie ma miejsc po przecinku, dodaj dwa zera
        amount += '.00';
      }

      expect(resultField).toHaveTextContent(fromCurrencySymbol + amount + ' = ' + toCurrencySymbol + testCase.result);

      cleanup();
    });
  });

  it('should render text “Wrong value…” when the number is negative', () => {
    render(<ResultBox from="PLN" to="USD" amount={-100} />);

    const resultField = screen.getByTestId('result');

    expect(resultField).toHaveTextContent('Wrong value...');
  });
});
