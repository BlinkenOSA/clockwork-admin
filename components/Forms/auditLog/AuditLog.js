import React from "react";
import {useData} from "../../../utils/hooks/useData";
import moment from "moment";

const AuditLog = ({module, object_id}) => {
    const getParams = () => {
        let model = ''

        if (module.includes('finding-aids/container')) {
            model ='FindingAidsEntity'
        } else {
            switch(module) {
                case 'accessions':
                    model = 'Accession'
                    break;
                case 'donor':
                    model = 'Donor'
                    break;
                case 'isad':
                    model = 'Isad'
                    break;
                case 'isaar':
                    model = 'Isaar'
                    break;
                case 'container':
                    model = 'Container'
                    break;
            }
        }

        return {
            model_name: model,
            object_id: object_id
        }
    }
    const { data, error } = useData(`/v1/audit_log/`, getParams());

    const renderLogs = () => {
        if (data.length > 0) {
            return (
                <ul>
                    {
                        data.map(d => {
                            return <li>
                                {moment(d.timestamp).format('YYYY-MM-DD HH:mm:ss')} | [{d.action}] by <strong>{d.user}</strong>{d.changed_fields && <> | <strong>Fields:</strong> {d.changed_fields.join(', ')}</>}
                            </li>
                        })
                    }
                </ul>
            )
        }
    }

    if (data && data.length > 0) {
        return (
            <>
                <br/>
                <strong>{`Audit Log (from 2024. November 18th):`}</strong>
                {renderLogs()}
            </>
        )
    } else {
        return ''
    }

}

export default AuditLog;