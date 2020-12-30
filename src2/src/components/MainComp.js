import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './helper';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import About from './AboutComponent';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render() {
    const HomePage = () => {
      return (
        <Home dish={this.state.dishes.filter(dish => dish.featured)[0]}
          promotion={this.state.promotions.filter(promo => promo.featured)[0]}
          leader={this.state.leaders.filter(leader => leader.featured)[0]}
        />
      );
    }
    //Route Parameters!
    // Match is a parameter from the Route from line 53 (location + history are the to others that route auto passes)
    const DishWithId = ({ match }) => {
      //grabs the match params(which is set on line 56 "menu/:dishId") and in MenuComponent (<Link to={`/menu/${dish.id}`} >)
      //this come in as a string so parseInt is used to convert to base10 and selects the value of the first index
      return (
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]} comments={this.state.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))} />

      )

    }
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Route path="/contactus" component={Contact} />
          <Route path="/home" component={HomePage} />{/* if adding props with route must go through ann Fn's like shown here*/}
          <Route path="/aboutus" component={() => <About leaders={this.state.leaders} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Redirect to="/home" /> {/* if nothing matches the routes */}
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default Main;
