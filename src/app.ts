import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connect } from './config/db';
import propertyRoutes from './modules/property/property.routes';
import userRoutes     from './modules/user/user.routes';
import blogRoutes     from './modules/blog/blog.routes';
import contentRoutes  from './modules/content/content.routes';
import mediaRoutes    from './modules/media/media.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();
connect();

app.use(morgan('dev'));
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/properties', propertyRoutes);
app.use('/api/users',      userRoutes);
app.use('/api/blogs',      blogRoutes);
app.use('/api/content',    contentRoutes);
app.use('/api/media',      mediaRoutes);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;