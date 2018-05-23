import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Container, ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import { InputField, SelectField, InlineField } from '../components/field'
import RoomEditableTable from '../components/RoomEditableTable.js'
const simpleField = ({ readOnly, input, label, type, meta: { touched, error } }) => (
  <Input type={type} invalid={touched && error ? true : false} valid={touched && !error ? true : false} id="name" placeholder={label} {...input} readOnly={readOnly} />
)
const renderAreas = ({ readOnly, fields, meta: { error, submitFailed } }) => (
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
    {fields.map((member, index) => (
      <ListGroup>
        <Col md="1" />
        <Col md="11">
          <InputGroup>
            <Field
              name={`${member}.id`}
              type="hidden"
              component={InputField}
              readOnly={readOnly}
              label={null}
            />
            <Field
              name={`${member}.name`}
              type="text"
              label={null}
              readOnly={readOnly}
              component={simpleField}
            />
            <InputGroupAddon addonType="append">
              <Button color="danger" hidden={readOnly}
                onClick={() => fields.remove(index)}
              >删除</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </ListGroup>
    ))}
  </div>
)

const createRooms=(units,floors,floorRooms)=>{

}
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

let EditBuildingForm = props => {
  const { readOnly = false, values, dispatch, error, handleSubmit, pristine, reset, submitting, closeForm, initialValues } = props;

  console.log(initialValues)
  let handleSelect = (area) => {
    //dispatch(change('building', 'address', JSON.stringify({p:area.province,c:area.city,d:area.area})))
    dispatch(change('building', 'address', { p: area.province, c: area.city, d: area.area }))
  }

  return (
    <form onSubmit={handleSubmit} >

      <Field name="id" component="input" type="hidden" label="id" />
      {/*   <Label>所在地区</Label>
       <Cities handleSelect={handleSelect} initValue={initialValues.address}/> */}
      <Field readOnly={readOnly}
        name="name"
        component={InlineField}
        type="text"
        label="楼盘名称"
      />

      <Col xs="12"><FormGroup>
        <Label for="exampleSelect">Select</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup></Col>
      <Field name="project_name" component="SelectField" type="select"
        label="楼盘名称" options={[1, 2, 3, 4]} />
      {/*  <FormGroup>
          <Label for="exampleSelect">楼盘名称</Label>
          <Input type="select" name="project_name" id="project_name">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup> */}
      <Field readOnly={readOnly}
        name="name2"
        component={InlineField}
        type="text"
        label="楼栋名称"
      />
      <FormGroup row>
        <Col md="3">
          <Label>&nbsp;&nbsp;&nbsp;&nbsp;楼栋类型</Label>
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
        label="楼栋类型"
      />
      <Container>
        <Row><Col>
        <label >单元数量&nbsp;&nbsp;</label>
          <Field readOnly={readOnly}
            name="units"
            component='input'
            type="text" 
            style= {{ 'width':100 }}         
          />
          </Col><Col>
          <label >楼层数量&nbsp;&nbsp;</label>
          <Field readOnly={readOnly}
            name="floors"
            component='input'
                        type="text"
                        style= {{ 'width': 100 }}
          /></Col><Col>
          <label >楼层房间数&nbsp;&nbsp;</label>
          <Field readOnly={readOnly}
            name="rooms"
            component='input'
            type="text"           
            style= {{ 'width': 100 }}
          />  </Col><Col>
          <Button block color="primary" hidden={readOnly} >批量创建</Button>
          </Col>
        </Row></Container>



      <Container>
        <Row>
          {[1, 2, 3, 4].map(x => (
            <Col ><Label>aaa</Label><RoomEditableTable data={[{ floor: 1, room: '01,02,03,04,05' }, { floor: 2, room: '02,03,04,05' }, { floor: 3, room: '03' }]} />
            </Col>))}
        </Row></Container>

      <FieldArray name="public_area" component={renderAreas} readOnly={readOnly} />
      <Field readOnly={readOnly}
        name="remark"
        component={InlineField}
        type="textarea"
        height='130px'
        label="备注"
      />
      <Col>
        <Field readOnly={readOnly}
          name="remark2"
          component={InlineField}
          type={Input}
          height='130px'
          label="备注"
        />
        <Field readOnly={readOnly}
          name="remark3"
          component={InlineField}
          type={Input}
          height='130px'
          label="备注"
        />
      </Col>
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
EditBuildingForm = reduxForm({
  form: 'building', // a unique name for this form
  validate,                // redux-form同步验证 
})(EditBuildingForm);

const mapStateToProps = (state) => {
  let cFormData = state.cForm.data
  let assignRooms=state.assignRooms
  let initialValues={}
  if (cFormData != undefined && cFormData != null && cFormData._original != undefined) 
    initialValues={ ...cFormData._original, category: "" + cFormData._original.category } // 单选框选中状态必须为字符串，所以要将数字加引号
else   
    initialValues={ address: { p: '湖北省', c: '武汉市', d: '青山区' } } // pull initial values from account reducer   
  return {initialValues,assignRooms}

}

EditBuildingForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(EditBuildingForm)
export default EditBuildingForm;
