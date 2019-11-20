import React, {useState, useEffect} from "react"
import { Button, Container} from "reactstrap"


function Pagination(props) {

    const per_page=3;

    const [total,setTotal]=useState(props.total);

    useEffect( () => {
        console.log("First definiting of total");
            setTotal(props.total);
        }, [props.total]
    );

    const pageNumbers = [];

    const [buttons, setButtons] = useState([]);
    const calculate_page_numbers = () => {
        for (let i = 1; i <= Math.ceil(total / per_page); i++) {
            console.log("Total"+total);
            pageNumbers.push(i -1);
        }
    };


    const renderPageNumbers = () => {
        return setButtons(pageNumbers.map(number => {
            return (
                <Button key={number} onClick={props.fetchCompaniesBySearch.bind(this,number*per_page)}>
                    {number+1}
                </Button>
            )
        }));
    };

    useEffect( () => {
        console.log("set total and calculate");
            setTotal(props.total);
            calculate_page_numbers();
            renderPageNumbers();
        }, [total]
    );




    return (
        <Container>
            {buttons}
        </Container>
    );
}

export default Pagination