# Flashcards

Flashcards is a React application developed as part of the Thinkful Software Engineering program. The project demonstrates practical use of React application patterns, RESTful API integration, routing, state management, and a one-to-many data model.

## Application Overview

The application allows users to create and manage decks of flashcards and use those decks in an interactive study workflow. Each deck can contain multiple cards, with each card providing a front and back view.

Key functionality includes:

* Create, view, edit, and delete decks
* Create, edit, and delete cards within a deck
* Navigate between decks and cards using parameterized routes
* Study cards interactively by flipping between front and back views
* Progress sequentially through a deck during a study session
* Restart a deck after completing a study session
* Persist deck and card data through a RESTful API

## Technical Implementation

The application was built using:

* **React** with functional components and hooks
* **React Router** for navigation and parameterized routes
* **RESTful API calls** for deck and card CRUD operations
* **JSON Server** to provide the REST API and persistent data model
* **Bootstrap** for application layout and styling
* **Jest and React Testing Library** for automated testing

The application uses React state and effects to coordinate UI behavior with asynchronous API operations. Decks and cards form a one-to-many relationship, with application routes and API operations maintaining the relationship between each deck and its associated cards.

## Thinkful Project Context

This application was completed as part of the Thinkful Software Engineering curriculum. The project requirements defined the expected user workflows and functionality, while the application implementation demonstrates the React, routing, state-management, and REST API techniques covered during the program.
