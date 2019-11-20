import React, {useState, useEffect} from "react"
import SearchInput from "./SearchInput";
import Carousel from "./CarouselSlides";
import {Container, Row, Col} from "reactstrap"
import CompanyDetails from "./CompanyDetails";
import Pagination from "./Pagination";

function Search({match}) {

    /*match.params."name"*/

    const [companiesSearch, setCompaniesSearch] = useState([]);
    const [topcompanies, setTopCompanies] = useState([]);

    const [total_results, setResults] = useState(0);

    const [searchInputs, setSearchInputs] = useState({
        name: '',
        city: '',
    });


    const addSearchInputs = async (name, city) => {
        console.log("AddSearchInputs");
        setSearchInputs ({...searchInputs,'name':name,'city':city});
    };

    useEffect(() => {
            fetchCompaniesBySearch();
        }, [searchInputs]
    );





    const fetchCompaniesBySearch = async (offset=0) => {
        console.log("Fetch companies by Search");
        console.log("OFFSET"+offset);

        let url = "";
        if (searchInputs.name && searchInputs.city) {
            url = "http://localhost:5000/companies/?offset="+offset+"&name=" + searchInputs.name + "&city=" + searchInputs.city;
        } else {
            url = "http://localhost:5000/companies/?offset="+offset;
        }

        console.log("url" + url);
        const data = await fetch(url);
        const newCompanies = await data.json();
        console.log(newCompanies);
        setCompaniesSearch(newCompanies.Data);
        await setResults(newCompanies.Total);
    };






    const fetchTopCompanies = async () => {
        const data = await fetch("http://localhost:5000/companies/?offset=limit=3&order=count|desc", {
            method: 'GET',

        });
        const newCompanies = await data.json();
        console.log(newCompanies);
        setTopCompanies(newCompanies.Data);
        await setResults(newCompanies.Total);

    };

    useEffect(() => {
            fetchCompaniesBySearch();
            fetchTopCompanies()
        }, []
    );


    return (

        <div>
            <SearchInput fetchCompaniesBySearch={fetchCompaniesBySearch.bind(this)}
                         addSearchInputs={addSearchInputs}/>
            <Carousel companies={topcompanies}/>
            <Container>
                <Row>
                    <Col xs={8}>
                        <CompanyDetails companies={companiesSearch}/>
                    </Col>

                    <Col xs={4}>

                    </Col>
                </Row>
                <Pagination fetchCompaniesBySearch={fetchCompaniesBySearch.bind(this)} total={total_results}
                            setResults={setResults.bind(this)}/>

                <Row>
                   {/* <h1>
                        {JSON.stringify(total_results
                        )}
                    </h1>*/}
                </Row>
            </Container>
        </div>
    )

}

export default Search