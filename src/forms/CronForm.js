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
    let hoursList = Array(24).fill(null).map((_, index) => {
      return { value: index, name: (index < 10 ? '0' : '') + index }
    })
    let daysList = Array(31).fill(null).map((_, index) => {
      return { value: index + 1, name: (index < 9 ? '0' : '') + (index + 1) }
    })
    let monthsList = Array(12).fill(null).map((_, index) => {
      return { value: index + 1, name: (index < 9 ? '0' : '') + (index + 1) }
    })
    let weeksList = Array(7).fill(null).map((_, index) => {
      return { value: index + 1, name: (index < 9 ? '0' : '') + (index + 1) }
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
                        <Row><Col md="4">周期从 </Col><Col md="3"><Field
                          name="secondPeriodFrom"
                          component={InlineField}
                          type="text"
                          placeholder="0"
                          mdLabel={0}
                          mdContent={12}
                        /></Col>
                          <Col md="1">-</Col><Col md="3"><Field
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
                        <Row><Col md="3">周期从 </Col><Col md="3"><Field
                          name="hourPeriodFrom"
                          component={InlineField}
                          type="text"
                          placeholder="0"
                          mdLabel="0"
                        /></Col>
                          -<Col md="3"><Field
                            name="hourPeriodTo"
                            component={InlineField}
                            type="text"
                            placeholder="0"
                            mdLabel="0"
                          /></Col>
                          小时
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
                        <Row><Col md="1">从</Col><Col md="3">
                          <Field
                            name="hourFrom"
                            component={InlineField}
                            type="text"
                            placeholder="0"
                            mdLabel="0"
                          /></Col>小时开始,每
                      <Col md="3">
                            <Field
                              name="hourPer"
                              component={InlineField}
                              type="text"
                              placeholder="0"
                              mdLabel="0"
                            /> </Col>
                          小时执行一次
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
              <TabPane tabId="4">
                <FormGroup row>
                  <Col md="9">
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="dayCommon" name="day" value="1"
                      />
                      <Label check className="form-check-label" htmlFor="dayCommon">日 允许的通配符[, - * / L W]</Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="dayNotSpecial" name="day" value="2"
                      />
                      <Label check className="form-check-label" htmlFor="dayNotSpecial">不指定</Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="dayPeriod" name="day" value="3"
                      />
                      <Label check className="form-check-label" htmlFor="dayPeriod">
                        <Row><Col md="3">周期从 </Col><Col md="3"><Field
                          name="dayPeriodFrom"
                          component={InlineField}
                          type="text"
                          placeholder="0"
                          mdLabel="0"
                        /></Col>
                          -<Col md="3"><Field
                            name="dayPeriodTo"
                            component={InlineField}
                            type="text"
                            placeholder="0"
                            mdLabel="0"
                          /></Col>
                          日
                    </Row>
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="dayFromPer" name="day" value="4"
                      />
                      <Label check className="form-check-label" htmlFor="dayFromPer">
                        <Row><Col md="1">从</Col><Col md="3">
                          <Field
                            name="dayFrom"
                            component={InlineField}
                            type="text"
                            placeholder="0"
                            mdLabel="0"
                          /></Col>日开始,每
                      <Col md="3">
                            <Field
                              name="dayPer"
                              component={InlineField}
                              type="text"
                              placeholder="0"
                              mdLabel="0"
                            /> </Col>
                          天执行一次
                    </Row>
                      </Label>
                    </FormGroup>


                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="dayWorking" name="day" value="5"
                      />
                      <Label check className="form-check-label" htmlFor="dayWorking">
                        <Row><Col md="2">每月</Col><Col md="3">
                          <Field
                            name="dayWorking"
                            component={InlineField}
                            type="text"
                            placeholder="0"
                            mdLabel="0"
                          /></Col>号最近的那个工作日
                    </Row>
                      </Label>
                    </FormGroup>


                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="dayLast" name="day" value="6"
                      />
                      <Label check className="form-check-label" htmlFor="dayLast">每月最后一天</Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="daySpecial" name="day" value="7"
                      />
                      <Label check className="form-check-label" htmlFor="daySpecial">指定</Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="12">
                    <Field name="days" component={CheckboxGroup} options={daysList} />
                  </Col>
                </FormGroup>
              </TabPane>
              <TabPane tabId="5">
                <FormGroup row>
                  <Col md="9">
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="monthCommon" name="month" value="1"
                      />
                      <Label check className="form-check-label" htmlFor="monthCommon">月 允许的通配符[, - * /]</Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="monthNotSpecial" name="month" value="2"
                      />
                      <Label check className="form-check-label" htmlFor="monthNotSpecial">不指定</Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="monthPeriod" name="month" value="3"
                      />
                      <Label check className="form-check-label" htmlFor="monthPeriod">
                        <Row><Col md="3">周期从 </Col><Col md="3"><Field
                          name="monthPeriodFrom"
                          component={InlineField}
                          type="text"
                          placeholder="0"
                          mdLabel="0"
                        /></Col>
                          -<Col md="3"><Field
                            name="monthPeriodTo"
                            component={InlineField}
                            type="text"
                            placeholder="0"
                            mdLabel="0"
                          /></Col>
                          月
                </Row>
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="monthFromPer" name="month" value="4"
                      />
                      <Label check className="form-check-label" htmlFor="monthFromPer">
                        <Row><Col md="1">从</Col><Col md="3">
                          <Field
                            name="monthFrom"
                            component={InlineField}
                            type="text"
                            placeholder="0"
                            mdLabel="0"
                          /></Col>月开始,每
                  <Col md="3">
                            <Field
                              name="monthPer"
                              component={InlineField}
                              type="text"
                              placeholder="0"
                              mdLabel="0"
                            /> </Col>
                          月执行一次
                </Row>
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="monthSpecial" name="month" value="5"
                      />
                      <Label check className="form-check-label" htmlFor="monthSpecial">指定</Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="12">
                    <Field name="months" component={CheckboxGroup} options={monthsList} />
                  </Col>
                </FormGroup>
              </TabPane>
              <TabPane tabId="6">
                <FormGroup row>
                  <Col md="9">
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="weekCommon" name="week" value="1"
                      />
                      <Label check className="form-check-label" htmlFor="weekCommon">周 允许的通配符[, - * / L #]</Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="weekNotSpecial" name="week" value="2"
                      />
                      <Label check className="form-check-label" htmlFor="weekNotSpecial">不指定</Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="weekPeriod" name="week" value="3"
                      />
                      <Label check className="form-check-label" htmlFor="weekPeriod">
                        <Row><Col md="3">周期从星期</Col><Col md="3"><Field
                          name="weekPeriodFrom"
                          component={InlineField}
                          type="text"
                          placeholder="0"
                          mdLabel="0"
                        /></Col>
                          -<Col md="3"><Field
                            name="weekPeriodTo"
                            component={InlineField}
                            type="text"
                            placeholder="0"
                            mdLabel="0"
                          /></Col>

                        </Row>
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="weekFromPer" name="week" value="4"
                      />
                      <Label check className="form-check-label" htmlFor="weekFromPer">
                        <Row><Col md="1">第</Col><Col md="3">
                          <Field
                            name="weekFrom"
                            component={InlineField}
                            type="text"
                            placeholder="0"
                            mdLabel="0"
                          /></Col>周的星期
                  <Col md="3">
                            <Field
                              name="weekPer"
                              component={InlineField}
                              type="text"
                              placeholder="0"
                              mdLabel="0"
                            /> </Col>

                        </Row>
                      </Label>
                    </FormGroup>


                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="weekLast" name="week" value="5"
                      />
                      <Label check className="form-check-label" htmlFor="weekLast">
                        <Row><Col md="8">本月最后一个星期
                      </Col><Col>
                            <Field
                              name="monthLast"
                              component={InlineField}
                              type="text"
                              placeholder="0"
                              mdLabel="0"
                            /> </Col>
                        </Row>
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Field className="form-check-input"
                        component="input"
                        type="radio"
                        id="weekSpecial" name="week" value="6"
                      />
                      <Label check className="form-check-label" htmlFor="weekSpecial">指定</Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="12">
                    <Field name="weeks" component={CheckboxGroup} options={weeksList} />
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

