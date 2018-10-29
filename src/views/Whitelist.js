import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getList, saveForm, fillForm } from '../actions/common'
import { enabledWhitelist } from '../actions/whitelist'
import { Badge, Label,Row, Container, Col, Button, Nav,NavItem, TabPane, TabContent, NavLink,  Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import classnames from 'classnames'
import CronBuilder from 'react-cron-builder'
import 'react-cron-builder/dist/bundle.css'
import {CheckboxGroup} from '../components/Field'
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import CronForm from '../forms/CronForm'
class Whitelist extends Component {
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


  componentDidMount() {
    this.props.dispatch(getList({}, 'whitelist'))

  }
  componentWillReceiveProps(nextProps) {
    //this.setState({ loading: false })
  }

  submit = (values) => {
    console.log(values)
    this.props.dispatch(saveForm(values, 'whitelist'))
    // this.setState({ showEditProject: false })
  }


  render() {
    let schedule = this.props.schedule
    console.log(schedule)
    console.log(schedule.cron)
     return (
      <div className="animated fadeIn" >
        <div>状态:&nbsp;&nbsp;{schedule.enabled ? <Badge className="mr-1" color="success">启用运行中</Badge> : <Badge className="mr-1" color="danger">禁用中</Badge>}：
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button color="primary" size="sm"
            onClick={() => {
              if (schedule.cron !== undefined)
                this.props.dispatch(enabledWhitelist(true))
            }}>启动</Button>
          &nbsp;&nbsp;<Button color="danger" size="sm" onClick={() => {
            if (schedule.cron !== undefined)
              this.props.dispatch(enabledWhitelist(false))
          }}>停止</Button></div><hr />
        <Container style={{allignItem:'center'}}>  <CronBuilder key={schedule.cron}
          cronExpression={schedule.cron}
          showResult={true} submit={(value) => this.submit(value)}
        /><br /><br />
        </Container>
       {/* <CronForm onSubmit={this.submit} /> */}
      </div>
    )
  }
}


//获取project记录集及修改记录ＩＤ数组
const mapStateToProps = (state) => {
  let schedules = state.cList
  console.log(schedules)
  let schedule = { enabled: false }
  if (schedules !== undefined && schedules.content !== undefined && schedules.content.length > 0)
    schedule = schedules.content[0]
  console.log(schedule)
 /* 
  let editedIds = state.editedIds
  let confirmDel = state.confirm.module === 'project' && state.confirm.operate === 'del' ? state.confirm.confirm : false
  */ return { schedule }
}


Whitelist = connect(
  mapStateToProps
)(Whitelist)
export default Whitelist;




