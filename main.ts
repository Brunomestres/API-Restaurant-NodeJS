import { Server } from  './server/Server';
import { userRoutes } from  './users/users.router';

const server = new Server();

server.bootstrap([userRoutes]).then(server => {
    console.log('Server running on: ', server.application.address());
}).catch(error => {
    console.log('Server failed to start');
    console.log(error);
    process.exit(1);
});

