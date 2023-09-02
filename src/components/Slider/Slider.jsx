// import React from 'react';
// import {
//   InnerProgress,
//   InputRange,
//   ProgressBar,
//   ProgressContainer,
// } from './styled-components';

// export default function Slider({
//   max = 1,
//   min = 0,
//   step = 1,
//   value = 0,
//   onChange = () => {
//     return;
//   },
//   width = '100%',
//   height = '10px',
//   trackColor = '#fff',
//   progressColor = '#a958a5',
//   thumbColor = '#f5cf49',
//   thumbWidth = '20px',
//   thumbHeight = '20px',
// }) {
//   return (
//     <ProgressContainer $sliderWidth={width} $sliderHeight={height}>
//       <ProgressBar $trackColor={trackColor}>
//         <InnerProgress
//           $progressColor={progressColor}
//           $value={value}
//           $max={max}
//           $thumbWidth={thumbWidth}
//         ></InnerProgress>
//       </ProgressBar>
//       <InputRange
//         type='range'
//         max={max}
//         min={min}
//         step={step}
//         value={value}
//         onChange={onChange}
//         $rangeHeight={height}
//         $thumbColor={thumbColor}
//         $thumbWidth={thumbWidth}
//         $thumbHeight={thumbHeight}
//       ></InputRange>
//     </ProgressContainer>
//   );
// }
