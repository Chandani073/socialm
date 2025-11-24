import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import {inngest,functions} from './inngest/index.js'
const app = express();

// Wrap the connection in an async function
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    console.log('Database connected');

    app.use(express.json());
    app.use(cors());

    app.get('/', (req, res) => res.send('Server is running'));
    app.use("/api/inngest", serve({ client: inngest, functions }));

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error('Error starting server:', error.message);
  }
};

startServer();
