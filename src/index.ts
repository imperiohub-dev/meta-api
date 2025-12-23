import express, { Request, Response, NextFunction } from 'express';}}}}
const app = express();}}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));}}}}

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to meta-api API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Import routes
// import userRoutes from './routes/user.routes';
// app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});}/\nimport cors from 'cors';}}/\nimport dotenv from 'dotenv';}}/\ndotenv.config();}}/\napp.use(cors());}}/}
