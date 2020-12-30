import { Card, CardImg, CardText, CardBody, CardTitle, Form, FormGroup, Label, Breadcrumb, BreadcrumbItem, Button,  Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './some.css'
import React, {Component} from 'react';
// TASK 2--
import { Control, LocalForm, Errors } from 'react-redux-form'; 
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';
// TASK 3--
const maxLength  = (len) => (val) => !(val) || (val.length <= len);
const minLength  = (len) => (val) => (val) && (val.length >= len);


function RenderDish({ dish }) {
    return (
        <div className="col-12 col-md-5 m-1">
            <FadeTransform in transformProps={{
                exitTransform: 'scale(0.2) translateY(-50%)'
            }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
};

const RenderComments = ({ comments, postComment, dishId }) => {
    if (comments != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in >
                    {comments.map(comment => {
                        return (
                            <Fade in>
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit'
                                }).format(new Date(comment.date))}</p>
                                </li>
                            </Fade>
                        )
                    })}
                    </Stagger>
                    {/* TASK 1-- */}
                <CommentForm dishId ={dishId} postComment={postComment}/>
                </ul>
            </div>);
    else
        return (
            <div></div>
        );
}



//TASK 1---
class CommentForm extends Component {
    state = {
        isModalOpen: false,
        isError: null,
        blured: false
    };

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.ratings, values.author, values.comment);
    }

    render() {
        return (
            <div>
                <Button color="secondary" onClick={this.toggleModal}><span className="fa fa-pencil fa-md">Submit Content</span></Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={2}>First Name</Label>
                                    {/* {TASK 3--} */}
                                    <Col md={10}>
                                        <Control.text model=".author" className="form-control"  id="author" name="author" placeholder="First Name/Author" validators={{minLength: minLength(3), maxLength: maxLength(15)}}/>
                                        <Errors className="text-danger" model=".author" show="touched" messages={{minLength: 'Must be greater than 3 Characters', maxLength: 'Must be 15 Characters or less'}}/>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                    <Col md={10}>
                                        <Control.select model=".rating" className="form-control" id="rating" name="rating" placeholder="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="comment" md={2}>Comment</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".comment" className="form-control" rows="6"  id="comment" name="comment" placeholder="comments"/>
                                        <Errors className="text-danger" model=".telnum" show="touched" messages={{minLength: 'Must be greater than 6 numbers', maxLength: 'Must be 25 Numbers or less'}}/>
                                    </Col>
                                </Row>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
            </div>
        )
    }
}

const DishDetail = (props) => {
        if(props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        } else if(props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        } else if (props.dish !== null) {
            return (
                // TASK 2--
                <div className="container">
                    

                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                    </div> 
                </div>
            )
            } else {
                return (
                    <div></div>
                );
            }
}


export default DishDetail;