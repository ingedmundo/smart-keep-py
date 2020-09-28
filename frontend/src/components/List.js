'use strict';

import React, { Component } from 'react';
import ListItem from './ListItem';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            title: ''
        }

        this.toggleItem = this.toggleItem.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        fetch(`/api/lists/${this.props.listId}`)
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    title: result.description
                })
            })

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
            <ListItem key={item.id} data={item} toggle={this.toggleItem}/>
        );

        const doneListItems = this.state.items.filter((item)=> item.done && item.active).sort().map((item)=>
            <ListItem key={item.id} data={item} toggle={this.toggleItem}/>
        );

        let budget = 0.0;
        
        this.state.items.filter((item)=> !item.done && item.active).map((item)=>
            budget += parseFloat(item.cost)
        );

        return (
            <section>
                <h1 className="text-center my-2">{this.state.title}</h1>
                <h2 className="text-center my-2">${budget}</h2>
                <div className='form-group'>
                    <input type="text" placeholder="Add New Item" className='form-control' onKeyDown={this.handleChange} ></input>
                </div>
                <ul className='list-unstyled'>
                    {pendingListItems}
                </ul>
                <ul className='list-unstyled' id='list__items--done'>
                    {doneListItems}
                </ul>
            </section>
        );
    }
}

export default List;
