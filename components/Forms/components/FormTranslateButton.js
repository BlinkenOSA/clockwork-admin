import style from "./FormTranslateButton.module.scss"
import {Form} from "antd";

const FormTranslateButton = ({form, mode, fieldName, toField}) => {
  const value = Form.useWatch(fieldName, form);
  const locale = Form.useWatch('original_locale', form);

  const translateText = () => {
    if (mode === 'toOriginal') {
      form.setFieldValue(toField, 'original')
    }
  }

  const getLabel = () => {
    return mode === 'toOriginal' ? 'Translate to Original Language' : 'Translate to English'
  }

  if (value) {
    return (
      <div className={style.TranslateLink}>
        <a onClick={() => translateText()}>{getLabel()}</a>
      </div>
    )
  } else {
    return ''
  }


}

export default FormTranslateButton;