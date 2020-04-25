import { Server } from  './server/Server';


const server = new Server();

server.bootstrap().then(server => {
    console.log('Server running on: ', server.application.address());
}).catch(error => {
    console.log('Server failed to start');
    console.log(error);
    process.exit(1);
});

