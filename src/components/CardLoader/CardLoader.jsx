import React from 'react';
import ContentLoader from 'react-content-loader';

const CardLoader = (props) => (
  <ContentLoader
    speed={2}
    width='100%'
    height='500'
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x='0' y='0' rx='10' ry='10' width='100%' height='400' />
    <rect x='0' y='420' rx='5' ry='5' width='55' height='25' />
    <rect x='65' y='420' rx='5' ry='5' width='90' height='25' />
    <rect x='0' y='470' rx='5' ry='5' width='100%' height='28' />
  </ContentLoader>
);

export default CardLoader;
