import express from 'express';
import cors from 'cors';
import routes from './routes';

const allowedOrigins = [
    'http://localhost:5173',

];
const deployedUrl = process.env.RAILWAY_PUBLIC_DOMAIN
if (deployedUrl) {
    allowedOrigins.push(deployedUrl);
}

console.log(`allowedOrigins: ${allowedOrigins}`)

const server = express();
server.use(cors({
    origin: allowedOrigins
}
));

// you can set up express to hoast static files
server.use(express.static('deployment-sample-frontend/dist'));

server.use(express.json());

server.use(routes);

export default server;
