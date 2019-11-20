import React, {useState, useEffect} from "react"
import NewCompany from "./NewCompany";
import Edit from "./Edit";
import axios from "axios";
import Pagination from "./Pagination";
import Container from "reactstrap/lib/Container";
import {Button} from "reactstrap"

function Home() {


    const [companies, setCompanies] = useState([]);

    const [total_results, setResults] = useState(0);

    const fetchCompanies = async (offset = 0) => {
        console.log("http://localhost:5000/companies/offset=" + offset);
        const data = await fetch("http://localhost:5000/companies/?offset=" + offset);
        const newCompanies = await data.json();
        console.log(newCompanies);
        await setCompanies(newCompanies.Data);
        await setResults(newCompanies.Total);

    };

    const updateCompanyState = company => {
        console.log("UpdateCompany");
        companies.forEach((old_company,index) =>{
            if(old_company.ID===company.ID){
                delete companies[index];
                companies[index]=company;
                console.log("Position of deleted array:"+index);
                setCompanies([...companies]);
            }
        });
    };

    useEffect(() => {
            fetchCompanies();
        }, []
    );


    const deleteCompany = (id) => {
        axios.delete('http://localhost:5000/companies/' + id).then((response) => {
            console.log(id);
            setCompanies(companies.filter(company => company.ID !== id));
            setResults(prevState => prevState - 1);
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

   /* const updateCompany = (e, key) => {
        let id = key;
        let indexObject = 0;
        axios.put('http://localhost:5000/companies/' + id, {
            body: JSON.stringify({
                [e.event.target]: e.target.name,

            })
        }).then((response) => {
            companies.filter((company, index) => {
                if (company.id === id) {
                    indexObject = index
                }
                return indexObject
            });
            console.log(companies[indexObject]);
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
    };*/

    const addCompany = (company) => {
        console.log("addCompany");
        console.log(company);
        setResults((prevCount => prevCount + 1));
        if (companies.length < 3) {
            companies.push(company);
            console.log("lenght" + companies.length);
            setCompanies([...companies]);
        }

    };


    return (
        <Container className="h-100 vh-100 d-flex flex-column justify-content-center align-items-center">
            <NewCompany setCompanies={setCompanies} addCompany={addCompany.bind(this)}/>
            <Edit companies={companies}
                  deleteCompany={deleteCompany.bind(this)} updateCompanyState={updateCompanyState.bind(this)}/>
            <Pagination fetchCompaniesBySearch={fetchCompanies.bind(this)} total={total_results}
                        setResults={setResults.bind(this)}/>
        <Button>
            <a style={{color: "white"}} href={"/search"}>
            Pesquisa
            </a>
        </Button>
        </Container>
    );
}

export default Home