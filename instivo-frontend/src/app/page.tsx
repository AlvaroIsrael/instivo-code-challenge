'use client';
import { IApiResponse } from '@/app/types';
import axios from 'axios';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useReward } from 'react-rewards';
import { useDebounce } from 'use-debounce';
import * as Yup from 'yup';
import {
  Button,
  Container,
  ErrorText,
  Form,
  Input,
  Label,
  ResponseBox,
  ResponseBoxError,
  Small,
  Subtitle,
  Title,
} from './styles';

export default function Home() {
  const { reward: confettiReward, isAnimating } = useReward(
    'rewardId',
    'confetti',
  );

  const [formData, setFormData] = useState({
    date: '2025-03-11',
    salary: '1',
    zipCode: '00000-000',
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<IApiResponse | null>(null);
  const [apiError, setApiError] = useState<boolean>(false);

  const [zipCodeError, setZipCodeError] = useState<boolean>(false);

  const handleDateChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [debouncedZipCode] = useDebounce(formData.zipCode, 1000);

  useEffect(() => {
    const schema = Yup.object().shape({
      zipCode: Yup.string()
        .trim()
        .matches(/^\d{5}-\d{3}$/)
        .required('O formato do CEP é 00000-000.'),
    });

    schema
      .validate({ zipCode: debouncedZipCode }, { abortEarly: false })
      .then(() => {
        setZipCodeError(false);
      })
      .catch(() => {
        setZipCodeError(true);
      });
  }, [debouncedZipCode]);

  const handleZipCodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setApiError(false);
    setResponse(null);

    try {
      const res = await axios.post(
        'http://localhost:3333/v1/calculations',
        {
          date: formData.date,
          salary: parseFloat(formData.salary),
          zipCode: formData.zipCode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = res.data;
      setResponse(data);
      confettiReward();
      // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    } catch (error) {
      setResponse(null);
      setApiError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form>
        <Title>Api de Cálculos 🧮</Title>
        <Subtitle>Preencha os campos abaixo:</Subtitle>

        <Label>Data Admissão:</Label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleDateChange}
        />

        <Label>Salário (R$):</Label>
        <Input
          type="number"
          name="salary"
          min="1"
          value={formData.salary}
          onChange={handlePaymentChange}
        />

        <Label>CEP:</Label>
        <Input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          placeholder="00000-000"
          error={zipCodeError}
          maxLength={9}
          onChange={handleZipCodeChange}
        />
        {zipCodeError && <Small error={zipCodeError}>Formato: 00000-000</Small>}

        <Button disabled={isAnimating} onClick={handleSubmit}>
          <span id="rewardId" />
          {loading ? '⏳ Calculando...' : '🔍 Calcular'}
        </Button>

        {apiError && (
          <ResponseBoxError>
            <ErrorText>Falha ao consultar os dados.</ErrorText>
          </ResponseBoxError>
        )}

        {response && (
          <ResponseBox>
            <h3>Consulta Realizada</h3>
            <>
              <p>
                <strong>Dias Passados:</strong> {response.daysPassed}
              </p>
              <p>
                <strong>Meses Passados:</strong> {response.monthsPassed}
              </p>
              <p>
                <strong>Anos Passados:</strong> {response.yearsPassed}
              </p>
              <p>
                <strong>35% do Salário:</strong> R$ {response.salaryPercentage}
              </p>
              <p>
                <strong>Endereço:</strong>
              </p>
              <p>
                {response.zipCodeData.logradouro}, {response.zipCodeData.bairro}
              </p>
              <p>
                {response.zipCodeData.localidade} - {response.zipCodeData.uf} (
                {response.zipCodeData.estado})
              </p>
              <p>
                <strong>Região:</strong> {response.zipCodeData.regiao} |{' '}
                <strong>DDD:</strong> {response.zipCodeData.ddd}
              </p>
            </>
          </ResponseBox>
        )}
      </Form>
    </Container>
  );
}
