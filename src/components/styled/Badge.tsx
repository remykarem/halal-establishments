import styled from 'styled-components';

export const Badge = styled.span<{ $variant?: 'default' | 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => props.$variant === 'primary' ? `
    background-color: #eef2ff;
    color: #4338ca;
    box-shadow: inset 0 0 0 1px rgba(67, 56, 202, 0.2);
  ` : props.$variant === 'secondary' ? `
    background-color: #dbeafe;
    color: #1e40af;
    padding: 0.25rem 0.5rem;
  ` : `
    background-color: #f3f4f6;
  `}
`;
