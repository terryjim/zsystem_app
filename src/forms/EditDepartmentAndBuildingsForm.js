import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Container, ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import { InputField } from '../components/field'


const simpleField = ({ readOnly, input, label, type, meta: { touched, error } }) => (
  <Input type={type} invalid={touched && error ? true : false} valid={touched && !error ? true : false} id="name" placeholder={label} {...input} readOnly={readOnly} />
)
const buildingsField = ({ readOnly, fields, meta: { error, submitFailed } }) =>{console.log(fields);return (

  <Container>
   
    {
      fields==undefined?'':fields.map((member, index) => (
      <ListGroup>
        <Col md="1" />
        <Col md="11">
          <InputGroup>
            <Field
              name={`${member}.id`}
              type="checkbox"
              component={InputField}
              readOnly={readOnly}
              label={member.name}
            />  
             </InputGroup> 
             
        </Col>
      </ListGroup>
    ))}

  </Container>
)}

const validate = values => {
  console.log(values)
  const errors = {}
 /*  if (!values.name) {
    errors.name = '项目部名称不能为空'
  } */

  return errors
}

let EditDepartmentAndBuildingsForm = props => {
  const { propertyList, projectList,readOnly = false, dispatch, error, handleSubmit, pristine, reset, submitting, closeForm, initialValues } = props;


  return (
    <form onSubmit={handleSubmit} >
      <Field name="id" component="input" type="hidden" label="id" />
      
      <Field readOnly={true}
        id="property"
        component={InputField}
        type="text"
        label="物业名称"    
      />
 <FieldArray name="buildings" component={buildingsField} readOnly={readOnly} />



      <Field readOnly={true}
        name="name"
        component={InputField}
        type="text"
        label="项目部"
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
EditDepartmentAndBuildingsForm = reduxForm({
  form: 'department', // a unique name for this form
  validate,                // redux-form同步验证 
})(EditDepartmentAndBuildingsForm);
const mapStateToProps = (state) => {
  
  console.log(state.cForm.data)
 
/* 
  if (state.cForm.data != undefined && state.cForm.data != null) {
    initEnabled = '' + state.cForm.data.enabled
    if (state.cForm.data._original != undefined && state.cForm.data._original != null) {
      if(state.cForm.data._original.property!=undefined)
      property = state.cForm.data._original.property.id
      if(state.cForm.data._original.project!=undefined)
      project = state.cForm.data._original.project.id
    }
    if (initEnabled == undefined || initEnabled == null)
      initEnabled = '0'
  } */
  return { initialValues: { ...state.cForm.data,buildings:  [
    {
      "name": "A1",
      "id": "196015270102325726"
    },
    {
      "name": "xxxxxxx",
      "id": "452070951882850304"
    }
  ]} }// 单选框选中状态必须为字符串，所以要将数字加引号
}

EditDepartmentAndBuildingsForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(EditDepartmentAndBuildingsForm)

export default EditDepartmentAndBuildingsForm;

