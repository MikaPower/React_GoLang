import React, {Component,useEffect,useState} from "react"
import {Container, Row, Col, Form, FormGroup, Label, Input, FormText, Button} from "reactstrap"
import axios from 'axios'

function NewCompany(props) {

    const [form, setValues] = useState({
        name: '',
        cellphone: '',
        address: '',
        postal_code: '',
        parish: '',
        count:0,
    });

    const updateField = e =>{

        setValues({
            ...form,[e.target.name]: e.target.value
        });
        console.log("EEE"+e);
    };

    const createCompany = async e =>{
       console.log(form.id,form['ID']);
       await axios.post( 'http://localhost:5000/companies/',form).then((response) =>{
           console.log(response.error);
           form['ID']= response.data.ID;
           props.addCompany(form);
           clearFields();
        })
    };

    const clearFields = e =>{
       let newform= {name: '',
            cellphone: '',
            address: '',
            postal_code: '',
            parish: '',};
    setValues({...newform})
    };

    return (
        <Container className="mb-5">
            <Row>
                <Form className="w-100">
                    <Row>
                        <Col xs={6}>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>Nome</Label>
                                <Col sm={10}>
                                    <Input type="text" name="name" id="name" value={form.name} onChange={updateField} placeholder="with a placeholder"/>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>Telefone</Label>
                                <Col sm={10}>
                                    <Input type="text" name="cellphone" id="cellphone" value={form.cellphone} onChange={updateField}
                                           placeholder="with a placeholder"/>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>Morada</Label>
                                <Col sm={10}>
                                    <Input type="text" name="address" id="address" value={form.address} onChange={updateField} placeholder="with a placeholder"/>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>Código Postal</Label>
                                <Col sm={10}>
                                    <Input type="text" name="postal_code" value={form.postal_code} onChange={updateField} id="postal_code"
                                           placeholder="with a placeholder"/>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>Freguesia</Label>
                                <Col sm={10}>
                                    <Input type="text" name="parish" value={form.parish} onChange={updateField} id="parish"
                                           placeholder="with a placeholder"/>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-end">
                        <Col xs="2">
                            <Button onClick={createCompany}>
                                Criar
                            </Button>
                        </Col>

                        <Col xs="2">
                            <Button onClick={clearFields}>
                                Reset
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    );

}

export default NewCompany