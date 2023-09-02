import React from 'react';
import { DetailUl } from './styled-components';
import Detail from '../../Detail/Detail';

export default function DetailList({ detailList }) {
  return (
    <DetailUl>
      {detailList.map((detail, index) => (
        <Detail key={index} detail={detail[0]} detailValue={detail[1]}></Detail>
      ))}
    </DetailUl>
  );
}
