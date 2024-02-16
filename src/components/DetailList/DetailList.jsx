import React from "react";
import Detail from "../Detail/Detail";
import s from "./detaillist.module.css";

export default function DetailList({ detailList = [] }) {
  return (
    <ul className={s.root}>
      {detailList.map((detail, index) => (
        <Detail key={index} detail={detail[0]} detailValue={detail[1]}></Detail>
      ))}
    </ul>
  );
}
