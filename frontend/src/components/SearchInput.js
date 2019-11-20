import React,{useState} from "react"
import {Container, Row, Col, FormGroup, Label, Input, Form,Button} from "reactstrap"


function SearchInput(props) {

    const [form, setValues] = useState({
        name: '',
        city: '',
    });

    const updateField = e =>{
        setValues({
            ...form,[e.target.name]: e.target.value
        });
    };

    return(
        <Container className="my-5">
            <Row>
                <Form className="w-100">
                    <Row className="justify-content-center">
                        <Col xs={4}>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>Nome</Label>
                                <Col sm={10}>
                                    <Input type="text" name="name" id="name" value={form.name} onChange={updateField} placeholder="Nome"/>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col xs={4}>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={2}>em</Label>
                                <Col sm={10}>
                                    <Input type="text" name="city" id="city" value={form.city} onChange={updateField} placeholder="cidade"/>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col xs={2}>
                            <Button onClick={props.addSearchInputs.bind(this,form.name,form.city)}>
                                Procurar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    )
}

export default SearchInput