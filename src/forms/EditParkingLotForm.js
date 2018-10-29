import React, { Component } from 'react';
import { Field, reduxForm, change,FieldArray } from 'redux-form';
import {Container,ListGroup,CardFooter, Label,Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import {InputField,InlineField} from '../components/Field'
import Cities from '../components/Cities'

const simpleField = ({readOnly,input, label, type, meta: { touched, error } }) => (            
  <Input type={type} invalid={touched && error?true:false} valid={touched && !error?true:false} id="name" placeholder={label} {...input} readOnly={readOnly}/> 
)

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = '停车场名称不能为空'
  }
  if (!values.company) {
    errors.company = '项目部不能为空'
  }  
  if (!values.code) {
    errors.code = '停车场编号不能为空'
  }  
  return errors
}

let EditParkingLotForm = props => {
  const {readOnly=false, dispatch, error, handleSubmit, pristine, reset, submitting,closeForm,initialValues,departmentList} = props;
 
  console.log(initialValues)
  let handleSelect=(area)=>{     
    //dispatch(change('project', 'address', JSON.stringify({p:area.province,c:area.city,d:area.area})))
    dispatch(change('project', 'address', {p:area.province,c:area.city,d:area.area}))
  }

  return (
    <form onSubmit={handleSubmit} >
      <Field name="id" component="input" type="hidden" label="id" />
     
      <Field readOnly={readOnly}
        name="name"
        component={InlineField}
        type="text"
        label="停车场名称"
        sm="3"
      />
    {/*  <Container><FormGroup row>
     <Label sm={3} for="project">楼盘名称</Label>
     <Col sm={9}>
       <Field name="project" component="select"  >
         <option value="">请选择楼盘</option>
         {projectList != undefined ?
           projectList.map(pro => (
             <option value={pro.id} key={pro.id}>
               {pro.name}
             </option>
           )) : ''}
       </Field>
     </Col>
   </FormGroup></Container> */}
 
     <Container><FormGroup row>
     <Label sm={3} for="company">项目部名称</Label>
     <Col sm={9}>
       <Field name="company" component="select"  >
         <option value="">请选择项目部</option>
         {departmentList != undefined ?
           departmentList.map(pro => (
             <option value={pro.id} key={pro.id}>
               {pro.name}
             </option>
           )) : ''}
       </Field>
     </Col>
   </FormGroup></Container>
   <Field readOnly={readOnly}
     name="company"
     component={InputField}
     type="hidden"
     label="项目部名称"  
   />  
     <Field readOnly={true}
     name="projectName"
     component={InputField}
     type="text"
     label="楼盘名称"  
   />  
        
       <Field readOnly={readOnly}
        name="code"
        component={InlineField}
        type="text"
        label="停车场编号"
        sm="3"
      />
      
   
    <Row className="align-items-center">
      <Col col='9'/>
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
  );
}





// Decorate the form component
EditParkingLotForm = reduxForm({
  form: 'parkingLot', // a unique name for this form
  validate,                // redux-form同步验证 
})(EditParkingLotForm);
const mapStateToProps = (state) => {
  let departmentList = state.departmentList
 
  let cFormData = state.cForm.data
  
  let initialValues = {}
  if (cFormData != undefined && cFormData != null && cFormData._original != undefined)
    initialValues = { ...cFormData._original}   
  return { initialValues, departmentList }

}

EditParkingLotForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(EditParkingLotForm)

export default EditParkingLotForm;