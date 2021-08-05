import cors from 'cors';
import express from 'express';
import gameRouter from "./routes/gameRoutes";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL)
  // tslint:disable-next-line:no-console
  console.log("--------\n\nOn your local network, the frontend is running on " + process.env.FRONTEND_URL + "\n\n--------");
}

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(corsOptions));

app.use('/api', gameRouter);

export default app;
