import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Container, ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import { InputField } from '../components/field'


const simpleField = ({ readOnly, input, label, type, meta: { touched, error } }) => (
  <Input type={type} invalid={touched && error ? true : false} valid={touched && !error ? true : false} id="name" placeholder={label} {...input} readOnly={readOnly} />
)

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = '项目部名称不能为空'
  }
  return errors
}

let EditDepartmentForm = props => {
  const { propertyList, readOnly = false, dispatch, error, handleSubmit, pristine, reset, submitting, closeForm, initialValues } = props;


  return (
    <form onSubmit={handleSubmit} >
      <Field name="id" component="input" type="hidden" label="id" />
      <Container><FormGroup row>
        <Label sm={3} for="property">物业公司</Label>
        <Col sm={9}>
          <Field name="property" component="select"  >
            <option value="">请选择物业公司</option>
            {propertyList != undefined ?
              propertyList.map(pro => (
                <option value={pro.id} key={pro.id}>
                  {pro.companyName}
                </option>
              )) : ''}
          </Field>
        </Col>
      </FormGroup></Container>
      {/*  <Field readOnly={readOnly}
        name="property"
        component={InputField}
        type="text"
        label="物业名称"
       // parse={(value, name)=>({property:{id:value}})}
        normalize={value=>({id:value})}
      />*/}
      <Field readOnly={readOnly}
        name="name"
        component={InputField}
        type="text"
        label="项目部"
      />
      <FormGroup row>
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
      </FormGroup>
      {/* 
      <Field readOnly={readOnly}
        name="enabled"
        component={InputField}
        type="text"
        label="楼栋类型"
      />*/}
      <Field readOnly={readOnly}
        name="admin"
        component={InputField}
        type="text"
        label="管理员账号"
      />
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
EditDepartmentForm = reduxForm({
  form: 'department', // a unique name for this form
  validate,                // redux-form同步验证 
})(EditDepartmentForm);
const mapStateToProps = (state) => {
  let propertyList = state.propertyList
  console.log(state.cForm.data)
  let initEnabled = '0'
  let property = 0
  if (state.cForm.data != undefined && state.cForm.data != null) {
    initEnabled = '' + state.cForm.data.enabled
    if (state.cForm.data._original != undefined && state.cForm.data._original != null) {
      property = state.cForm.data._original.property.id
    }
    if (initEnabled == undefined || initEnabled == null)
      initEnabled = '0'
  }
  return { initialValues: { ...state.cForm.data, enabled: initEnabled, property }, propertyList }// 单选框选中状态必须为字符串，所以要将数字加引号
}

EditDepartmentForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(EditDepartmentForm)

export default EditDepartmentForm;

