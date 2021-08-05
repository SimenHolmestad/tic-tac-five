# Tic-tac-five frontend
This project is made as a frontend for playing games of 5 in a row with [this backend](https://github.com/SimenHolmestad/tic-tac-five). It can be used to play games on one machine or on multiple machines (using the same url).

![Tic-tac-five screenshot](http://folk.ntnu.no/simehol/images/tic-tac-five.png)

The frontend provides a way of viewing the games which are currently not finished, create a new game or enter an already existing game. It is possible to enter the game as the X-player, the O-player, both players (for playing on a single computer) or as an observer.

## How to setup the project
First make sure you have the backend running. Instructions on how to do this can be found [here](https://github.com/SimenHolmestad/tic-tac-five). Then clone this repository and create a new file at the top level called `.env.local`. In this file, put the url leading to the backend. If the backend is running on your localhost, the content of the file should be:
```
REACT_APP_API_URL=http://localhost:8080
```
Finally, do `npm install` and `npm start` to run the project.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
