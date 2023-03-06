import style from "./TableFilters.module.css";
import React from "react";
import AccessionTableFilters from "./filters/AccessionTableFilters";
import {Form} from 'antd';
import DefaultTableFilters from "./filters/DefaultTableFilters";
import ArchivalUnitTableFilters from "./filters/ArchivalUnitTableFilters";
import IsaarTableFilters from "./filters/IsaarTableFilters";
import IsadTableFilter from "./filters/IsadTableFilter";
import MLRTableFilter from "./filters/MLRTableFilter";
import DigitizationTableFilter from "./filters/DigitizationTableFilter";
import ResearcherTableFilter from "./filters/ResearchTableFilter";
import ResearchersVisitsTableFilter from "./filters/ResearchersVisitsTableFilter";
import RequestsTableFilter from "./filters/RequestsTableFilter";

const TableFilters = ({onFilterChange, module, filters, ...props}) => {
  const renderFilters = () => {
    switch (module) {
      case 'accessions':
        return <AccessionTableFilters />;
      case 'archival-units':
        return <ArchivalUnitTableFilters />;
      case 'isad':
        return <IsadTableFilter />;
      case 'isaar':
        return <IsaarTableFilters />;
      case 'mlr':
        return <MLRTableFilter />;
      case 'digitization':
        return <DigitizationTableFilter />;
      case 'researcher':
        return <ResearcherTableFilter />
      case 'researcher-visits':
        return <ResearchersVisitsTableFilter />
      case 'requests':
        return <RequestsTableFilter />
      default:
        return <DefaultTableFilters />;
    }
  };

  return (
    <div className={style.Filter}>
      <Form
        name={`${module}-tableFilter`}
        initialValues={filters}
        onValuesChange={onFilterChange}
      >
        {renderFilters()}
      </Form>
    </div>
  )
};

export default TableFilters;
