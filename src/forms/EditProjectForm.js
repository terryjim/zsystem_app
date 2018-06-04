import React, { Component } from 'react';
import { Field, reduxForm, change,FieldArray } from 'redux-form';
import {ListGroup,CardFooter, Label,Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import {InputField} from '../components/field'
import Cities from '../components/Cities'

const simpleField = ({readOnly,input, label, type, meta: { touched, error } }) => (            
  <Input type={type} invalid={touched && error?true:false} valid={touched && !error?true:false} id="name" placeholder={label} {...input} readOnly={readOnly}/> 
)
const renderAreas = ({ readOnly,fields, meta: { error, submitFailed } }) => (
  <div>
    <FormGroup row>
                    <Col md="9">
                      <Label>&nbsp;&nbsp;&nbsp;&nbsp;公共区域</Label>
                    </Col>
                    <Col md="3">    
      <Button block color="primary" hidden={readOnly} onClick={() => fields.push({})}>
        添加
      </Button>
      {submitFailed && error && <span>{error}</span>}
    </Col>
    </FormGroup>
    {
      fields==undefined?'':
    fields.map((member, index) => (
      <ListGroup>   
         <Col md="1"/>
      <Col md="11">
      
      <InputGroup>
        <Field
          name={`${member}.id`}
          type="hidden"
          component={InputField}
          readOnly={readOnly}
        
        />
        {/* <Label>名称</Label> */}
       {/*  </Col>
        <Col md="12"> */}
        <Field
          name={`${member}.name`}
          type="text"
          label={null}
          readOnly={readOnly}
          component={simpleField}    
       
        />
        <InputGroupAddon addonType="append">
        <Button color="danger"  hidden={readOnly}
          onClick={() => fields.remove(index)}
        >删除</Button>
        </InputGroupAddon>
                      </InputGroup>
      </Col>
      </ListGroup>
    ))}
  </div>
)
const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = '楼盘名称不能为空'
  }
  if (!values.category) {
    errors.category = '楼盘类型不能为空'
  }  
  return errors
}

let EditProjectForm = props => {
  const {readOnly=false, dispatch, error, handleSubmit, pristine, reset, submitting,closeForm,initialValues} = props;
 
  console.log(initialValues)
  let handleSelect=(area)=>{     
    //dispatch(change('project', 'address', JSON.stringify({p:area.province,c:area.city,d:area.area})))
    dispatch(change('project', 'address', {p:area.province,c:area.city,d:area.area}))
  }

  return (
    <form onSubmit={handleSubmit} >
      <Field name="id" component="input" type="hidden" label="id" />
      <Col xs="12"><Label>所在地区</Label></Col>
       <Cities handleSelect={handleSelect} initValue={initialValues.address}/>
      <Field readOnly={readOnly}
        name="name"
        component={InputField}
        type="text"
        label="楼盘名称"
      />
     
      <FormGroup row>
                    <Col md="3">
                      <Label>&nbsp;&nbsp;&nbsp;&nbsp;楼盘类型</Label>
                    </Col>
                    <Col md="9">
                    <FormGroup check inline>
            <Field className="form-check-input"
              name="category"
              component="input"
              type="radio"
              value="1"
            />{' '}
            社区{'  '}
            </FormGroup>
                      <FormGroup check inline>
            <Field className="form-check-input"
              name="category"
              component="input"
              type="radio"
              value="2"
            />{' '}
            商办{'  '}
            </FormGroup>
                      <FormGroup check inline>
            <Field className="form-check-input"
              name="category"
              component="input"
              type="radio"
              value="3"
            />{' '}
            社区与商办
            </FormGroup>                     
        </Col>
        </FormGroup>
        
      <Field readOnly={readOnly}
        name="category"
        component={InputField}
        type="hidden"
        label="楼盘类型"
      />
      <FieldArray name="publicArea" component={renderAreas} readOnly={readOnly}/>
      <Field readOnly={readOnly}
        name="remark"
        component={InputField}
        type="textarea"
        height='130px'
        label="备注"
      />     
      
      {error && <strong>{error}</strong>}
      <Field
      name="address"
      component={InputField}
      type="hidden"
      label=""
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
EditProjectForm = reduxForm({
  form: 'project', // a unique name for this form
  validate,                // redux-form同步验证 
})(EditProjectForm);
EditProjectForm = connect(
  state => {
    if(state.cForm.data!=undefined&&state.cForm.data!=null&&state.cForm.data._original!=undefined)
    return ({
    initialValues: {...state.cForm.data._original,category:""+state.cForm.data._original.category}, // 单选框选中状态必须为字符串，所以要将数字加引号
  })
  else{
    return ({
      initialValues: {address:{p:'湖北省',c:'武汉市',d:'青山区'}}, // pull initial values from account reducer   
    })
  }
},
  // { load: loadAccount } // bind account loading action creator
)(EditProjectForm)
export default EditProjectForm;