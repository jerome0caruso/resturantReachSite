import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }  
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstName, lastName, tel, agree, contact, message) => dispatch(postFeedback(firstName, lastName, tel, agree, contact, message)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => { dispatch(fetchLeaders())}
});


class Main extends Component {
 
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
  
  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter(promo => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leaders={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    }
    //Route Parameters!
    // Match is a parameter from the Route from line 53 (location + history are the to others that route auto passes)
    const DishWithId = ({ match }) => {
      //grabs the match params(which is set on line 56 "menu/:dishId") and in MenuComponent (<Link to={`/menu/${dish.id}`} >)
      //this come in as a string so parseInt is used to convert to base10 and selects the value of the first index
      return (
        <DishDetail
         dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
         isLoading={this.props.dishes.isLoading}
         errMess={this.props.dishes.errMess}
         comments={this.props.comments.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
         commentsErrMess={this.props.comments.errMess}
         postComment={this.props.postComment}
        />
      )
    }
    return (
      <div className="App">
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
              <Route path="/contactus" component={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm}/>} />
              <Route path="/home" component={HomePage} />{/* if adding props with route must go through ann Fn's like shown here*/}
              <Route path="/aboutus" component={() => <About leaders={this.props.leaders} leadersLoading={this.props.leaders.isLoading} leadersErrMess={this.props.leaders.errMess} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Redirect to="/home" /> {/* if nothing matches the routes */}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
