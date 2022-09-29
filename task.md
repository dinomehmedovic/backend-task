
# Code Assignment

## Intro

This assignment will be used as a discussion during a technical interview.
Time constraints are part of software development and even though we don’t expect a perfect solution, imagine your code to be on its way to production.
If you have to make compromises, provide a README to briefly explain pros and cons of your approach, what considerations you would make for another iteration and in general what your
future colleagues might be interested in if they had to pick up your code.
The primary values for the code we look for are: simplicity, readability, maintainability, testability. It should be easy to scan the code, and rather quickly understand what it’s doing. Pay attention to naming.

The assignment should be done in NodeJS. You may choose between Javascript and Typescript.

## The Task

The assignment is to implement a very basic warehouse REST API. This API should hold products, and the product should contain an identification number, a name, a price and an available stock. It should be possible to load products into the software from a file, see the attached products.json.

The warehouse should have at least the following functionality;

* Get all products with a formatted price.
* Get a specific product with formatted price.
* Update the product stock.
* Create a product.
