import React, { Component } from "react";
import { render } from "react-dom";
import List from './List';

import JQuery from 'jquery';
window.$ = window.JQuery = window.jQuery = JQuery;

import 'typeahead.js';

const rootElement = document.getElementById("app");
render(<List listId={rootElement.dataset.listId} />, rootElement);
