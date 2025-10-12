import styled from 'styled-components';

export const Card = styled.div`
  padding: 1.25rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
`;

export const CardDescription = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #4b5563;
`;
