import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        const allItems = ["Anteater", "Bear", "Cat", "Dog", "Elephant"];
        this.state = {
            initaialItems: allItems,
            currentItems: allItems
        };
    }

    filterList = (input) => {
        let updatedList = this.state.initaialItems;
        updatedList = updatedList.filter(item => {
            return item.toLowerCase().search(input.target.value) !== -1;
        });
        this.setState({ currentItems: updatedList });
    }

    render() {
        return (
            <div><input type="text" placeholder="Search"
                onChange={this.filterList} />
                <ListItems items={this.state.currentItems} />
            </div>
        );
    }
};
class ListItems extends React.Component {
    render() {
        return (
            <ul> {this.props.items.map(item => {
                return <li key={item}> {item} </li>
            })} </ul>
        );
    }
};





export default Counter