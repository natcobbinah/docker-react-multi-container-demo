# docker-react-multi-container-demo
A demo application using **React, NodeJS, PostgresDB, Redis, and Worker** services all linked through an **Nginx server**, which is used for managing routing from a web-browser to the application assets requested by the user, to demonstrate how **DOCKER multi-container** applications are wired and deployed to **AWS ElasticBeanStalk** instance through a CI/CD pipeline using **Travis-CI**

The application flow
1. A user submit a request in the **React-App** served by the Nginx server
2. The **Express Server** performs the necessary computations through its
API-endpoints, persists the data to the **PostgresDB**, and returns the response to the frontend.
3. The **Redis** in-memoryDB stores similar data as persisted to the postgresDB as key-value pairs.
4. The **Worker** watches Redis for new records, pulls each record, and 
performs necessary modifications to the data, and puts the new value 
back into Redis