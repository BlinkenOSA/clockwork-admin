import React, {useEffect, useState} from "react";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {Button, Drawer, Input, Select} from "antd";
import _ from "lodash";
import {PopupForm} from "../PopupForm";
import {useData} from "../../../utils/hooks/useData";
import {sanitizeForwardedProps} from "../../../utils/functions/sanitizeForwardedProps";

const {Option} = Select;

export const FormRemoteSelectWithEdit = ({
                                             api,
                                             fieldName,
                                             module,
                                             selectAPI,
                                             selectAPIParams = {},
                                             valueField,
                                             labelField,
                                             onChange,
                                             placeholder,
                                             disabled = false,
                                             form,
                                             mode = "default",
                                         ...props
                                         }) => {
    const forwardedProps = sanitizeForwardedProps(props);
    const [params, setParams] = useState(selectAPIParams);
    const [selectData, setSelectData] = useState([]);
    const [drawerShown, setDrawerShown] = useState(false);
    const [action, setAction] = useState("create");
    const [selectedRecord, setSelectedRecord] = useState(null);

    const {data, loading, refresh} = useData(selectAPI, params);

    // Load initial data
    useEffect(() => {
        if (data) setSelectData(data);
    }, [data]);

    const handleSearch = (value) => {
        setParams((prev) => ({
            ...prev,
            search: value.length > 2 ? value : ""
        }));
    };

    const handleSelect = (value) => {
        // Clear search after selecting
        if (params.search) {
            setParams((p) => ({...p, search: ""}));
        }
        onChange(value);
    };

    const handleClear = () => onChange(undefined);

    const openForm = (type) => {
        setAction(type);
        setSelectedRecord(type === "edit" ? props.value : null);
        setDrawerShown(true);
    };

    /**
     * onClose(record)
     * record = newly created or edited record object
     */
    const onClose = (record) => {
        setDrawerShown(false);

        if (record) {
            const newOption = {
                [valueField]: record[valueField],
                [labelField]: record[labelField],
            };

            // Add or update option optimistically
            setSelectData((prev) =>
                _.uniqBy([newOption, ...prev], valueField)
            );

            if (mode === "multiple") {
                // CURRENT values may come from props or the form
                const currentValues =
                    props.value ??
                    form.getFieldValue(fieldName) ??
                    [];

                const updatedValues = _.uniq([
                    ...currentValues,
                    record[valueField]
                ]);

                form.setFieldsValue({[fieldName]: updatedValues});
                onChange && onChange(updatedValues);
            } else {
                // SINGLE SELECT
                form.setFieldsValue({[fieldName]: record[valueField]});
                onChange && onChange(record[valueField]);
            }
        }

        // Sync with the server in the background
        refresh();
    };

    const getMessageText = () => {
        switch (module) {
            case 'places':
                return 'Place';
            case 'people':
                return 'Person';
            case 'corporations':
                return 'Corporation';
            case 'keywords':
                return 'Keyword';
            default:
                return 'The';
        }
    }

    return (
        <>
            <Input.Group style={{width: "100%", whiteSpace: "nowrap"}} compact>
                <Select
                    showSearch
                    allowClear
                    value={props.value ?? form.getFieldValue(fieldName)}
                    style={{
                        width: mode !== "multiple" ? "calc(100% - 92px)" : "calc(100% - 46px)",
                    }}
                    filterOption={false}
                    onSearch={handleSearch}
                    onChange={handleSelect}
                    onClear={handleClear}
                    placeholder={placeholder}
                    mode={mode}
                    disabled={disabled}
                    loading={loading}
                    {...forwardedProps}
                >
                    {selectData.map((d) => (
                        <Option key={d[valueField]} value={d[valueField]}>
                            {d[labelField]}
                        </Option>
                    ))}
                </Select>

                {/* EDIT BUTTON */}
                {mode !== "multiple" && (
                    <Button
                        disabled={!props.value || disabled}
                        onClick={() => openForm("edit")}
                    >
                        <EditOutlined/>
                    </Button>
                )}

                {/* CREATE BUTTON */}
                <Button
                    disabled={disabled}
                    onClick={() => openForm("create")}
                >
                    <PlusOutlined/>
                </Button>
            </Input.Group>

            <Drawer
                title={_.capitalize(action)}
                width="50%"
                onClose={() => onClose()}
                open={drawerShown}
                destroyOnClose
            >
                <PopupForm
                    api={api}
                    module={module}
                    selectedRecord={selectedRecord}
                    type={action}
                    label={getMessageText()}
                    onClose={onClose}
                    hasMerge={false}
                />
            </Drawer>
        </>
    );
};
