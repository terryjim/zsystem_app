import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Container, ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import { InputField, InlineField, FieldValidate, InlineSelectField, CheckboxGroup } from '../components/Field'

/* 
const simpleField = ({readOnly,input, label, type, meta: { touched, error } }) => (            
  <Input type={type} invalid={touched && error?true:false} valid={touched && !error?true:false} id="name" placeholder={label} {...input} readOnly={readOnly}/> 
)
 */
const validate = values => {
  const errors = {}

  return errors
}

let EditAccessHardwareForm = props => {
  const { readOnly = false, dispatch, error, handleSubmit, pristine, reset, submitting, closeForm, initialValues } = props;
  let categoryList = [{ value: 1, name: '蓝牙' }, { value: 2, name: '二维码' }, { value: 4, name: '人脸' }]

  return (
    <Form onSubmit={handleSubmit} ><Container style={{ 'textAlign': 'right' }}>
      <Field name="id" component="input" type="hidden" label="id" />
      <FormGroup row>
        <Col md="6">
          <Field readOnly={readOnly} validate={[FieldValidate.required]}
            name="name"
            component={InlineField}
            type="text"
            label="名称"
            mdLabel={4}
            mdContent={8}
          /> </Col>
        <Col md="6">
          <Field name="manufacturer"
            component={InlineSelectField}
            validate={[FieldValidate.required]}
            label="制造商"
            options={[<option value="" key={-1}>请选择制造商</option>].concat(
              window.TParams.manufacturers.map(manu => (
                <option value={manu.id} key={manu.id}>
                  {manu.name}
                </option>
              )))}
            mdLabel={4}
          >
          </Field>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Col md="2">
          <Label>&nbsp;&nbsp;&nbsp;&nbsp;硬件类型</Label>
        </Col>  <Col md="10" style={{ 'textAlign': 'left' }}>
          <Field name="category" label="硬件类型" component={CheckboxGroup} options={categoryList} />
        </Col>
      </FormGroup>
      {/* <FormGroup row>
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
      </FormGroup> */}

    {/*   <Field readOnly={readOnly}
        name="category"
        component={InlineField}
        type="text"
        label=""
        sm="3"
      /> */}
      {/* <FieldArray name="publicArea" component={renderAreas} readOnly={readOnly}/> */}
      <FormGroup row>
        <Col md="6">
          <Field readOnly={readOnly}
            name="hardwareCode"
            component={InlineField}
            type="text"
            label="硬件编号"
            validate={[FieldValidate.required]}
            mdLabel={4}
            mdContent={8}
          /> </Col>
        <Col md="6">
          <Field readOnly={readOnly}
            name="hardwareVer"
            component={InlineField}
            type="text"
            label="硬件版本"
            mdLabel={4}
            mdContent={8}
          /> </Col>
      </FormGroup>
      <FormGroup row>
        <Col md="6">
          <Field readOnly={readOnly}
            name="hardwareMac"
            component={InlineField}
            type="text"
            label="硬件MAC"
            mdLabel={4}
            mdContent={8}
          /> </Col>
        <Col md="6">
          <Field readOnly={readOnly}
            name="hardwareKey"
            component={InlineField}
            type="text"
            mdLabel={4}
            mdContent={8}
            label="硬件密码"
          /> </Col>
      </FormGroup>
      <FormGroup row>
        <Col md="6">
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
            mdLabel={4}
            mdContent={8}
            label="摇一摇距离"
          /> </Col>
        <Col md="6">
          <Field readOnly={readOnly}
            name="nearRssi"
            component={InlineField}
            type="text"
            mdLabel={4}
            mdContent={8}
            label="靠近距离"
          />
        </Col>
      </FormGroup>
      {error && <strong>{error}</strong>}
      <Field
        name="address"
        sm="4"
        component={InlineField}
        type="hidden"
        label=""
      />

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
    </Container>
    </Form>
  );
}





// Decorate the form component
EditAccessHardwareForm = reduxForm({
  form: 'accessHardware', // a unique name for this form
  validate,                // redux-form同步验证
})(EditAccessHardwareForm);
EditAccessHardwareForm = connect(
  state => {
    if (state.cForm.data != undefined && state.cForm.data != null && state.cForm.data._original != undefined) {
      let tmpCategory = state.cForm.data._original.category
      let category = []
      if (tmpCategory != undefined) {
        category = category.concat(tmpCategory & 4)
        category = category.concat(tmpCategory & 2)
        category = category.concat(tmpCategory & 1)
      }
      return ({
        initialValues: { ...state.cForm.data._original, category },
      })
    }
  },
  // {load: loadAccount } // bind account loading action creator
)(EditAccessHardwareForm)
export default EditAccessHardwareForm;