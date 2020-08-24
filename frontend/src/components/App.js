import React, { Component } from "react";
import { render } from "react-dom";
import List from './List';

const rootElement = document.getElementById("app");
let listItems = [   {id: 1, description: 'item1', cost: 9.99, done: false},
                    {id: 2, description: 'item2', cost: 9.99, done: false},
                    {id: 3, description: 'item3', cost: 9.99, done: false},
                    {id: 4, description: 'item4', cost: 9.99, done: false},
                    {id: 5, description: 'item5', cost: 9.99, done: false},
                    {id: 6, description: 'item6', cost: 9.99, done: true},
                    {id: 7, description: 'item7', cost: 9.99, done: true},
                ]

render(<List items={listItems} />, rootElement);
