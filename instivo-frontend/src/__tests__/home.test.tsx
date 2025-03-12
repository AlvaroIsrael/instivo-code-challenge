import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IApiResponse } from '@/app/types';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { expect, test, vi } from 'vitest';
import Home from '../app/page';

describe('Home', () => {
  it('Renderiza a home corretamente', () => {
    render(<Home />);
    expect(screen.getByTestId('title')).toBeInTheDocument();
  });

  test('Deve chamar api corretamente e exibir os dados na tela', async () => {
    render(<Home />);

    const user = userEvent.setup();

    const apiResponse: IApiResponse = {
      idUuid: '0dd22444-6362-48a1-9bab-d4c26730d1ee',
      daysPassed: 1,
      monthsPassed: 0,
      yearsPassed: 0,
      salaryPercentage: 350,
      zipCodeData: {
        cep: '30220-150',
        logradouro: 'Rua Exemplo',
        complemento: 'de 831/832 a 1379/1380',
        unidade: '',
        bairro: 'Centro',
        localidade: 'Belo Horizonte',
        uf: 'MG',
        estado: 'Minas Gerais',
        regiao: 'Sudeste',
        ibge: '6549',
        gia: '',
        ddd: '31',
        siafi: '1231',
      },
    };

    const mockData = { data: apiResponse };

    const postSpy = vi.spyOn(axios, 'post').mockResolvedValue(mockData);

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

      expect(postSpy).toHaveBeenCalledTimes(1);

      expect(screen.getByTestId('response-box')).toBeInTheDocument();
    });
  });
});
