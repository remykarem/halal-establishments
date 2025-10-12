import styled from 'styled-components';

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'outline' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  
  ${props => props.$variant === 'secondary' ? `
    background-color: #3b82f6;
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: #2563eb;
    }
  ` : props.$variant === 'outline' ? `
    background-color: transparent;
    color: inherit;
    border: 1px solid #d1d5db;
    
    &:hover:not(:disabled) {
      background-color: #f9fafb;
    }
  ` : `
    background-color: #4f46e5;
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: #4338ca;
    }
  `}
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => 
      props.$variant === 'secondary' ? 'rgba(59, 130, 246, 0.5)' : 
      'rgba(79, 70, 229, 0.5)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SmallButton = styled(Button)`
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
`;
