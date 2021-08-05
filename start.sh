docker build -t tic-tac-five-backend ./backend
docker build -t tic-tac-five-frontend ./frontend
echo "BASE_IP=$(ipconfig getifaddr en0)" > .env
docker-compose up
