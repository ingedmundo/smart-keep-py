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
        fetch(`http://localhost:8000/api/lists/${this.props.listId}/items`)
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    items: result
                })
            },
            (error) => {
                alert('something went wrong')
            }
          )
      }


    toggleItem(event) {
        let itemId = event.target.attributes['data-id'].value;

        fetch(`http://localhost:8000/api/lists/${this.props.listId}/items/${itemId}/toggle`)
          .then(res => res.json())
          .then(
            (result) => {
                let idx = this.state.items.findIndex(item => item.id == itemId);
                let updatedItems = this.state.items;
                updatedItems[idx].done = !updatedItems[idx].done;

                this.setState({
                    items: updatedItems
                });
            })
    }

    render() {
        const pendingListItems = this.state.items.filter((item)=> !item.done && item.active).map((item)=>
            <ListItem data={item} toggle={this.toggleItem}/>
        );

        const doneListItems = this.state.items.filter((item)=> item.done && item.active).map((item)=>
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