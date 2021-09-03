# ShopBridge Inventory Management

A simple front-end coding exercise.

## Overview


Presents data of the format:
```
const itemSchema = {
  type: "object",
  required: ["name", "price", "quantity"],
  properties: {
    name: {type: "string"},
    price: {type: "number"},
    quantity: {type: "integer"},
  }
}
```

Allows the following actions:

- add item
- delete item
- edit item

## Screenshots
![screenshot](https://imgur.com/5cdS5XK.png)

## Getting started

A mock api is provided, simply:
```
yarn install
yarn start
```
Or try it on [gh-pages](https://yashkir.github.io/shopbridge/).

## Development Notes

|Task|Time|
|----|----|
|Frontend Functional| 2-3 hours|
|Frontend Presentational| 2 hours|
|Required Validations| 1 hour|
|Unit Test Coverage| 30min|

Initially I attempted to migrate to 'material-ui' and its 'datagrid'
component. It turned out to be overkill for the task and I went back
to plain React.

Choosing to use `<table>` versus some kind of grid was in retrospect
a limiting choice in terms of how rows could be styled and presented.

In the past I used a validation library such as `Ajv`. In this case I
hand-rolled a few validators as I had not done it before.

## Roadmap

- simplify duplicate code for 'AddItem' and Edit forms
- simplify validation, perhaps in a custom 'Input' component
- add more tests (especially of forms)
