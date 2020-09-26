'use strict';

import React, { Component } from 'react';
import ListItem from './ListItem';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        }

        this.toggleItem = this.toggleItem.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/lists/1/items")
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    items: result
                })
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                alert('something went wrong')
            }
          )
      }


    toggleItem(event) {
        let itemId = event.target.attributes['data-id'].value;

        let idx = this.state.items.findIndex(item => item.id == itemId);
        let updatedItems = this.state.items;
        updatedItems[idx].done = !updatedItems[idx].done;

        this.setState({
            items: updatedItems
        });
    }

    render() {
        const pendingListItems = this.state.items.filter((item)=> !item.done).map((item)=>
            <ListItem data={item} toggle={this.toggleItem}/>
        );

        const doneListItems = this.state.items.filter((item)=> item.done).map((item)=>
            <ListItem data={item} toggle={this.toggleItem}/>
        );

        return (
            <section>
                <ul className='list-unstyled'>
                    {pendingListItems}
                </ul>
                <hr></hr>
                <ul className='list-unstyled'>
                    {doneListItems}
                </ul>
            </section>
        );
    }
}

export default List;