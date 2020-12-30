import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderDish(props) {

    if (props.selectedDish !== null) {
        const dish = props.dish;
        let comments = dish.comments.map((item, i) => {
            return (
                <p key={i}>
                    <li className="m-1">
                        {item.comment}
                        <br />
                        <br />
                        --{item.author} {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(Date.parse(item.date)))}
                    </li>
                </p>
            )
        })
        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {comments}
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        );
    }
}

export default RenderDish;