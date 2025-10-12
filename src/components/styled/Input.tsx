import styled from 'styled-components';

export const Input = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.4);
  }
`;
