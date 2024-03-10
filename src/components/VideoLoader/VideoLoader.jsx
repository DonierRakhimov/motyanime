import React from "react";
import ContentLoader from "react-content-loader";
import s from "./videoloader.module.css";

const VideoLoader = () => (
  <div className={s.root}>
    <ContentLoader
      speed={2}
      width="100%"
      height="307"
      backgroundColor="#cccccc"
      foregroundColor="#f5f5f5"
    >
      <rect x="0" y="0" rx="10" ry="10" width="100%" height="307" />
    </ContentLoader>
    <ContentLoader
      width="100%"
      height="400"
      backgroundColor="#cccccc"
      foregroundColor="#f5f5f5"
    >
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="80" />
      <rect x="0" y="90" rx="5" ry="5" width="100%" height="32" />
      <rect x="0" y="132" rx="5" ry="5" width="100%" height="288" />
    </ContentLoader>
    <ContentLoader
      width="100%"
      height="400"
      backgroundColor="#cccccc"
      foregroundColor="#f5f5f5"
    >
      <rect x="0" y="0" rx="5" ry="5" width="150" height="28" />
      <rect x="0" y="48" rx="5" ry="5" width="62" height="28" />
      <rect x="67" y="48" rx="5" ry="5" width="83" height="28" />
      <rect x="0" y="91" rx="5" ry="5" width="62" height="28" />
      <rect x="67" y="91" rx="5" ry="5" width="83" height="28" />
      <rect x="0" y="134" rx="5" ry="5" width="62" height="28" />
      <rect x="67" y="134" rx="5" ry="5" width="83" height="28" />
      <rect x="0" y="177" rx="5" ry="5" width="62" height="28" />
      <rect x="67" y="177" rx="5" ry="5" width="83" height="28" />
    </ContentLoader>
  </div>
);

export default VideoLoader;
