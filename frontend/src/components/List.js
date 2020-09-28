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
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        fetch(`/api/lists/${this.props.listId}/items`)
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

        fetch(`/api/lists/${this.props.listId}/items/${itemId}/toggle`)
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

    handleChange(event) {
        const data = {
            newItemDescription: event.target.value
        }

        if(event.key == 'Enter' && data['newItemDescription'].length) {
            fetch(`/api/lists/${this.props.listId}/items`, {
                method: 'POST',
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(result => {
                    this.setState({
                        items: result
                    })
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            
            event.target.value = ''
        }
    }

    render() {
        const pendingListItems = this.state.items.filter((item)=> !item.done && item.active).map((item)=>
            <ListItem data={item} toggle={this.toggleItem}/>
        );

        const doneListItems = this.state.items.filter((item)=> item.done && item.active).sort().map((item)=>
            <ListItem data={item} toggle={this.toggleItem}/>
        );

        return (
            <section>
                <h1 class="my-4">List name</h1>
                <div class='form-group'>
                    <input type="text" placeholder="Add New Item" class='form-control' onKeyDown={this.handleChange} ></input>
                </div>
                <ul className='list-unstyled'>
                    {pendingListItems}
                </ul>
                <ul className='list-unstyled'>
                    {doneListItems}
                </ul>
            </section>
        );
    }
}

export default List;
