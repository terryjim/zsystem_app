import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showConfirm, closeConfirm, getList, saveForm, fillForm, delList,clearEditedIds } from '../actions/common'
import { getPropertyList } from '../actions/property'
import {allotBuildings} from '../actions/building'
import { Badge, Alert, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import EditDepartmentAndBuildingsForm from '../forms/EditDepartmentAndBuildingsForm'
import TopModal from '../components/TopModal'
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import 'react-table/react-table.css'

const CheckboxTable = checkboxHOC(ReactTable);
class DepartmentAndBuildings extends Component {
  componentWillMount() {
    //每次打开时清除页面修改痕迹
    this.props.dispatch(clearEditedIds())
  }
  componentWillReceiveProps(nextProps) {
    //确认删除记录操作    
    if (nextProps.confirmDel) {
      this.props.dispatch(delList(this.state.selection, 'department'))
    }
  }
  constructor(props) {
    super(props);
    //初始化物业公司选择列表（表单下拉框）
    props.dispatch(getPropertyList())
    this.state = {
      showEditDepartment: false,//显示修改表单
      showDanger: false,   //显示错误信息
      /*    showDepartment: false,   */
      selection: [],
      edit: false,//是否为编辑状态
      selectAll: false,
    };
  }
  toggleSelection = (key, shift, row) => {
    /* 
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };

  toggleAll = () => {
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' department contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item._original.id);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  };
  //切换编辑窗口状态（开、闭）
  toggleShowEditDepartment = () => {
    this.setState({
      showEditDepartment: !this.state.showEditDepartment,
    });
  }
  //切换查看窗口状态（开、闭）
  /*   toggleShowDepartment = () => {
      this.setState({
        showDepartment: !this.state.showDepartment,
      });
    } */
  //切换错误窗口状态（开、闭）  
  toggleShowDanger = () => {
    this.setState({
      showDanger: !this.state.showDanger,
    });
  }
  submit = (values) => {
    console.log(values)
    //return null
    //values.property = {id: values.property} 
   // console.log(values)
     //values.id:项目部id，values.buildings:分配楼栋列表
    this.props.dispatch(allotBuildings(values.id, values.buildings))
    this.setState({ showEditDepartment: false })
  }
  columns = [{
    accessor: 'id',
    Header: 'id',
    show: false,

  }, {
    Header: '',
    sortable: false,
    width: 60,
    filterable: false,
    Cell: (c) => (<div>
      <a className="fa fa-edit" style={{ fontSize: 20, color: '#00adff', alignItems: 'top' }}
        onClick={
          (e) => {
            e.stopPropagation()
            this.props.dispatch(fillForm(c.row))　　/* 获取当前行信息填充到编辑表单 */
            this.setState({ showEditDepartment: true, edit: true })
          }
        }>
      </a>
    
    </div>)
  }, {
    // accessor: 'companyName',
    Header: '物业名称',
    width: 300,
    id: 'companyName',
    accessor: d => d.property == undefined ? '' : d.property.companyName
    /*  Cell: c => c.original.department.companyName */
  }
    , {
    // accessor: 'companyName',
    Header: '物业ID',
    //width: 400,
    id: 'pid',
    accessor: d => d.property == undefined ? '' : d.property.id,
    show: false,
  }, {
    accessor: 'name',
    Header: '项目部名称',
    width: 300,
  }, {
   // accessor: 'buildings',
   id:'buildings',
   Header: '楼栋名称',
   width: 500,   
   accessor: d => JSON.stringify(d.buildings),
   show: false
 }, {
     accessor: 'projectName',
    Header: '楼盘名称',
    width: 300,   
    //accessor: d => d.property == undefined ? '' : d.property.companyName
    /*  Cell: c => c.original.department.companyName */
  }
    , {
     accessor: 'projectId',
    Header: '楼盘ID',
    //width: 400,
    id: 'pid',
    //accessor: d => d.property == undefined ? '' : d.property.id,
    show: false,
  },  /*{
    //accessor: 'enabled',
    id:'enabled',
    Header: '状态',
    width: 80,
    accessor: d => (d.enabled ? ( <Badge color="primary">启用中</Badge>) : ( <Badge color="danger">已禁用</Badge>))
  },*/ 
  ];

  render() {
    const { toggleSelection, toggleAll, isSelected } = this;
    const { selectAll } = this.state;
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
    };
    let Departments = this.props.Departments

    return (
      <div className="animated fadeIn">
        
        <CheckboxTable ref={r => (this.checkboxTable = r)} keyField='id' data={Departments.content}
          pages={Departments.totalPages} columns={this.columns} defaultPageSize={10} filterable
          className="-striped -highlight"
          /* onPageChange={(pageIndex) => this.props.dispatch(getDepartment({page:pageIndex,size:10}))}  */
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          onFetchData={(state, instance) => {
            let whereSql = ''
            state.filtered.forEach(
              v => {
                if (v.id == 'enabled') {
                  whereSql = whereSql + ' and enabled=' + (v.value == 1 ? 0 : 1)
                } else
                  whereSql = whereSql + ' and ' + v.id + ' like \'%' + v.value + '%\''
              }
            )
            this.props.dispatch(getList({ whereSql, page: state.page, size: state.pageSize }, 'department_buildings'))
          }}
          getTrProps={
            (state, rowInfo, column, instance) => {
              let style = {}
              if ((this.props.editedIds != undefined) && rowInfo != undefined && this.props.editedIds.includes(rowInfo.row.id)) {
                style.background = '#c8e6c9';
              }
              if (rowInfo != undefined && this.state.selection.includes(rowInfo.row.id)) {
                style.background = '#62c2de';
              }
              return {
                style, onDoubleClick: (e, handleOriginal) => {
                  this.props.dispatch(fillForm(rowInfo.row));
                  this.setState({ showEditDepartment: true, edit: false })
                },
                onClick: (e, handleOriginal) => {
                  if (e.ctrlKey) {
                    this.setState({ selection: [rowInfo.row.id, ...this.state.selection] })
                  } else {
                    if (this.state.selection.includes(rowInfo.row.id))
                      this.setState({ selection: [] })
                    else
                      this.setState({ selection: [rowInfo.row.id] })
                  }
                }
              }
            }
          }
          {...checkboxProps}
        />

        <TopModal isOpen={this.state.showEditDepartment} toggle={() => this.toggleShowEditDepartment()}
          className={'modal-primary ' + this.props.className}>
          <ModalHeader toggle={() => this.toggleShowEditDepartment()}>分配楼栋信息</ModalHeader>
          <ModalBody>
            <EditDepartmentAndBuildingsForm readOnly={!this.state.edit} onSubmit={this.submit} closeForm={this.toggleShowEditDepartment} />
          </ModalBody>
        </TopModal>

      </div>
    )
  }
}
//获取Department记录集及修改记录ＩＤ数组
const mapStateToProps = (state) => {
  let Departments = state.cList
  //alert(JSON.stringify(Departments ))
  let editedIds = state.editedIds
  let confirmDel = state.confirm.module === 'department' && state.confirm.operate === 'del' ? state.confirm.confirm : false
  return { Departments, editedIds, confirmDel }
}


DepartmentAndBuildings = connect(
  mapStateToProps
)(DepartmentAndBuildings)
export default DepartmentAndBuildings;
