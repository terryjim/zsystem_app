import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showConfirm, closeConfirm, getList, saveForm, fillForm, delList } from '../actions/common'
import { clearEditedIds } from '../actions/common'
import { updateAccessHardware } from '../actions/accessHardware'
import { Badge, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import UpdateAccessHardwareForm from '../forms/UpdateAccessHardwareForm'
import TopModal from '../components/TopModal'
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import MyPagination from '../components/MyPagination'
import 'react-table/react-table.css'

const CheckboxTable = checkboxHOC(ReactTable);
class AccessHardwareUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditAccessHardware: false,//显示修改表单
      showDanger: false,   //显示错误信息     
      selection: [],
      edit: false,//是否为编辑状态
      selectAll: false,
      loading: true,
    };
  }
  componentWillMount() {
    //每次打开时清除页面修改痕迹
    this.props.dispatch(clearEditedIds())
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false })
    if (nextProps.closeModal)    //保存成功后关闭表单窗口
      this.setState({ showEditAccessHardware: false })
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
        selection.push(item._original.hardwareCode);
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
  toggleShowEditAccessHardware = () => {
    if (!this.state.showEditAccessHardwar && this.state.selection.length === 0) {
      alert("请选择要更新的设备！")
    } else {
      this.setState({
        showEditAccessHardware: !this.state.showEditAccessHardware,
      });
    }
  }
  //切换查看窗口状态（开、闭）
  /*   toggleShowAccessHardware = () => {
      this.setState({
        showAccessHardware: !this.state.showAccessHardware,
      });
    } */
  //切换错误窗口状态（开、闭）  
  toggleShowDanger = () => {
    this.setState({
      showDanger: !this.state.showDanger,
    });
  }
  submit = (values) => {
    let formData = new FormData()
    formData.append('version', values.version)
    formData.append('firmware', values.updateFile[0])
    formData.append('devices', this.state.selection.join(','))
    this.props.dispatch(updateAccessHardware(formData))
  }
  columns = [{
    accessor: 'id',
    Header: 'id',
    show: false,

  }, {
    id: 'index',
    Header: '序号',
    filterable: false,
    width: 60,
    Cell: props => (props.page * props.pageSize + props.viewIndex + 1),
    sortable: false
  }, {
    Header: '',
    sortable: false,
    width: 60,
    filterable: false,
    Cell: (c) => (<div>
      <a className="fa fa-plug" style={{ fontSize: 15, color: '#00adff', alignItems: 'top' }}
        onClick={
          (e) => {
            e.stopPropagation()
            this.setState({ selection: [c.row.hardwareCode] },()=> this.toggleShowEditAccessHardware())
            //this.props.dispatch(fillForm(c.row))　　/* 获取当前行信息填充到编辑表单 */
           
            this.setState({ edit: true })
          }
        }>
      </a>
      &nbsp;

    </div>)
  }, {
    id: 'category',
    accessor: d => d.category === 1 ? '蓝牙' : d.category === 2 ? '二维码' : d.category === 3 ? '蓝牙及二维码' : '',
    Header: '硬件类型',
  }, {
    accessor: 'hardwareCode',
    Header: '硬件编号',

  }, {
    accessor: 'hardwareVer',
    Header: '硬件版本',

  }, {
    accessor: 'hardwareMac',
    Header: '硬件MAC地址',

  }, {
    accessor: 'hardwareKey',
    Header: '硬件密码',

  },
  {
    accessor: 'manufacturer',
    Header: '制造商',
    Cell: ({ value }) => (value === "1" ? <Badge className="mr-1" color="success">平冶</Badge> : value === "2" ? <Badge className="mr-1" color="danger">智果</Badge> : ''),
    // accessor:'status',
    /*  sortMethod: (a, b) => {
       return a.props.value > b.props.value ? 1 : -1;
     } */
    Filter: ({ filter, onChange }) =>
      <select
        onChange={event => onChange(event.target.value)}
        value={filter ? filter.value : ""}
      >
        <option value="1">平冶</option>
        <option value="2">智果</option>
        <option value="">全部</option>
      </select>,




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
    let accessHardwares = this.props.accessHardwares

    return (
      <div className="animated fadeIn" style={{ marginTop: '-15px' }}>
        <div style={{ marginBottom: '8px' }}>
          <Button color="success" size="sm"
            onClick={() => {
              this.props.dispatch(fillForm(null))
              this.toggleShowEditAccessHardware()
              this.setState({ edit: true })
            }
            }>
            <i className="fa fa-file-o"></i>&nbsp;固件更新
    </Button>
        </div>
        <CheckboxTable ref={r => (this.checkboxTable = r)} keyField='hardwareCode' data={accessHardwares.content}
          pages={accessHardwares.totalPages} columns={this.columns} defaultPageSize={20} filterable
          className="-striped -highlight"
          total={accessHardwares.totalElements}
          PaginationComponent={MyPagination}
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          loading={this.state.loading}
          style={{
            height: document.body.clientHeight - 210 // This will force the table body to overflow and scroll, since there is not enough room
            , backgroundColor: '#FFFFFF'
          }}
          getTheadProps={() => {
            return {
              style: {
                height: '40px', boxShadow: '0px 1px 3px rgba(34, 25, 25, 0.5)',
              }
            };
          }}
          getTheadThProps={() => {
            return {
              style: {
                marginTop: '5px'
              }
            };
          }}
          getTdProps={(state, rowInfo, column) => {
            return {
              style: {
                textAlign: "center"
              }
            };
          }}
          onFetchData={(state, instance) => {
            let whereSql = ''
            state.filtered.forEach(
              v => {
                /*    if (v.id === 'address')
                     whereSql += ' and address=\'{\'p\':\''+ v.value + '\'}'
                   else */
                if (v.id === 'manufacturer') {
                  if (v.value !== '')
                    whereSql += ' and manufacturer=' + v.value
                } else
                  whereSql += ' and ' + v.id + ' like \'%' + v.value + '%\''
              }
            )
            state.sorted.forEach(
              (v, index) => {
                if (index === 0)
                  whereSql += ' order by  ' + v.id + (v.desc ? " desc" : " asc")
                else
                  whereSql += ' and ' + v.id + (v.desc ? " desc" : " asc")
              }
            )
            this.props.dispatch(getList({ whereSql, page: state.page, size: state.pageSize }, 'accessHardware'))
          }}
          getTrProps={
            (state, rowInfo, column, instance) => {
              let style = {}
              if (rowInfo != undefined && this.state.selection.includes(rowInfo.row.hardwareCode)) {
                style.background = '#4DBD74'
                style.color = '#FFFFFF'
              }
              else
                if ((this.props.editedIds != undefined) && rowInfo != undefined && this.props.editedIds.includes(rowInfo.row.hardwareCode)) {
                  style.background = '#F86C6B'
                  style.color = '#FFFFFF'
                } else
                  style = {}

              return {
                style,
                onClick: (e, handleOriginal) => {
                  if (e.ctrlKey) {
                    if (this.state.selection.includes(rowInfo.row.hardwareCode))
                      this.setState({ selection: this.state.selection.filter(x => x !== rowInfo.row.hardwareCode) })
                    else
                      this.setState({ selection: [rowInfo.row.hardwareCode, ...this.state.selection] })
                  } else {
                    if (this.state.selection.includes(rowInfo.row.hardwareCode))
                      this.setState({ selection: [] })
                    else
                      this.setState({ selection: [rowInfo.row.hardwareCode] })
                  }
                }
              }
            }
          }
          {...checkboxProps}
        />
        {/*  <div className="row">

          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> 管理员设置
              </div>
              <div className="card-block"> */}

        <TopModal isOpen={this.state.showEditAccessHardware} toggle={() => this.toggleShowEditAccessHardware()}
          className={'modal-primary ' + this.props.className}>
          <ModalHeader toggle={() => this.toggleShowEditAccessHardware()}>门禁设备固件更新</ModalHeader>
          <ModalBody>
            <UpdateAccessHardwareForm readOnly={!this.state.edit} onSubmit={this.submit} closeForm={this.toggleShowEditAccessHardware} />
          </ModalBody>
        </TopModal>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let accessHardwares = state.cList
  let editedIds = state.editedIds
   return { closeModal: state.success.show, accessHardwares, editedIds}
}


AccessHardwareUpdate = connect(
  mapStateToProps
)(AccessHardwareUpdate)
export default AccessHardwareUpdate;
