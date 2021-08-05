import cors from 'cors';
import express from 'express';
import gameRouter from "./routes/gameRoutes";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'http://10.0.0.126:3000'
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(corsOptions));

app.use('/api', gameRouter);

export default app;
