'use strict';

import React, { Component } from 'react';
import ListItem from './ListItem';

var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
        // an array that will be populated with substring matches
        let matches = [];
        // regex used to determine if a string contains the substring `q`
        let substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
        });

        cb(matches);
    };
};

var sortDescription = function(a, b) {
    var descriptionA = a.description.toUpperCase(); // ignore upper and lowercase
    var descriptionB = b.description.toUpperCase(); // ignore upper and lowercase
    if (descriptionA < descriptionB) {
      return -1;
    }
    if (descriptionA > descriptionB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  }

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

                $('#newItem').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                }, { name: 'items', source: substringMatcher(result.map((i)=> i.description)) });
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

                this.setState({ items: updatedItems })
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
                }, (state, props) => {
                    $('#newItem').typeahead('close');
                    $('#newItem').typeahead('val', null);
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });
            
        }
    }



    render() {
        const pendingItems = this.state.items.filter((item)=> !item.done && item.active).sort(sortDescription)
        const doneItems = this.state.items.filter((item)=> item.done && item.active).sort(sortDescription)

        const pendingListItems = pendingItems.map((item)=>
            <ListItem key={item.id} data={item} toggle={this.toggleItem}/>
        );

        const doneListItems = doneItems.map((item)=>
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
                    <input type="text" id="newItem" placeholder="Add New Item" className='form-control' onKeyDown={this.handleChange} ></input>
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
