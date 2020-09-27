import React, { Component } from "react";
import { render } from "react-dom";
import List from './List';

const rootElement = document.getElementById("app");
render(<List listId="1"/>, rootElement);
