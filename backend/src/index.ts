import app from './app';
import mongoose from 'mongoose';

// Connect to the database
// const url = 'mongodb://127.0.0.1:27017/tic-tac-five';
const url = 'mongodb://mongodb_container:27017/tic-tac-five';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', _ => {
    // tslint:disable-next-line:no-console
    console.log('Database connected:', url);
});

db.on('error', err => {
    // tslint:disable-next-line:no-console
    console.error('connection error:', err);
});

const port = process.env.PORT || 8080; // Set the port

app.listen(port);
// tslint:disable-next-line:no-console
console.log('Listening for requests on port ' + port);
