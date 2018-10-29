import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Container, ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'

import { InputField, InlineField, required, FieldValidate } from '../components/Field'
import Cities from '../components/Cities'
const UploadFile = ({ input: {value: omitValue, ...inputProps }, meta: omitMeta, ...props }) => (
  <input type='file' {...inputProps} {...props} />
);

const validate = values => {
  /* const errors = {}
  if (!values.name) {
    errors.name = '名称不能为空'
  }
  if (!values.category) {
    errors.category = '类型不能为空'
  }  
  if (!values.manufacturer) {
    errors.manufacturer = '制造商不能为空'
  }  
  return errors */
}

let UpdateAccessHardwareForm = props => {
  const { dispatch, error, handleSubmit, pristine, reset, submitting, closeForm, updateCodes } = props;

  return (
    <div className="animated fadeIn">
      <form onSubmit={handleSubmit} >
        <Field
          name="version"
          component={InlineField}
          type="text"
          label="固件版本号"
          mdLabel="4"
          validate={[FieldValidate.required]}
        />

<Field 
          name="updateFile"
          component={UploadFile}
          accept=".txt"         
        />
         <Field 
          name="updateFile"
          component={InputField}
          type="hidden"
          label=""      
        />


        <Row className="align-items-center">
          <Col col='9' />
          <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
            <Button block color="primary"  type="submit" disabled={pristine || submitting}>更新</Button>
          </Col>
          {/*  <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="success" hidden={readOnly} disabled={pristine || submitting} onClick={reset}>重置</Button>
              </Col>     */}
          <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
            <Button block color="danger" onClick={closeForm}>取消</Button>
          </Col>
        </Row>
        {/*  <div>
        <button hidden={readOnly} type="submit" disabled={pristine || submitting}>
          提交
        </button>
        <button hidden={readOnly} type="button" disabled={pristine || submitting} onClick={reset}>
          重置还原
        </button>
        <button type="button" onClick={() => dispatch(showError('err!!!!!!!'))}>
          关闭
        </button>
      </div> */}
      </form>
    </div>
  );
}





// Decorate the form component
UpdateAccessHardwareForm = reduxForm({
  form: 'accessHardware', // a unique name for this form
  //validate,                // redux-form同步验证 
})(UpdateAccessHardwareForm);
/* const mapStateToProps = (state, ownProps) => {
}
UpdateAccessHardwareForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(UpdateAccessHardwareForm) */
export default UpdateAccessHardwareForm;