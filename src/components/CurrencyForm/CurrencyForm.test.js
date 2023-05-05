import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';

const testCases = [
  { amount: '100', from: 'PLN', to: 'USD' },
  { amount: '20', from: 'USD', to: 'PLN' },
  { amount: '200', from: 'PLN', to: 'USD' },
  { amount: '345', from: 'USD', to: 'PLN' },
];

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });

  testCases.forEach((testCase) => {
    it('should run action callback with proper data on form submit', () => {
      const action = jest.fn();

      // render component
      render(<CurrencyForm action={action} />);

      // find “convert” button
      const submitButton = screen.getByText('Convert');

      // find input and select elements
      const amountField = screen.getByTestId('amount');
      const selectFrom = screen.getByTestId('selectFrom');
      const selectTo = screen.getByTestId('selectTo');

      // set test values to fields
      userEvent.type(amountField, testCase.amount);
      userEvent.selectOptions(selectFrom, testCase.from);
      userEvent.selectOptions(selectTo, testCase.to);

      // simulate user click on "convert" button
      userEvent.click(submitButton);

      // check if action callback was called once and with proper argument
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({ amount: Number(testCase.amount), from: testCase.from, to: testCase.to });

      // unmount component
      cleanup();
    });
  });
});
