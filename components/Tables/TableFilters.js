import style from "./TableFilters.module.css";
import React from "react";
import AccessionTableFilters from "./filters/AccessionTableFilters";
import {Form} from 'antd';
import DefaultTableFilters from "./filters/DefaultTableFilters";
import ArchivalUnitTableFilters from "./filters/ArchivalUnitTableFilters";

const TableFilters = ({onFilterChange, module, ...props}) => {
  const renderFilters = () => {
    switch (module) {
      case 'accessions':
        return <AccessionTableFilters />;
      case 'archival-units':
        return <ArchivalUnitTableFilters/>;
      default:
        return <DefaultTableFilters />;
    }
  };

  return (
    <div className={style.Filter}>
      <Form
        name={`${module}-tableFilter`}
        onValuesChange={onFilterChange}
      >
        {renderFilters()}
      </Form>
    </div>
  )
};

export default TableFilters;
