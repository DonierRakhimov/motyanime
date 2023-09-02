import React from "react"
import ContentLoader from "react-content-loader"

const VideoLoader = (props) => (
  <ContentLoader 
    speed={2}
    width="100%"
    height="420"
    backgroundColor='#cccccc'
    foregroundColor='#f5f5f5'
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="471" height="240" /> 
    <rect x="495" y="0" rx="5" ry="5" width="414" height="80" /> 
    <rect x="495" y="90" rx="5" ry="5" width="204" height="32" />
    <rect x="495" y="132" rx="5" ry="5" width="414" height="288" /> 
    <rect x="933" y="0" rx="5" ry="5" width="150" height="28" /> 
    <rect x="933" y="48" rx="5" ry="5" width="62" height="28" /> 
    <rect x="1000" y="48" rx="5" ry="5" width="83" height="28" /> 
    <rect x="933" y="91" rx="5" ry="5" width="62" height="28" /> 
    <rect x="1000" y="91" rx="5" ry="5" width="83" height="28" /> 
    <rect x="933" y="134" rx="5" ry="5" width="62" height="28" /> 
    <rect x="1000" y="134" rx="5" ry="5" width="83" height="28" /> 
    <rect x="933" y="177" rx="5" ry="5" width="62" height="28" /> 
    <rect x="1000" y="177" rx="5" ry="5" width="83" height="28" /> 
  </ContentLoader>
)

export default VideoLoader