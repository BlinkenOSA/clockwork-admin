import Head from "next/head";
import React from "react";
import {useData} from "../../../../utils/hooks/useData";
import style from "./PrintStyle.module.scss";
import moment from "moment";

export default function RequestsPrint() {
  const { data, loading, refresh} = useData(`/v1/research/requests`, {});

  const dateToday = () => {

  }

  return (
    <React.Fragment>
      <Head>
        <title>AMS - Archival Management System - Print Requests</title>
      </Head>
      <div className={style.Wrapper}>
        <div className={style.Content}>
          <h1>Requests Pending on {moment().format('YYYY-MM-DD')}</h1>
        </div>
      </div>
    </React.Fragment>
  )
}