import React from 'react';
import { DetailB, DetailItem, DetailSpan } from './styled-components';

export default function Detail({ detail, detailValue }) {
  if (
    !detailValue ||
    detailValue.includes('undefined') ||
    detailValue.includes('null')
  ) {
    return;
  }
  return (
    <DetailItem>
      <DetailSpan>{detail}&nbsp;</DetailSpan>
      <DetailB>{detailValue}</DetailB>
    </DetailItem>
  );
}
