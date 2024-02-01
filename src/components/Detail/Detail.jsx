import React from "react";
import s from "./detail.module.css";

export default function Detail({ detail, detailValue }) {
  if (
    !detailValue ||
    detailValue.includes("undefined") ||
    detailValue.includes("null")
  ) {
    return;
  }
  return (
    <li className={s.root}>
      <span className={s.detailKey}>{detail}&nbsp;</span>
      <b className={s.detailValue}>{detailValue}</b>
    </li>
  );
}
