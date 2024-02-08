import style from "./FormTranslateButton.module.scss"
import {Form, Modal, notification} from "antd";
import {post} from "../../../utils/api";
import {useState} from "react";

const FormTranslateButton = ({form, mode, fieldName, toField}) => {
  const value = Form.useWatch(fieldName, form);
  const toFieldValue = Form.useWatch(toField, form);
  const locale = Form.useWatch('original_locale', form);

  const [loading, setLoading] = useState(false);

  const { confirm } = Modal;

  const translateText = () => {
    let api;
    let params = {};

    if (mode === 'toOriginal') {
      api = '/v1/workflow/translate_to_original/'
      params = {
        english_text: value,
        original_locale: locale
      }
    } else {
      api = '/v1/workflow/translate_to_english/'
      params = {
        original_text: value,
        original_locale: locale
      }
    }

    confirm({
      title: 'Are you sure you would like to translate this field?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setLoading(true)
        post(api, params).then(response => {
          form.setFieldValue(toField, response.data['text'])
          setLoading(false)
        }).catch(error => {
          notification.error({
            duration: 3,
            message: 'Error!',
            description: `There is something wrong with the translation engine!`,
          });
          setLoading(false)
        })
      }
    });

  }

  const getLabel = () => {
    return mode === 'toOriginal' ? 'Translate to Original Language' : 'Translate to English'
  }

  const detectValue = (v) => {
    if (!v) {
      return false
    }

    if (v === null || v === '' || v === '<p><br></p>' || v === '<p></p>' ) {
      return false
    }

    return true
  }

  if (detectValue(value) && locale && !detectValue(toFieldValue)) {
    if (loading) {
      return (
        <div className={style.TranslateLink}>
          Loading...
        </div>
      )
    } else {
      return (
        <div className={style.TranslateLink}>
          <a onClick={() => translateText()}>{getLabel()}</a>
        </div>
      )
    }
  } else {
    return <div className={style.TranslateLink} />
  }
}

export default FormTranslateButton;