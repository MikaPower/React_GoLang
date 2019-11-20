import React, {useState, useEffect} from "react"
import {Row, Col} from "reactstrap"
import axios from "axios";
import Container from "reactstrap/lib/Container";


function CompanyDetail({match}) {

    const [count, setCount] = useState(0);
    const [company, setCompany] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendUpdatedCompany = async e => {
        console.log(match.params.id);
        console.log("URL OF PUT:" + "http://localhost:5000/companies/" + match.params.id);
        console.log("company count"+ JSON.stringify(company));
        let form = {count:company.count +1};
        await axios.put('http://localhost:5000/companies/' + match.params.id, form).then((response) => {
            console.log(JSON.stringify(response));
            setCount(response.data.count);
        }).catch((error) => {
            // Error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the
                // browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    };

    useEffect(() => {
            fetchCompanies();
        }, []
    );


    useEffect(() => {
            sendUpdatedCompany();
        }, [company]
    );

    const fetchCompanies = async () => {
        console.log("http://localhost:5000/companies/" + match.params.id);
        const data = await fetch("http://localhost:5000/companies/" + match.params.id);
        const newCompanies = await data.json();
        await setCompany(newCompanies);
        setLoading(false);
    };


    return (
        <Container>
            <Row>

                <Col xs={3}>
                    <span> Empresa: {loading ? "loading":company.name  }</span>
                </Col>
                <Col xs={3}>
                    <span> Count antigo: {loading ? "loading":company.count }</span>
                </Col>

                <Col xs={3}>
                    <span> Count novo: {count}</span>
                </Col>

               <Col xs={3}>
                   <span> {company.name}</span>
               </Col>
            </Row>
        </Container>
    );
}

export default CompanyDetail