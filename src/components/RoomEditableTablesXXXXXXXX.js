import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactTable from "react-table";
import "react-table/react-table.css";
import RoomEditableTable from './RoomEditableTable.js'
import { Container, ListGroup, CardFooter, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';

//多个楼层房间分配可编辑表格
class RoomEditableTables extends React.Component {
  constructor(props) {
    super(props);
   /*  this.state = {
      units, floors, floorRooms,
      data: props.data
    }; */
   // this.renderEditable = this.renderEditable.bind(this);
  }
/*   renderEditable(cellInfo) {
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
  } */
  render() {
    const { assignRooms } = this.props;
  
    return (
      <Container>
        <Row>
          {assignRooms.map(x => (
            <Col ><Label>{x.unit}</Label><RoomEditableTable data={data[x]} />
            </Col>))}
        </Row></Container>
    );
  }
}

const mapStateToProps = (state) => {
  let assignRooms = state.assignRooms  
  return { assignRooms }
}


RoomEditableTables = connect(
  mapStateToProps
)(RoomEditableTables)
export default RoomEditableTables