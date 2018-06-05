import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Container, ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import { InputField } from '../components/field'
import BuildingsAllotTable from '../components/BuildingsAllotTable.js'

const simpleField = ({ readOnly, input, label, type, meta: { touched, error } }) => (
  <Input type={type} invalid={touched && error ? true : false} valid={touched && !error ? true : false} id="name" placeholder={label} {...input} readOnly={readOnly} />
)
const checkField = ({ readOnly, input, label, value, meta: { touched, error } }) => (
   <FormGroup row>
         {/* <Label for="checkbox2" sm={2}>Checkbox</Label>*/}
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox"  />{' '}
               {label}
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
 )
/* const buildingsField = ({ readOnly, fields, buildingList,meta: { error, submitFailed } }) =>{console.log(fields);return (

  <Container>
   
    {
      buildingList==undefined?'':buildingList.map((member, index) => {
        console.log(member)
        return(
      <ListGroup>
        <Col md="1" />
        <Col md="11">
          <InputGroup>
           <label htmlFor={member.id}>{member.name}</label>
            <Field
              name={member.id}
              id={member.id}
              type="checkbox"
         
              component='input'
              readOnly={readOnly}
   checked={member.id==='452070951882850304'}
            />  
             </InputGroup> 
             
        </Col>
      </ListGroup>
    )})}

  </Container>
)} */

const validate = values => {
  console.log(values)
  const errors = {}
 /*  if (!values.name) {
    errors.name = '项目部名称不能为空'
  } */

  return errors
}

let EditDepartmentAndBuildingsForm = props => {
  const {readOnly = false, dispatch, error, handleSubmit, pristine, reset, submitting, closeForm, initialValues,pid } = props;
console.log(initialValues)
  //const buildingList=initialValues.buildingList
 let getBuildings = (values) => {
    console.log('---------------------------------------')
    console.log(values)
    if(values!=undefined&&values!=null){
    dispatch(change('EditDepartmentAndBuildingsForm', 'buildings', values.buildings))
    }else{
      dispatch(change('EditDepartmentAndBuildingsForm', 'buildings', []))
    }
  }
  return (
    <form onSubmit={handleSubmit} >
      <Field name="id" component="input" type="hidden" label="id" />
      
      <Field readOnly={true}
        name="property"
        component={InputField}
        type="text"
        label="物业名称"    
      />
       <Field readOnly={true}
        name="name"
        component={InputField}
        type="text"
        label="项目部"
      />
  <Field readOnly={true}
        name="projectName"
        component={InputField}
        type="text"
        label="所属楼盘"
      />
<BuildingsAllotTable name="allotBuildings" pid={pid}  handleTableValues={getBuildings} allotBuildings={initialValues.buildings}/>
<Field 
        name="buildings"
        component={InputField}
        type="hidden"
        label="分配楼栋"
      />

 {/*<FieldArray name="building" component={buildingsField} readOnly={readOnly} buildingList={buildingList}  label="所辖楼栋1"  />*/}
{/* <Container><FormGroup row>
        <Label sm={2} for="projectId">所辖楼栋2</Label>
        <Col sm={10}>
 {buildingList != undefined ?
              buildingList.map(member => (
                <FormGroup row> <label htmlFor={member.id}>{member.name}</label>
                <Field name={member.id} type="checkbox" component="input"  />        
           </FormGroup>
              )) : ''}*/}




      {/*    <Field name="projectId" component="select">
            <option value="">请选择楼盘</option>
            {projectList != undefined ?
              projectList.map(pro => (
                <option value={''+pro.id} key={pro.id}>
                  {pro.name}
                </option>
              )) : ''}
          </Field>*/}
   
   
{/*      <Field 
        name="buildings"
        component={InputField}
        type="text"
          
      />*/}


      {error && <strong>{error}</strong>}


      <Row className="align-items-center">
        <Col col='9' />
        <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <Button block color="primary" hidden={readOnly} type="submit" disabled={submitting}>提交</Button>
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
  form: 'EditDepartmentAndBuildingsForm', // a unique name for this form
  validate,                // redux-form同步验证 
})(EditDepartmentAndBuildingsForm);
const mapStateToProps = (state) => {
  
  console.log(state.cForm.data)
  let buildings=[]
  if (state.cForm.data != undefined && state.cForm.data != null&&state.cForm.data._original != undefined && state.cForm.data._original != null) {
    buildings=state.cForm.data._original.buildings
  }
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
  return { initialValues: { ...state.cForm.data,buildings},pid:state.cForm.data.pid}
}

EditDepartmentAndBuildingsForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(EditDepartmentAndBuildingsForm)

export default EditDepartmentAndBuildingsForm;

