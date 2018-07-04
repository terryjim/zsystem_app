import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import { InputField } from '../components/field'
import Cities from '../components/Cities'

const simpleField = ({ readOnly, input, label, type, meta: { touched, error } }) => (
  <Input type={type} invalid={touched && error ? true : false} valid={touched && !error ? true : false} id="name" placeholder={label} {...input} readOnly={readOnly} />
)

const validate = values => {
  const errors = {}
  if (!values.companyName) {
    errors.name = '物业公司名称不能为空'
  }
  return errors
}

let EditPropertyForm = props => {
  const { readOnly = false, dispatch, error, handleSubmit, pristine, reset, submitting, closeForm, initialValues } = props;


  return (
    <form onSubmit={handleSubmit} >
      <Field name="id" component="input" type="hidden" label="id" />
      <Field readOnly={readOnly}
        name="companyName"
        component={InputField}
        type="text"
        label="物业名称"
      />
     {/*  <FormGroup row>
        <Col md="3">
          <Label>&nbsp;&nbsp;&nbsp;&nbsp;状态</Label>
        </Col>
        <Col md="9">
          <FormGroup check inline>
            <Field className="form-check-input"
              name="enabled"
              component="input"
              type="radio"
              value="0"
            />{' '}
            启用{'  '}
          </FormGroup>
          <FormGroup check inline>
            <Field className="form-check-input"
              name="enabled"
              component="input"
              type="radio"
              value="1"
            />{' '}
            禁用{'  '}
          </FormGroup>
        </Col>
      </FormGroup> */}
     {/* 
      <Field readOnly={readOnly}
        name="enabled"
        component={InputField}
        type="text"
        label="楼栋类型"
      />*/}
      <Field readOnly={readOnly}
        name="remark"
        component={InputField}
        type="textarea"
        rows='5'
        label="备注"
      />

      {error && <strong>{error}</strong>}


      <Row className="align-items-center">
        <Col col='9' />
        <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <Button block color="primary" hidden={readOnly} type="submit" disabled={pristine || submitting}>提交</Button>
        </Col>
        {/*  <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block color="success" hidden={readOnly} disabled={pristine || submitting} onClick={reset}>重置</Button>
              </Col>     */}
        <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <Button block color="danger" onClick={closeForm}>关闭</Button>
        </Col>
      </Row>

    </form>
  );
}





// Decorate the form component
EditPropertyForm = reduxForm({
  form: 'property', // a unique name for this form
  validate,                // redux-form同步验证 
})(EditPropertyForm);
const mapStateToProps = (state) => {
  console.log(state.cForm.data)
  let initEnabled = '0'
  if (state.cForm.data != undefined && state.cForm.data != null)
    initEnabled = '' + state.cForm.data.enabled
  if (initEnabled == undefined || initEnabled == null)
    initEnabled = '0'
  return { initialValues: { ...state.cForm.data, enabled: initEnabled } }// 单选框选中状态必须为字符串，所以要将数字加引号
}

EditPropertyForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(EditPropertyForm)

export default EditPropertyForm;

