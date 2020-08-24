'use strict';

import React, { Component } from 'react';
import ListItem from './ListItem';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items
        }

        this.toggleItem = this.toggleItem.bind(this);
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
                <ul className='list-unstyled'>
                    {doneListItems}
                </ul>
            </section>
        );
    }
}

export default List;