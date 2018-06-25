import React, { Component } from 'react';
import { Field, reduxForm, change,FieldArray } from 'redux-form';
import {Container,ListGroup,CardFooter, Label,Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import {InputField,InlineField} from '../components/field'
import Cities from '../components/Cities'

const simpleField = ({readOnly,input, label, type, meta: { touched, error } }) => (            
  <Input type={type} invalid={touched && error?true:false} valid={touched && !error?true:false} id="name" placeholder={label} {...input} readOnly={readOnly}/> 
)

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = '名称不能为空'
  }
  if (!values.category) {
    errors.category = '类型不能为空'
  }  
  if (!values.manufacturer) {
    errors.manufacturer = '制造商不能为空'
  }  
  return errors
}

let EditAccessHardwareForm = props => {
  const {readOnly=false, dispatch, error, handleSubmit, pristine, reset, submitting,closeForm,initialValues} = props;
 
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
        label="名称"
        sm="3"
      />
     
      <FormGroup row>
                    <Col md="3">
                      <Label>&nbsp;&nbsp;&nbsp;&nbsp;硬件类型</Label>
                    </Col>
                    <Col md="9">
                    <FormGroup check inline>
            <Field className="form-check-input"
              name="category"
              component="input"
              type="radio"
              value="1"
            />{' '}
            蓝牙{'  '}
            </FormGroup>
                      <FormGroup check inline>
            <Field className="form-check-input"
              name="category"
              component="input"
              type="radio"
              value="2"
            />{' '}
            二维码{'  '}
            </FormGroup>
                      <FormGroup check inline>
            <Field className="form-check-input"
              name="category"
              component="input"
              type="radio"
              value="3"
            />{' '}
            蓝牙与二维码
            </FormGroup>                     
        </Col>
        </FormGroup>
        
      <Field readOnly={readOnly}
        name="category"
        component={InlineField}
        type="hidden"
        label=""
        sm="3"
      />
      {/* <FieldArray name="publicArea" component={renderAreas} readOnly={readOnly}/> */}
        
       <Field readOnly={readOnly}
        name="hardwareCode"
        component={InlineField}
        type="text"
        label="硬件编号"
        sm="3"
      />
       <Field readOnly={readOnly}
        name="hardwareVer"
        component={InlineField}
        type="text"
        label="硬件版本"
        sm="3"
      />
       <Field readOnly={readOnly}
        name="hardwareMac"
        component={InlineField}
        type="text"
        label="硬件MAC"
        sm="3"
      />
       <Field readOnly={readOnly}
        name="hardwareKey"
        component={InlineField}
        type="text"
        sm="3"
        label="硬件密码"
      />
 <Container><FormGroup row>
        <Label sm={3} for="manufacturer">制造商</Label>
        <Col sm={9}>
          <Field name="manufacturer" component="select"  >
            <option value="">请选择制造商</option>
            {window.TParams.manufacturers.map(manu => (
                <option value={manu.id} key={manu.id}>
                  {manu.name}
                </option>
              )) }
          </Field>
        </Col>
      </FormGroup></Container>
      <Field readOnly={readOnly}
        name="manufacturer"
        component={InputField}
        type="hidden"
        label=""
      // parse={(value, name)=>({property:{id:value}})}
      // normalize={value=>({id:value})}
      />

       <Field readOnly={readOnly}
        name="shakeRssi"
        component={InlineField}
        type="text"
        sm="3"
        label="蓝牙摇一摇距离"
      />
       <Field readOnly={readOnly}
        name="nearRssi"
        component={InlineField}
        type="text"
        sm="3"
        label="靠近距离"
      />
      {error && <strong>{error}</strong>}
      <Field
      name="address"
      sm="4"
      component={InlineField}
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
EditAccessHardwareForm = reduxForm({
  form: 'accessHardware', // a unique name for this form
  validate,                // redux-form同步验证 
})(EditAccessHardwareForm);
EditAccessHardwareForm = connect(
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
)(EditAccessHardwareForm)
export default EditAccessHardwareForm;