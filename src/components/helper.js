import { Card, CardImg, CardText, CardBody, CardTitle, Form, FormGroup, Label, Input, Breadcrumb, BreadcrumbItem, Button,  Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './some.css'
import React, {Component} from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';


function RenderDish({ dish }) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image} alt={dish} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
};

//TASK 1
class CommentForm extends Component{
    render() {
        return (<Button color="secondary" onClick={this.toggleModal}><span className="fa fa-pencil fa-md">Submit Content</span></Button>)
    }
}
    

class DishDetail extends Component {
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
//innerRef is used to pull out the value so it can be read across the component. ++New for Me++
handleLogin = (event) => {
    this.toggleModal();
    alert(`Username: ${this.username.value} and Passowrd: ${this.password.value} Remember: ${this.remember.checked}`);
    event.preventDefault();
}

handleError = (event) => {
    if(event.target.value.length <= 2 && event.target.value.length > 0){
        this.setState({isError: 'Field must be atleast 2 characters'})
    } else if(event.target.value.length >=15 && event.target.value.length > 0) {
        this.setState({isError: 'Field must be less than 15 characters'})
    } else {
        this.setState({isError: ''})
    }
}

handleBlur = (event) => {
    if(event.target.value.length === 0){
        this.setState({isError: 'Field must be atleast 2 characters'})
    }
}


//TASK 1
RenderComments = ({ comments }) => {
    if (comments != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map(comment => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author}</p>
                            </li> );
                    })}
                   <CommentForm></CommentForm>
                </ul>
            </div>);
    else
        return (
            <div></div>
        );
}

render() {
    if (this.props.dish !== null)
        return (
            <div className="container">

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                            <Label for="exampleSelect">Rating</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your Name</Label>
                                <Input type="text" onBlur={this.handleBlur} onChange={this.handleError} id="name" name="name" innerRef={(input) => this.password = input}/>
                                {<p style={{color: 'red'}}>{this.state.isError}</p>}
                            </FormGroup>
                            <FormGroup> 
                                <Label for="exampleText">Comment</Label>
                                <Input type="textarea" style={{resize: 'none', height: '150px'}}name="text" id="exampleText" innerRef={(input) => this.password = input}/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={this.props.dish} />
                    <this.RenderComments comments={this.props.comments} />
                </div>
                
            </div>
        )
    else
        return (
            <div></div>
        );
    }
}

export default DishDetail;