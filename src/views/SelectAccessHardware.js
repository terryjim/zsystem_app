import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, change, FieldArray, formValueSelector, getFormValues, formValues } from 'redux-form';
import { showConfirm, closeConfirm, getList, saveForm, fillForm, delList } from '../actions/common'
import { clearEditedIds } from '../actions/common'
import { getAccessHardwareList } from '../actions/accessHardware'
import { Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import 'react-table/react-table.css'

const CheckboxTable = checkboxHOC(ReactTable);
class SelectAccessHardware extends Component {
  componentWillMount() {
    //每次打开时清除页面修改痕迹
    // this.setState({data:this.props.accessHardwares.content})
    // this.props.dispatch(getAccessHardwareList(this.props.pid))
  }
  componentWillReceiveProps(nextProps) {

    if (this.state.data === undefined || nextProps.accessHardwares.content != this.state.data) {
      this.setState({ data: nextProps.accessHardwares.content })
      let content = nextProps.accessHardwares.content
      if (content != undefined) {
        let selection = []
        //选中原有绑定的硬件设备
        content.map((c, index) => {
          if (c.accessControlId != undefined && c.accessControlId === this.props.pid) {
            selection.push(c.id);
          }
        })
        this.setState({ selection })
      }
    }
  }
  constructor(props) {
    super(props);
    this.state = {

      selection: [],
      edit: false,//是否为编辑状态
      selectAll: false,
      data: props.accessHardwares.content
    };
    this.renderEditable = this.renderEditable.bind(this)
    this.renderSelectEntranceType = this.renderSelectEntranceType.bind(this)
    this.renderSelectEntranceDirection = this.renderSelectEntranceDirection.bind(this)
   
  }
  componentDidUpdate() {
    //将选中的记录传值给表单
    let data = this.state.data
    let selection = this.state.selection
    if (data === undefined || selection === undefined || selection.length < 1) {
      return this.props.handleTableValues(null)
    }
    let selHardwares = new Array()
    data.map(d => {
      if (this.state.selection.indexOf(d.id) > -1){   
        selHardwares.push({ id: d.id, name: d.name,entranceDirection:d.entranceDirection,entranceType:d.entranceType})
   
      }})

    this.props.handleTableValues(selHardwares)
  }
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa", height:"35px" }}
        contentEditable
        suppressContentEditableWarning
        onClick={e => {
          //屏蔽row点击事件
          e.stopPropagation()
        }}
        onBlur={e => {
          const data = [...this.state.data];
          /*  let rooms=e.target.innerHTML
           let roomArray=rooms.split(',') */
          //data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  renderSelectEntranceType(cellInfo) {
    //alert(JSON.stringify(this.state.data))
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
       // contentEditable
      //  suppressContentEditableWarning
        onClick={e => {
          e.stopPropagation()
        }}
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.value;        
          this.setState({ data });
        }}
      ><Input type="select">
          <option value="1" selected>匝道</option>
          <option value="2" selected={this.state.data[cellInfo.index][cellInfo.column.id]===2?"selected":""}>探头</option>
        </Input></div>
    );
  }
  renderSelectEntranceDirection(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
       // contentEditable
       // suppressContentEditableWarning
        onClick={e => {
          e.stopPropagation()
        }}
        onBlur={e => {
          const data = [...this.state.data];
          //data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;   
          data[cellInfo.index][cellInfo.column.id] =e.target.value    
          this.setState({ data });
        }}
      ><Input type="select">
          <option value="0" selected>入口</option>
          <option value="1"  selected={this.state.data[cellInfo.index][cellInfo.column.id]===1?"selected":""}>出口</option>
        </Input></div>
    );
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
  toggleShowEditAccessHardware = () => {
    this.setState({
      showEditAccessHardware: !this.state.showEditAccessHardware,
    });
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
    console.log(values)
    this.props.dispatch(saveForm(values, 'accessHardware'))

  }


  render() {
    const { toggleSelection, toggleAll, isSelected } = this;
    const { selectAll, data } = this.state;
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
    };
    let accessHardwares = this.props.accessHardwares

    return (
      <div className="animated fadeIn">
        <CheckboxTable ref={r => (this.checkboxTable = r)} keyField='id' data={this.state.data}
          pages={accessHardwares.totalPages}
          columns={[{
            accessor: 'id',
            Header: 'id',
            show: false,

          }, {
            accessor: 'name',
            Header: '名称',
            Cell: this.renderEditable,
          }, {
            accessor: 'entranceDirection',
            Header: '出入类型',
            Cell: this.renderSelectEntranceDirection
          }, {
            accessor: 'entranceType',
            //accessor: d => d.entranceType == 1 ? '匝道' : d.entranceType == 2 ? '探头' :'',
            Header: '门禁类型',
            Cell: this.renderSelectEntranceType
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

          }, {
            id: 'manufacturer',
            Header: '制造商',
            accessor: d => d.manufacturer == 1 ? '平冶' : d.manufacturer == 2 ? '智果' : '',


          }, {
            accessor: 'shakeRssi',
            Header: '摇一摇距离',

          }, {
            accessor: 'nearRssi',
            Header: '靠近距离',

          }, {
            accessor: 'hardwareCode',
            Header: '硬件编号',

          },
          ]}
          resizable={false}
          minRows={10}
          defaultPageSize={10} filterable
          className="-striped -highlight"
          /* onPageChange={(pageIndex) => this.props.dispatch(getAccessHardware({page:pageIndex,size:10}))}  */
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          onFetchData={(state, instance) => {
            let whereSql = ''
            //如果pid为空说明是新建文档，查询所有未分配的门禁，如果不为空则要加上pid所对应的门禁
            if (this.props.pid != undefined)
              whereSql = `  and (accessControlId is null or accessControlId=${this.props.pid})`
            else
              whereSql = '  and accessControlId is null '

            state.filtered.forEach(
              v => {
                /*    if (v.id === 'address')
                     whereSql += ' and address=\'{\'p\':\''+ v.value + '\'}'
                   else */
                whereSql += ' and ' + v.id + ' like \'%' + v.value + '%\''
              }
            )
            //this.props.dispatch(getAccessHardwareList(this.props.pid))

            this.props.dispatch(getAccessHardwareList({ whereSql: whereSql + ' order by accessControlId desc', page: state.page, size: state.pageSize }))
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
                style, 
               /*  onDoubleClick: (e, handleOriginal) => {
                  this.props.dispatch(fillForm(rowInfo.row));
                  this.setState({ showEditAccessHardware: true, edit: false })
                }, */
                onClick: (e, handleOriginal) => {
                  if (e.ctrlKey) {
                    // this.setState({ selection: [rowInfo.row.id, ...this.state.selection] })
                    toggleSelection(rowInfo.row.id, null, rowInfo.row)
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

        {/* <ReactTable
        showPagination={false}
        data={data}
        columns={[{
          accessor: 'id',
          Header: 'id',
          show: false,
      
        },{
          accessor: 'name',
          Header: '名称',
          Cell: this.renderEditable,
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
      
        }, {
          id: 'manufacturer',
          Header: '制造商',
          accessor: d => d.manufacturer == 1 ? '平冶' : d.manufacturer == 2 ? '智果' : '',
      
      
        }, {
          accessor: 'shakeRssi',
          Header: '摇一摇距离',
      
        }, {
          accessor: 'nearRssi',
          Header: '靠近距离',
      
        }, {
          accessor: 'hardwareCode',
          Header: '硬件编号',
      
        },
        ]}
        resizable={false}
        minRows={10}
        defaultPageSize={999}
        noDataText='无数据'
        className="-striped -highlight"
      /> */}

      </div>
    )
  }
}
//获取project记录集及修改记录ＩＤ数组
const mapStateToProps = (state) => {
  let accessHardwares = state.accessHardwareList
  //alert(JSON.stringify(accessHardwares))
  return { accessHardwares }
}


SelectAccessHardware = connect(
  mapStateToProps
)(SelectAccessHardware)
export default SelectAccessHardware;
