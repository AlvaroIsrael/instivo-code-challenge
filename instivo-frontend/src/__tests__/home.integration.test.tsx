import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import Home from '../app/page';

describe('Home Api Integration', () => {
  test('Chama api real e aguarda o resultado.', async () => {
    render(<Home />);

    const user = userEvent.setup();

    const dateInputs = screen.getAllByTestId('date-input');
    const dateInput = dateInputs[0];
    await user.clear(dateInput);
    await user.type(dateInput, '2025-01-01');

    const salaryInputs = screen.getAllByTestId('salary-input');
    const salaryInput = salaryInputs[0];
    await user.clear(salaryInput);
    await user.type(salaryInput, '1000');

    const zipCodeInputs = screen.getAllByTestId('zip-code-input');
    const zipCodeInput = zipCodeInputs[0];
    await user.clear(zipCodeInput);
    await user.type(zipCodeInput, '30220-150');

    await waitFor(() => expect(zipCodeInput).toHaveValue('30220-150'));

    const submitButtons = screen.getAllByTestId('submit-button');
    const submitButton = submitButtons[0];
    await user.click(submitButton);

    await waitFor(async () => {
      expect(dateInput).toBeInTheDocument();
      expect(dateInput).toHaveValue('2025-01-01');

      expect(salaryInput).toBeInTheDocument();
      expect(salaryInput).toHaveValue(1000);

      expect(zipCodeInput).toBeInTheDocument();
      expect(zipCodeInput).toHaveValue('30220-150');
    });

    await waitFor(
      () => {
        expect(screen.getByTestId('response-box')).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });
});
