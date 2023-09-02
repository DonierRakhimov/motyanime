import { styled } from 'styled-components';

export const ProgressContainer = styled.div`
  position: relative;
  width: ${props => props.$sliderWidth};
  height: ${props => props.$sliderHeight};
`;

export const ProgressBar = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.$trackColor};
  border-radius: 5px;
`;

export const InnerProgress = styled.div`
  background-color: ${props => props.$progressColor};
  height: 100%;
  border-radius: 5px;
  width: ${props => `calc(${(props.$value / props.$max) * 100 + '%'} + ${parseInt(props.$thumbWidth) / 2 + 'px'})`}
`;

export const InputRange = styled.input`
  position: absolute;
  z-index: 2;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
  height: 100%;

  &::-webkit-slider-runnable-track {
    background: transparent;
    height: 100%;
    border-radius: 5px;
  }

  &::-moz-range-track {
    background: transparent;
    height: 100%;
    border-radius: 5px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 50%;
    margin-top: ${props => (parseInt(props.$rangeHeight) / 2) - (parseInt(props.$thumbHeight) / 2) + 'px'};
    width: ${props => props.$thumbWidth};
    height: ${props => props.$thumbHeight};
    background-color: ${props => props.$thumbColor};
  }

  &::-moz-range-thumb {
    border: none;
    border-radius: 50%;
    width: ${props => props.$thumbWidth};
    height: ${props => props.$thumbHeight};
    background-color: ${props => props.$thumbColor};
  }
`;
