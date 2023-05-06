import { cleanup, render, screen } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

const testCases = [
  { amount: '100', from: 'PLN', to: 'USD', expectedResult: 'PLN 100.00 = $28.57' },
  { amount: '20', from: 'USD', to: 'PLN', expectedResult: '$20.00 = PLN 70.00' },
  { amount: '200', from: 'PLN', to: 'USD', expectedResult: 'PLN 200.00 = $57.14' },
  { amount: '345', from: 'USD', to: 'PLN', expectedResult: '$345.00 = PLN 1,207.50' },
];

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  testCases.forEach((testCase) => {
    it('should render proper info about conversion when PLN -> USD and USD -> PLN', () => {
      render(<ResultBox from={testCase.from} to={testCase.to} amount={Number(testCase.amount)} />);

      const resultField = screen.getByTestId('result');

      expect(resultField).toHaveTextContent(testCase.expectedResult);

      cleanup();
    });
  });

  it('should render text “Wrong value…” when the number is negative', () => {
    render(<ResultBox from="PLN" to="USD" amount={-100} />);

    const resultField = screen.getByTestId('result');

    expect(resultField).toHaveTextContent('Wrong value...');
  });
});
