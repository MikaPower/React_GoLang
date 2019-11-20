import React from "react"
import {Row, Col} from "reactstrap"

function CompanyDetails(props) {


    let companies = props.companies.map(company => (
        <Row key={company.ID}>
            <Col xs={8}>
                <Row className="mx-0 mb-2 ">
                    <span>{company.name} / {company.address} / {company.cellphone}</span>
                </Row>

                <Row className="mx-0 mb-2 text-left">
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean malesuada, ex cursus egestas
                          placerat, tortor odio suscipit augue, quis egestas nunc ante sit amet velit. Phasellus cursus
                          tellus ligula, vitae suscipit magna luctus vitae. Integer eu accumsan lorem, nec malesuada
                          lacus. Etiam rhoncus placerat</span>
                </Row>

                <Row className="mx-0 mb-2">
                    <span>http://www.blahblah.com
                    </span>
                </Row>
            </Col>

            <Col xs={4}>
                <Row className="mx-0 mb-2">
                    <i className="far fa-envelope"/>
                </Row>

                <Row className="mx-0 mb-2">
                    <i className="fas fa-phone-square-alt"/>
                </Row>
            </Col>
        </Row>
    ));


    return (
        <div>
            {companies}
        </div>
    );
}

export default CompanyDetails