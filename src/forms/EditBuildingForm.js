import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray, getFormValues, formValues, formValueSelector } from 'redux-form';
import { Container, ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import { initRooms } from '../actions/building'
import { InputField, SelectField, InlineField } from '../components/field'
import RoomEditableTable from '../components/RoomEditableTable.js'
const simpleField = ({ readOnly, input, label, type, meta: { touched, error } }) => (
  <Input type={type} invalid={touched && error ? true : false} valid={touched && !error ? true : false} id="name" placeholder={label} {...input} readOnly={readOnly} />
)
const number = value =>
  value && isNaN(Number(value)) ? '请输入数字' : undefined
const renderAreas = ({ readOnly, fields, meta: { error, submitFailed } }) => (
  <Container>
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
    {fields == undefined ? '' : fields.map((member, index) => (
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

  </Container>
)


const validate = values => {
  const errors = {}
  if (!values.projectId) {
    errors.projectId = '请选择楼盘'
  }
  if (!values.name) {
    errors.name = '楼栋名称不能为空'
  }
  if (!values.category) {
    errors.category = '楼栋类型不能为空'
  }
  if (isNaN(Number(values.units))) {
    errors.units = '单元必须为整数'
  }
  if (isNaN(Number(values.floors))) {
    errors.floors = '楼层必须为整数'
  }
  if (isNaN(Number(values.rooms))) {
    errors.rooms = '楼层房间数必须为整数'
  }
  return errors
}



let EditBuildingForm = props => {
  const { projectList, structureValue, readOnly = false, values, dispatch, error, handleSubmit, pristine, reset, submitting, closeForm, initialValues, assignRooms, unitsValue, floorsValue, roomsValue } = props;
  console.log('##############################')
  console.log(projectList)
  //房间分配初始值，编辑表单时不为空
  let structureArr = new Array(10).fill({})
  //子组件RoomEditableTable返回值
  let getRooms = (values) => {
    //  alert(structureValue)
    console.log(values)
    /* if (structureValue == undefined) {
       let tempStrucArr=new Array(unitsValue).fill({})
        dispatch(change('building', 'structure',tempStrucArr))     
     } *///else
    // dispatch(change('building', 'structure', structureArr.splice(values.unit - 1, 1, values.data)))
    /*  let arr = new Array(1).fill({})
     arr[0] = { unit: values.unit, floors: values.data }
     dispatch(change('building', 'structure', arr)) */

    if (structureValue == undefined) {
      let arr = new Array(unitsValue).fill({})
      arr[values.unit - 1] = { unit: values.unit, floors: values.floors }
      dispatch(change('building', 'structure', arr))
    } else {
      let arr = structureValue
      arr[values.unit - 1] = { unit: values.unit, floors: values.floors }
      dispatch(change('building', 'structure', arr))
    }
    /*  dispatch(change('building', 'structure',[
      {
          "unit":"1",
          "floors":[
              {"name":"1号楼","rooms":[1,2,3]},
              {"name":"2号楼","rooms":[1,2,3]}
          ]
      }
  ])) */

    console.log(structureValue)
  }
  // console.log(initialValues)
  let handleSelect = (area) => {
    //dispatch(change('building', 'address', JSON.stringify({p:area.province,c:area.city,d:area.area})))
    dispatch(change('building', 'address', { p: area.province, c: area.city, d: area.area }))
  }

  return (
    <form onSubmit={handleSubmit} >

      <Field name="id" component="input" type="hidden" label="id" />
      {/*   <Label>所在地区</Label>
       <Cities handleSelect={handleSelect} initValue={initialValues.address}/> */}
      <Field name="id" component="input" type="hidden" label="id" />
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
      // parse={(value, name)=>({property:{id:value}})}
      // normalize={value=>({id:value})}
      />



      {/*    <Field readOnly={readOnly}
        name="projectId"
        component={InlineField}
        type="text"
        label="楼盘名称"
      /> */}
      <Field readOnly={readOnly}
        name="name"
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
      <FieldArray name="publicArea" component={renderAreas} readOnly={readOnly} />
      <hr />
      <Container>
        <Row><Col>
          <label >单元数量&nbsp;&nbsp;</label>
          <Field readOnly={readOnly}
            name="units"
            component='input'
            type="text"
            style={{ 'width': 100 }}
            validate={[number]}
          />
        </Col><Col>
            <label >楼层数量&nbsp;&nbsp;</label>
            <Field readOnly={readOnly}
              name="floors"
              component='input'
              type="text"
              style={{ 'width': 100 }}
              validate={[number]}
            /></Col><Col>
            <label >楼层房间数&nbsp;&nbsp;</label>
            <Field readOnly={readOnly}
              name="rooms"
              component='input'
              type="text"
              style={{ 'width': 100 }}
              validate={[number]}
            />  </Col><Col>
            <Button block color="primary" hidden={readOnly} onClick={(values) => {
              console.log(values)
              /* alert(values.units)
              alert(values.floors)
              alert(values.rooms)
             dispatch(initRooms(values.units,values.floors,values.rooms)) */
              if (unitsValue == undefined) {
                alert('请输入单元数')
                return
              }
              if (floorsValue == undefined) {
                alert('请输入楼层数')
                return
              }
              if (roomsValue == undefined) {
                alert('请输入每层房间数')
                return
              }
              structureArr = new Array(unitsValue).fill({})
              dispatch(initRooms(parseInt(unitsValue), parseInt(floorsValue), parseInt(roomsValue)))
            }} >批量创建</Button>
          </Col>
        </Row></Container>
      <Container>
        <hr />
        <Row>
          {
            assignRooms.map(x => {
              console.log(x)
              return (
                <Col ><Label>{x.unit}单元</Label>
                  <RoomEditableTable unit={x.unit} data={x.floors} handleTableValues={getRooms} />
                </Col>)
            })}
        </Row></Container>

      <Field readOnly={readOnly}
        name="structure"
        component={InlineField}
        type="hidden"
        height='130px'
        label="房间分配"
      />
      <Field readOnly={readOnly}
        name="remark"
        component={InlineField}
        type="textarea"
        height='130px'
        label="备注"
      />
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
const selector = formValueSelector('building')
const mapStateToProps = (state) => {
  let projectList = state.projectList
 
  let cFormData = state.cForm.data
  let assignRooms = state.assignRooms
  let initialValues = {}
  if (cFormData != undefined && cFormData != null && cFormData._original != undefined)
    initialValues = { ...cFormData._original, category: "" + cFormData._original.category, projectId: cFormData._original.projectId } // 单选框选中状态必须为字符串，所以要将数字加引号
  if (assignRooms == undefined)
    assignRooms = []
  const structureValue = selector(state, 'structure')
  const unitsValue = selector(state, 'units')
  const floorsValue = selector(state, 'floors')
  const roomsValue = selector(state, 'rooms')
  
  console.log(projectList);
  return { initialValues, assignRooms, structureValue, unitsValue, floorsValue, roomsValue, projectList }

}

EditBuildingForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(EditBuildingForm)
export default EditBuildingForm;
