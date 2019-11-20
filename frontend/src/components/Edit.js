import React, {Component, useState, useEffect} from "react"
import {
    Row,
    Col,
    Container,
    Button,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label
} from "reactstrap";
import axios from 'axios'

function Edit(props) {

    const mystyle = {
        backgroundColor: 'black',
        color: 'white',
        borderLeft: '2px solid white',
        borderRight: '2px solid white'
    };


    console.log(props.companies);
    setTimeout(function () {
        //your code to be executed after 1 second
    }, 3000);


    const editCompany = (id, name, address) => {
        toggle();
        setCompanyData({...companyData, 'id': id, 'name': name, 'address': address})
    };

    const [companyData, setCompanyData] = useState({
        id: '',
        name: '',
        address: '',
    });

    const updateModalField = e => {

        setCompanyData({
            ...companyData, [e.target.name]: e.target.value
        });
    };

    const sendUpdatedCompany = async e => {
        toggle();
        console.log(companyData.id);
        console.log("URL OF PUT:" + "http://localhost:5000/companies/" + companyData.id);
        await axios.put('http://localhost:5000/companies/' + companyData.id, companyData).then((response) => {
            props.updateCompanyState(response.data);
            clearFields();
        })
    };

    const clearFields = e => {
        console.log("Clear fields");
        let newform = {
            id: '',
            name: '',
            address: ''
        };
        setCompanyData({...newform})
    };


    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    let openmodal = <div>
        <Modal isOpen={modal} toggle={toggle} className="nothing">
            <ModalHeader toggle={toggle}>Editar empresa</ModalHeader>
            <ModalBody>
                <Row className="justify-content-center">
                    <FormGroup className="w-75">
                        <Label for="exampleEmail">Nome</Label>
                        <Input type="text" name="name" id="new_name" value={companyData.name}
                               placeholder="with a placeholder" onChange={updateModalField}/>
                    </FormGroup>

                    <FormGroup className="w-75">
                        <Label for="exampleEmail">Endereço</Label>
                        <Input type="text" name="address" id="new_address" value={companyData.address}
                               placeholder="with a placeholder" onChange={updateModalField}/>
                    </FormGroup>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={sendUpdatedCompany.bind(this)}>Actualizar</Button>{' '}
                <Button color="secondary" onClick={toggle}>Fechar</Button>
            </ModalFooter>
        </Modal>
    </div>;


    let company = props.companies.map(company => (
        <Row key={company.ID} className="pb-1">
            <Col xs={3} style={mystyle}>
                <a href={"companies/"+company.ID}>
                <span style={{color:'white'}}>{company.name}</span>
                </a>
            </Col>
            <Col xs={3} style={mystyle}>
                <span>{company.address}</span>
            </Col>
            <Col xs={2} style={mystyle}>
                <span>{company.postal_code}</span>
            </Col>
            <Col xs={2} style={mystyle}>
                <span>{company.parish}</span>
            </Col>
            <Col xs={2} style={mystyle}>
                <Row className="justify-content-center">
                    <Button className="mr-2" onClick={props.deleteCompany.bind(this, company.ID)}>
                        <i className="fas fa-trash"/>
                    </Button>
                    <Button onClick={editCompany.bind(this, company.ID, company.name, company.address)}
                            style={{backgroundColor: "white", color: "black"}}>Editar</Button>

                </Row>

            </Col>
        </Row>
    ));


    return (
        <Container>
            <Row>
                <Col xs={3} style={mystyle}>
                    <span>Nome</span>
                </Col>
                <Col xs={3} style={mystyle}>
                    <span>Morada</span>
                </Col>
                <Col xs={2} style={mystyle}>
                    <span>Codigo Postal</span>
                </Col>
                <Col xs={2} style={mystyle}>
                    <span>Freguesia</span>
                </Col>
                <Col xs={2} style={mystyle}>
                    <span>Editar/Apagar</span>
                </Col>
            </Row>
            {company}
            {openmodal}
        </Container>
    )

}

export default Edit