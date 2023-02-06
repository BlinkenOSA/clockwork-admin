import Head from "next/head";
import React from "react";
import {useData} from "../../../../utils/hooks/useData";
import style from "./PrintStyle.module.scss";
import moment from "moment";

export default function RequestsPrint() {
  const { data, loading, refresh} = useData(`/v1/research/requests/print`, {});



  const renderRequestsForDay = (date, idx) => {
    const requestsForDay = data.filter(d => d['request_date'] === date)
    const requestDay = moment(date).format('YYYY-MM-DD, dddd')

    const renderIdentifier = (data) => {
      switch (data['item_origin']) {
        case 'FA':
          return data['archival_reference_number']
        case 'L':
          return 'Library'
        case 'FL':
          return 'Film Library'
      }
    }

    const renderType = data => {
      switch (data['item_origin']) {
        case 'FA':
          return data['carrier_type']
        case 'L':
          return 'Book'
        case 'FL':
          return 'Film Library Movie'
      }
    }

    return (
      <div key={idx}>
        <h2>{requestDay}</h2>
        <table>
          <thead>
            <tr>
              <th>Identifier</th>
              <th>MLR</th>
              <th>Type</th>
              <th>Researcher</th>
            </tr>
          </thead>
          <tbody>
            {
              requestsForDay.map((request, idx) => {
                return (
                  <tr key={`request_${idx}`}>
                    <td width={200}>{renderIdentifier(request)}</td>
                    <td width={250}>{request['mlr']}</td>
                    <td width={150}>{renderType(request)}</td>
                    <td width={200}>{request['researcher']}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }

  const renderTables = () => {
    const requestDates = [...new Set(data.map(d => d['request_date']))];

    return (
      requestDates.map((date, idx) => {
        return (renderRequestsForDay(date, idx))
      })
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>AMS - Archival Management System - Print Requests</title>
      </Head>
      { data &&
        <div className={style.Wrapper}>
          <div className={style.Content}>
            <h1>Requests Pending on {moment().format('YYYY-MM-DD')}</h1>
            {renderTables()}
          </div>
        </div>
      }
    </React.Fragment>
  )
}