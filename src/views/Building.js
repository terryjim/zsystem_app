import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showConfirm, closeConfirm, getList, saveForm, fillForm, delList } from '../actions/common'
import { clearEditedIds } from '../actions/common'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import EditBuildingForm from '../forms/EditBuildingForm'
import TopModal from '../components/TopModal'
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";

//管理员主列表，增删改查
const CheckboxTable = checkboxHOC(ReactTable);
class Building extends Component {
  componentWillMount() {
    //每次打开时清除页面修改痕迹
    this.props.dispatch(clearEditedIds())
  }
  componentWillReceiveProps(nextProps) {
    //确认删除记录操作    
    if (nextProps.confirmDel) {
      this.props.dispatch(delList(this.state.selection, 'building'))
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      showEditBuilding: false,//显示修改表单
      showDanger: false,   //显示错误信息
      showBuilding: false,
      showForm:false,
      selection: [],
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
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
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
  toggleShowEditBuilding = () => {
    this.setState({
      showEditBuilding: !this.state.showEditBuilding,
    });
  }
  //切换查看窗口状态（开、闭）
  toggleShowBuilding = () => {
    this.setState({
      showBuilding: !this.state.showBuilding,
    });
  }
  //切换错误窗口状态（开、闭）  
  toggleShowDanger = () => {
    this.setState({
      showDanger: !this.state.showDanger,
    });
  }
  submit = (values) => {
    this.props.dispatch(saveForm(values, 'building'))
    this.setState({ showEditBuilding: false })
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
      <a className="fa fa-edit fa-lg mt-4"
        onClick={
          (e) => {
            //e.stopPropagation()
            this.props.dispatch(fillForm(c.row))　　/* 获取当前行信息填充到编辑表单 */
            this.setState({ showEditBuilding: true })
          }
        }>
      </a>
      <a className="fa fa-trash-o fa-lg mt-4"
        onClick={
          e => {
            // e.stopPropagation()
            this.props.dispatch(showConfirm('是否删除选中记录？', 'building', 'del'))
          }
        }>
      </a>
    </div>)
  }, {
    accessor: 'name',
    Header: '楼盘名',

  }, {
    accessor: 'category',
    Header: '类型',
  }, {
    accessor: 'address',
    Header: '地址',
  }, {
    accessor: 'remark',
    Header: '备注',
    Cell: row => {
      let showFiles = row.value
      if (showFiles === '')
        showFiles.split(',').map(x => {
          return <div><a href={`https://bluechips.oss-cn-hangzhou.aliyuncs.com/terry/` + x}>{x}</a>&nbsp;&nbsp;</div>
        })
      //showFiles=<div>{showFiles}</div>
      return <div>{showFiles}</div>
    }
  }
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
    let buildings = this.props.buildings

    return (
      <div className="animated fadeIn">
        <Button color="primary" size="sm" onClick={() => { this.props.dispatch(fillForm(null)); this.setState({ showEditbuilding: true }) }}>新增</Button>
        <Button color="danger" size="sm" onClick={() => { this.props.dispatch(showConfirm('是否删除选中记录？', 'building', 'del')); }}>删除</Button>
        <CheckboxTable ref={r => (this.checkboxTable = r)} keyField='id' data={buildings.content}
          pages={buildings.totalPages} columns={this.columns} defaultPageSize={10} filterable
          className="-striped -highlight"
          /* onPageChange={(pageIndex) => this.props.dispatch(getbuilding({page:pageIndex,size:10}))}  */
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          onFetchData={(state, instance) => {
            let whereSql = ''
            state.filtered.forEach(
              v => whereSql = whereSql + ' and ' + v.id + ' like \'%' + v.value + '%\''
            )

            this.props.dispatch(getList({ whereSql, page: state.page, size: state.pageSize }, 'building'))
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
                  this.setState({ showbuilding: true })
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
        <div className="row">

          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> 管理员设置
              </div>
              <div className="card-block">

                <TopModal isOpen={this.state.showEditBuilding} toggle={() => this.toggleShowEditBuilding()}
                  className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={() => this.toggleShowEditBuilding()}>修改用户</ModalHeader>
                  <ModalBody>
                    <EditBuildingForm onSubmit={this.submit} />
                  </ModalBody>
                </TopModal>
                <TopModal isOpen={this.state.showBuilding} toggle={() => this.toggleShowBuilding()}
                  className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={() => this.toggleShowBuilding()}>查看记录</ModalHeader>
                  <ModalBody>
                    <EditBuildingForm readOnly={true}/>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggleShowBuilding}>关闭</Button>
                  </ModalFooter>
                </TopModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
//获取building记录集及修改记录ＩＤ数组
const mapStateToProps = (state) => {
  let buildings = state.cList
  console.log(buildings)
  let editedIds = state.editedIds
  let confirmDel = state.confirm.module === 'building' && state.confirm.operate === 'del' ? state.confirm.confirm : false
  return { buildings, editedIds, confirmDel }
}


Building = connect(
  mapStateToProps
)(Building)
export default Building;
