import { styled } from 'styled-components';

export const DetailItem = styled.li`
  font-family: var(--font-primary);
  margin: 0 0 5px 0;
  font-weight: 400;
  font-size: 16px;
  display: block;
  color: var(--color-grey-light);
  letter-spacing: 0.5px;
`;

export const DetailSpan = styled.span`
  color: var(--color-white);
  display: inline-block;
  letter-spacing: 1.5px;
  font-weight: 400;
  font-size: 16px;
  font-family: var(--font-primary);
  line-height: 1.5;
`;

export const DetailB = styled.b`
  color: var(--color-primary);
  font-weight: bolder;
`;
