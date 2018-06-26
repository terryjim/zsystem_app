import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray, formValueSelector, getFormValues, formValues } from 'redux-form';
import { Container, ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import { getBuildingsByProject,getPublicAreaByBuilding,getUnitByBuilding} from '../actions/building'
import { getPublicAreaByProject } from '../actions/project'
import { InputField, InlineField } from '../components/field'


const simpleField = ({ readOnly, input, label, type, meta: { touched, error } }) => (
  <Input type={type} invalid={touched && error ? true : false} valid={touched && !error ? true : false} id="name" placeholder={label} {...input} readOnly={readOnly} />
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

let EditAccessControlForm = props => {
  const { readOnly = false, dispatch, error, handleSubmit, pristine, reset, submitting, closeForm, initialValues, projectList, buildingList, publicAreaList, buildingValue, projectValue, publicControlValue } = props;
  console.log(initialValues)
  if (projectValue != undefined) {
    dispatch(getBuildingsByProject(projectValue))
    if (publicControlValue == 1)
      dispatch(getPublicAreaByProject(projectValue))
  }
  if (buildingValue != undefined) {
    if (publicControlValue == 2)
      dispatch(getPublicAreaByBuilding(buildingValue))
    if (publicControlValue == 4)
      dispatch(getUnitByBuilding(buildingValue))
  }
  let handleSelect = (area) => {
    //dispatch(change('project', 'address', JSON.stringify({p:area.province,c:area.city,d:area.area})))
    dispatch(change('project', 'address', { p: area.province, c: area.city, d: area.area }))
  }

  return (
    <form onSubmit={handleSubmit} >
      <Field name="id" component="input" type="hidden" label="id" />

      <Field readOnly={readOnly}
        name="title"
        component={InlineField}
        type="text"
        label="位置信息"
        sm="3"
      />

      <FormGroup row>
        <Col md="3">
          <Label>&nbsp;&nbsp;&nbsp;&nbsp;授权类型</Label>
        </Col>
        <Col md="9">
          <FormGroup check inline>
            <Field className="form-check-input"
              name="publicControl"
              component="input"
              type="radio"
              value="1"
            />{' '}
            楼盘{'  '}
          </FormGroup>
          <FormGroup check inline>
            <Field className="form-check-input"
              name="publicControl"
              component="input"
              type="radio"
              value="2"
            />{' '}
            楼栋{'  '}
          </FormGroup>
          <FormGroup check inline>
            <Field className="form-check-input"
              name="publicControl"
              component="input"
              type="radio"
              value="4"
            />{' '}
            单元
            </FormGroup>
        </Col>
      </FormGroup>

      <Field readOnly={readOnly}
        name="publicControl"
        component={InlineField}
        type="text"
        label=""
        sm="3"
      />
      <Container><FormGroup row>
        <Label sm={3} for="projectId">楼盘名称</Label>
        <Col sm={9}>
          <Field name="projectId" component="select"  >
            <option value="">请选择楼盘</option>
            {projectList != undefined ?
              projectList.map(pro => (
                <option value={pro.id} key={pro.id}>
                  {pro.name}
                </option>
              )) : ''}
          </Field>
        </Col>
      </FormGroup></Container>
      <Field readOnly={readOnly}
        name="projectId"
        component={InputField}
        type="hidden"
        label="楼盘名称"
      />
      <Container hidden={publicControlValue == undefined || publicControlValue == 1}><FormGroup row>
        <Label sm={3} for="buildingId">楼栋名称</Label>
        <Col sm={9}>
          <Field name="buildingId" component="select"  >
            <option value="">请选择楼栋</option>
            {buildingList != undefined ?
              buildingList.map(pro => (
                <option value={pro.id} key={pro.id}>
                  {pro.name}
                </option>
              )) : ''}
          </Field>
        </Col>
      </FormGroup></Container>
      <Field readOnly={readOnly}
        name="buildingId"
        component={InputField}
        type="hidden"
        label="楼栋名称"
      />
      {/*   <Container  hidden={publicControlValue==undefined||publicControlValue!=4}><FormGroup row>
        <Label sm={3} for="unit">单元名称</Label>
        <Col sm={9}>
          <Field name="unit" component="select"  >
            <option value="">请选择单元</option>
            {projectList != undefined ?
              projectList.map(pro => (
                <option value={pro.id} key={pro.id}>
                  {pro.name}
                </option>
              )) : ''}
          </Field>
        </Col>
      </FormGroup></Container>
      <Field readOnly={readOnly}
        name="unit"
        component={InputField}
        type="hidden"
        label="单元名称"
      /> */}
      <Container><FormGroup row>
        <Label sm={3} for="location">{publicControlValue != undefined && publicControlValue == 4 ? '单元' : '区域'}信息</Label>
        <Col sm={9}>
          <Field name="location" component="select"  >
            <option value="">请选择{publicControlValue != undefined && publicControlValue == 4 ? '单元' : '区域'}</option>
            {publicAreaList != undefined ?
              publicAreaList.map(pro => (
                <option value={pro.id} key={pro.id}>
                  {pro.name}
                </option>
              )) : ''}
          </Field>
        </Col>
      </FormGroup></Container>
      <Field readOnly={readOnly}
        name="location"
        component={InputField}
        type="hidden"
        label="区域名称"
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
EditAccessControlForm = reduxForm({
  form: 'accessControl', // a unique name for this form
  validate,                // redux-form同步验证 
})(EditAccessControlForm);

const selector = formValueSelector('accessControl')
const mapStateToProps = (state) => {
  let projectList = state.projectList
  let buildingList = state.buildingList
  let publicAreaList = state.publicAreaList
  let cFormData = state.cForm.data
  const projectValue = selector(state, 'projectId')
  const buildingValue = selector(state, 'buildingId')
  const publicControlValue = selector(state, 'publicControl')
  let initialValues = {}
  if (cFormData != undefined && cFormData != null && cFormData._original != undefined)
    initialValues = { ...cFormData._original, publicControl: "" + cFormData._original.publicControl, projectId: cFormData._original.projectId } // 单选框选中状态必须为字符串，所以要将数字加引号
  return { initialValues, projectList, buildingList, publicAreaList, projectValue, buildingValue, publicControlValue }
}
EditAccessControlForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(EditAccessControlForm)
export default EditAccessControlForm;