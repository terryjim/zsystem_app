import React, { Component } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { Badge, Label, Row, Container, Col, Button, Nav, NavItem, TabPane, TabContent, NavLink, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../actions/common'
import { InputField, CheckboxGroup, InlineField, InlineSelectField, FieldValidate } from '../components/field'
import classnames from 'classnames'

const validate = values => {
  const errors = {}
  if (!values.companyName) {
    errors.name = '物业公司名称不能为空'
  }
  return errors
}


class CronForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const { readOnly = false, dispatch, error, handleSubmit, pristine, reset, submitting, closeForm, initialValues } = this.props;
    let optionsList = Array(60).fill(null).map((_, index) => {
      return { value: index, name: (index < 10 ? '0' : '') + index }
    })
    let hoursList= Array(24).fill(null).map((_, index) => {
      return { value: index, name: (index < 10 ? '0' : '') + index }
    })
    //let optionsList = [{ id: 1, name: 'Optoin11111' }, { id: 2, name: 'Option 22222' }, { id: 3, name: 'Option 33333' }]
    return (
      <form onSubmit={handleSubmit} >
        <Row>
          <Col xs="12" md="6" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  秒
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  分
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  时
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4' })}
                  onClick={() => { this.toggle('4'); }}
                >
                  日
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '5' })}
                  onClick={() => { this.toggle('5'); }}
                >
                  月
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '6' })}
                  onClick={() => { this.toggle('6'); }}
                >
                  周
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <FormGroup row>
                  <Col md="9">
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="secondCommon" name="second" value="1"
                      />

                      {/*  <Input className="form-check-input" type="radio" id="secondCommon" name="second" value="1" /> */}
                      <Label check className="form-check-label" htmlFor="secondCommon">每秒 允许的通配符[, - * /]</Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      {/* <Input className="form-check-input" type="radio" id="secondPeriod" name="second" value="2" /> */}
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="secondPeriod" name="second" value="2"
                      />
                      <Label check className="form-check-label" htmlFor="secondPeriod">
                        <Row><Col md="4">周期从 </Col><Col md="2"><Field
                          name="secondPeriodFrom"
                          component={InlineField}
                          type="text"
                          placeholder="0"
                          mdLabel={0}
                          mdContent={12}
                        /></Col>
                          <Col md="1">-</Col><Col md="2"><Field
                            name="secondPeriodTo"
                            component={InlineField}
                            type="text"
                            placeholder="0"
                            mdLabel={0}
                            mdContent={12}
                          /></Col>
                          <Col md="1">秒</Col>
                        </Row>
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      {/* <Input className="form-check-input" type="radio" id="secondFromPer" name="second" value="3" /> */}
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="secondFromPer" name="second" value="3"
                      />
                      <Label check className="form-check-label" htmlFor="secondFromPer">
                        <Row><Col md="2">从</Col>
                          <Col md="2"><Field
                            name="secondFrom"
                            component={InlineField}
                            type="text"
                            placeholder="0"
                            mdLabel={0}
                            mdContent={12}
                          /></Col>
                          <Col md="3">秒开始,每</Col>
                          <Col md="2">
                            <Field
                              name="secondPer"
                              component={InlineField}
                              type="text"
                              placeholder="0"
                              mdLabel={0}
                              mdContent={12}
                            /> </Col><Col md="3">
                            秒执行一次</Col>
                        </Row>
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      {/* <Input className="form-check-input" type="radio" id="secondSpecial" name="second" value="4" /> */}
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="secondSpecial" name="second" value="4"
                      />
                      <Label check className="form-check-label" htmlFor="secondSpecial">指定</Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
               
                <FormGroup row>
                  <Col md="12">
                    <Field name="seconds" component={CheckboxGroup} options={optionsList} />
                  </Col>
                </FormGroup>
              </TabPane>
              <TabPane tabId="2">
                <FormGroup row>

                  <Col md="9">
                    <FormGroup check className="radio">
                     {/*  <Input className="form-check-input" type="radio" id="minuteCommon" name="minute" value="1" /> */}
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="minuteCommon" name="minute" value="1"
                      />
                      <Label check className="form-check-label" htmlFor="minuteCommon">每分钟 允许的通配符[, - * /]</Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      {/* <Input className="form-check-input" type="radio" id="minutePeriod" name="minute" value="2" />
                       */}<Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="minutePeriod" name="minute" value="2"
                      />
                      <Label check className="form-check-label" htmlFor="minutePeriod">
                        <Row><Col md="4">周期从 </Col><Col md="2"><Field
                          name="minutePeriodFrom"
                          component={InlineField}
                          type="text"
                          placeholder="0"
                          mdLabel={0}
                          mdContent={12}
                          readOnly={false}
                        /></Col>
                          <Col md="1">-</Col><Col md="2"><Field
                            name="minutePeriodTo"
                            component={InlineField}
                            type="text"
                            placeholder="0"
                            mdLabel={0}
                            mdContent={12}
                          /></Col>
                          <Col md="1">分钟</Col>
                        </Row>
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      {/* <Input className="form-check-input" type="radio" id="minuteFromPer" name="minute" value="3" /> */}
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="minuteFromPer" name="minute" value="3"
                      />
                      <Label check className="form-check-label" htmlFor="minuteFromPer">
                        <Row><Col md="2">从</Col>
                          <Col md="1"><Field
                            name="minuteFrom"
                            component={InlineField}
                            type="text"
                            placeholder="0"
                            mdLabel={0}
                            mdContent={12}
                          /></Col>
                          <Col md="4">分钟开始,每</Col>
                          <Col md="1">
                            <Field
                              name="minutePer"
                              component={InlineField}
                              type="text"
                              placeholder="0"
                              mdLabel={0}
                              mdContent={12}
                            /> </Col><Col md="4">
                            分钟执行一次</Col>
                        </Row>
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      {/* <Input className="form-check-input" type="radio" id="minuteSpecial" name="minute" value="4" /> */}
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="minuteSpecial" name="minute" value="4"
                      />
                      <Label check className="form-check-label" htmlFor="minuteSpecial">指定</Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="12">
                    <Field name="minutes" component={CheckboxGroup} options={optionsList} />
                  </Col>
                </FormGroup>
              </TabPane>
              <TabPane tabId="3">
              <FormGroup row>
              <Col md="9">
                <FormGroup check className="radio">
                  <Field className="form-check-input"
                    component="input"
                    type="radio"
                    id="hourCommon" name="hour" value="1"
                  />
                  <Label check className="form-check-label" htmlFor="hourCommon">小时 允许的通配符[, - * /]</Label>
                </FormGroup>
                <FormGroup check className="radio">
                 <Field className="form-check-input"
                    component="input"
                    type="radio"
                    id="hourPeriod" name="hour" value="2"
                  />
                  <Label check className="form-check-label" htmlFor="hourPeriod">
                    <Row><Col md="4">周期从 </Col><Col md="2"><Field
                      name="hourPeriodFrom"
                      component={InlineField}
                      type="text"
                      placeholder="0"
                      mdLabel={0}
                      mdContent={12}
                    /></Col>
                      <Col md="1">-</Col><Col md="2"><Field
                        name="hourPeriodTo"
                        component={InlineField}
                        type="text"
                        placeholder="0"
                        mdLabel={0}
                        mdContent={12}
                      /></Col>
                      <Col md="1">小时</Col>
                    </Row>
                  </Label>
                </FormGroup>
                <FormGroup check className="radio">
                 <Field className="form-check-input"
                    component="input"
                    type="radio"
                    id="hourFromPer" name="hour" value="3"
                  />
                  <Label check className="form-check-label" htmlFor="hourFromPer">
                    <Row><Col md="2">从</Col>
                      <Col md="2"><Field
                        name="hourFrom"
                        component={InlineField}
                        type="text"
                        placeholder="0"
                        mdLabel={0}
                        mdContent={12}
                      /></Col>
                      <Col md="3">小时开始,每</Col>
                      <Col md="2">
                        <Field
                          name="hourPer"
                          component={InlineField}
                          type="text"
                          placeholder="0"
                          mdLabel={0}
                          mdContent={12}
                        /> </Col><Col md="3">
                        小时执行一次</Col>
                    </Row>
                  </Label>
                </FormGroup>
                <FormGroup check className="radio">
                  <Field className="form-check-input"
                    component="input"
                    type="radio"
                    id="hourSpecial" name="hour" value="4"
                  />
                  <Label check className="form-check-label" htmlFor="hourSpecial">指定</Label>
                </FormGroup>
              </Col>
            </FormGroup>           
            <FormGroup row>
              <Col md="12">
                <Field name="hours" component={CheckboxGroup} options={hoursList} />
              </Col>
            </FormGroup>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col col='9' />
          <Col col="1" sm="4" md="2" xl className="mb-3 mb-xl-0">
            <Button block color="primary" type="submit" >提交</Button>
          </Col>

        </Row>
      </form>
    );
  }
}

// Decorate the form component
CronForm = reduxForm({
  form: 'cron', // a unique name for this form
  validate,                // redux-form同步验证 
})(CronForm);
const mapStateToProps = (state) => {
  console.log(state.cForm.data)
  let initEnabled = '0'
  if (state.cForm.data != undefined && state.cForm.data != null)
    initEnabled = '' + state.cForm.data.enabled
  if (initEnabled == undefined || initEnabled == null)
    initEnabled = '0'
  return { initialValues: { ...state.cForm.data, enabled: initEnabled } }// 单选框选中状态必须为字符串，所以要将数字加引号
}

CronForm = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(CronForm)

export default CronForm

