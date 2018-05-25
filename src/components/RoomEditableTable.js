import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";
//楼层房间分配可编辑表格
class RoomEditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: props.unit,
      data: props.data
      //[{name:1,rooms:[01,02,03]}]}]
    };
    this.renderEditable = this.renderEditable.bind(this);
//    props.handleTableValues({ unit: props.unit, floors: this.state.data })
  }
  componentDidMount(){
    this.props.handleTableValues({ unit: this.props.unit, floors: this.state.data })
  }
  componentDidUpdate(){
    this.props.handleTableValues({ unit: this.props.unit, floors: this.state.data })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data })

  }
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  render() {
    const { data } = this.state;    
    return (
      <ReactTable
        showPagination={false}
        data={data}
        columns={[
          {
            Header: <a className="fa fa-plus" style={{ fontSize: 20, color: 'blue', alignItems: 'top' }}
              onClick={
                e => { /* const data = [...this.state.data]; */
                  /*   data[c.index]= e.target.innerHTML; */

                  data.splice(data.length, 0, { name: '', rooms: '' })
                  this.setState({ data });
                }
              }>
            </a>,
            sortable: false,
            width: 30,
            filterable: false,
            Cell: (c) => (<div>
              <a className="fa fa-trash-o" style={{ fontSize: 20, color: '#FF5722', alignItems: 'top' }}
                onClick={
                  e => { /* const data = [...this.state.data]; */
                    /*   data[c.index]= e.target.innerHTML; */

                    data.splice(c.index, 1)
                    this.setState({ data });
                  }
                }>
              </a>
            </div>)
          }, {
            Header: "楼层",
            accessor: "name",
            width: 40,
            Cell: this.renderEditable
          },
          {
            Header: "房号",
            accessor: "rooms",
            // width: 200,
            Cell: this.renderEditable,
            sortable: false
          }
        ]}
        resizable={false}
        minRows={1}
        defaultPageSize={999}
        noDataText='无数据'
        className="-striped -highlight"
      />
    );
  }
}

export default RoomEditableTable