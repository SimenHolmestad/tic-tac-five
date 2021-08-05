# Tic-tac-five
A game for playing 5 in a row with your friends at home. The rules are the same as for normal tic-tac-toe, but now the board is much larger! Play on one device or online on multiple devices! 

![Tic-tac-five screenshot](docs/frontend-screenshot.png)

More info on the backend can be found [here](backend/readme.md) and more info on the frontend can be found [here](frontend/readme.md).

Currently, the app has no authentication whatsoever.

# Running the app
To run the application, first make sure you have docker installed and running. On mac, this can be done by doing:

``` sh
brew install --cask docker
```

Before launching the docker appliaction.

When docker is installed, build the backend by doing:

``` sh
docker build -t tic-tac-five-backend ./backend
```

Build the frontend by doing:

``` sh
docker build -t tic-tac-five-frontend ./frontend
```

Then run the whole thing by doing:

``` sh
docker-compose up
```

You should now have the app running at `http://localhost:3000`
