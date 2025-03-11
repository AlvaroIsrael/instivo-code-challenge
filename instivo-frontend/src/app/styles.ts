import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #778f98;
  font-family: Arial, sans-serif;
  color: #333333;
`;

export const Form = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

export const Title = styled.h2`
  text-align: center;
  margin: 0 0 5px 0;
  font-size: 30px;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
`;

export const Label = styled.label`
  display: block;
  margin-top: 10px;
  font-weight: bold;
  font-size: 14px;
`;

export const Small = styled.small.withConfig({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})<{ error?: boolean }>`
  color: ${(props) => (props.error ? '#f00' : '#333')} !important;
`;

export const Input = styled.input.withConfig({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})<{ error?: boolean }>`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: ${(props) => (props.error ? '1px solid #f00' : '1px solid #ccc')};
  color: ${(props) => (props.error ? '#f00' : '#333')} !important;
  border-radius: 5px;
  font-size: 14px;
  outline: none;

  &:disabled {
    background: #eee;
  }
`;

export const Button = styled.button`
  width: 100%;
  margin-top: 15px;
  padding: 10px;
  background: black;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #333;
  }

  &:disabled {
    background: #888;
    cursor: not-allowed;
  }
`;

export const ResponseBox = styled.div`
  margin-top: 15px;
  padding: 15px;
  background: #e3f2fd;
  border-radius: 5px;
  font-size: 14px;
  border: 1px solid #90caf9;
  color: #0d47a1;

  h3 {
    margin: 5px 0;
    font-size: 16px;
    font-weight: bold;
  }

  p {
    margin: 3px 0;
  }
`;

export const ErrorText = styled.p`
  color: #691212;
  font-weight: bold;
`;

export const ResponseBoxError = styled.div`
  margin-top: 15px;
  padding: 15px;
  background: #fde3e3;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #f99090;
  color: #a10d0d;

  h3 {
    margin: 5px 0;
    font-size: 16px;
    font-weight: bold;
  }

  p {
    margin: 3px 0;
  }
`;
