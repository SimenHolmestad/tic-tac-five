# Tic-tac-five
A game for playing 5 in a row with your friends at home. The rules are the same as for normal tic-tac-toe, but now the board is much larger! Play on one device or online on multiple devices! 

![Tic-tac-five screenshot](docs/frontend-screenshot.png)

More info on the backend can be found [here](backend) and more info on the frontend can be found [here](frontend).

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

Next, you should create a file named `.env` setting the `BASE_IP` variable (the local IP address). The content of the `.env` file can for example be:

```
BASE_IP=10.0.0.42
```

Alternatively, if you're on a mac (or possibly linux), you can run the following command to create the correct `.env` file:

``` sh
echo "BASE_IP=$(ipconfig getifaddr en0)" > .env
```

When the `.env` file is in place, run the whole app by doing:

``` sh
docker-compose up
```

The app should now run on your local IP address so you can access it from devices on the same network.
