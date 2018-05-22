import React, { Component } from 'react';
import {
  Badge, Button, ButtonDropdown, Card, CardBody, CardFooter, CardHeader, Col, Collapse, DropdownItem, DropdownMenu,
  DropdownToggle, Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText,
  Label, Row,
} from 'reactstrap';
export const InputField = ({ readOnly, input, label, type, meta: { touched, error } }) => (
  <Col xs="12">
    <FormGroup>
      <Label hidden={type === 'hidden' ? true : false || label == undefined || label == null} htmlFor="{label}">{label}</Label>
      <Input type={type} invalid={touched && error ? true : false} valid={touched && !error ? true : false} id="name" placeholder={label} {...input} readOnly={readOnly} />
      {touched && error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  </Col>
  /*  <Label htmlFor="inputIsInvalid">Input is invalid</Label>
   <Input type="text" invalid id="inputIsInvalid" />
   <FormFeedback>Houston, we have a problem...</FormFeedback> */
)
export const InlineField = ({ readOnly, input, label, type, meta: { touched, error } }) => ( 
    <FormGroup row >
      <Label sm={3} hidden={type === 'hidden' ? true : false || label == undefined || label == null} htmlFor="{label}">{label}</Label>
      <Col sm={9}><Input type={type} invalid={touched && error ? true : false} valid={touched && !error ? true : false} id="name" placeholder={label} {...input} readOnly={readOnly} />
      </Col>{touched && error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
)
export const SelectField = ({ readOnly, input, type,label,options, meta: { touched, error } }) => (
  <Col xs="12">
    <FormGroup>
      <Label hidden={type === 'hidden' ? true : false || label == undefined || label == null} htmlFor="{label}">{label}</Label>
      <Input type="select" invalid={touched && error ? true : false} valid={touched && !error ? true : false}  placeholder={label} {...input} readOnly={readOnly}>
     {
       options.map(option=>(<option >{option.text}</option>))
     }
     </Input>
      {touched && error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  </Col>
  /*  <Label htmlFor="inputIsInvalid">Input is invalid</Label>
   <Input type="text" invalid id="inputIsInvalid" />
   <FormFeedback>Houston, we have a problem...</FormFeedback> */
)
