import { styled } from 'styled-components';

export const SortWrapper = styled.div`
  position: relative;
`

export const SortToggle = styled.button`
  background-color: transparent;
  border: none;
  color: inherit;
  font-size: inherit;
  padding: 0;
  line-height: inherit;
  cursor: pointer;

  &:hover {
    color: var(--color-purple);
    transition: 0.3s color;
  }
`;

export const Label = styled.label`
  font-weight: 400;
  font-size: 16px;
  color: var(--color-grey-light);
  font-family: var(--font-primary);
  letter-spacing: 0.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: max-content;

  &:hover {
    color: var(--color-purple);
    transition: 0.3s color;
  }
`;

export const RadioButton = styled.input`
  position: absolute;
  opacity: 0;
`;

export const CustomRadio = styled.span`
  display: inline-block;
  position: relative;
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-primary);
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 10px;

  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 2px; 
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transform: ${(props) => (props.checked ? 'scale(1)' : 'scale(0)')};
    transition: 120ms transform ease-in-out;
    background-color: var(--color-purple);
  }
`;
