
![Logo](https://res.cloudinary.com/dwxujoxc7/image/upload/v1674098385/project2/center.-removebg-preview_dxnbc2.png)


# Backend Haya Coffee

This is the backend for an online food and drink ordering platform. The platform allows customers to browse and order from a menu of delicious dishes and refreshing drinks. The backend is responsible for handling all requests from the frontend and communicating with the database to retrieve and update information.


## Tech Stack

**Client:** React, Redux, Bootstrap

**Server:** Node.js, Express.js, PostgreSQL


## Features

- Browse and order from a wide range of dishes and drinks
- Secure user authentication and authorization
- Admin user can add, remove, edit product
- Customer profile page and history
- Order and payment processing


## Environment Variables

#### To run this project, you will need to add the following environment variables to your .env file

`SECRETKEY=  "your secret_key"`

`issuer= "bolgeo"`

`EMAIL= your smtp email`

`PASSWORD = your smtp password`

`PORT = your desired port`

`DB PORT = your desired DB port`

#### Below is config for deployed backend

`DB_HOST_DEV = 'your DB link '`

`DB_USER_DEV = 'your DB user'`

`DB_PASS_DEV = 'your DB password'`

`DB_NAME_DEV = 'your DB name'`

`cloudy_name= 'your cloudy_name'`

`cloudy_apikey= 'your cloudy apikey'`

`cloudy_apisecret='your cloudy api secret'`
## Installation

Clone the project

```bash
  git clone https://github.com/luqmanito/Project-1-Restful-API-Mockup-Haya-Coffee.git
```

Go to the project directory

```bash
  cd project2
```

Install dependencies

```bash
  npm install
```
Set up a PostgreSQL database and update the connection details in config/db.js

Start the server: npm start or npm run dev if you want to run on development side

```bash
  npm run start
```
The backend will be running on your desired localhost, by default it's in http://localhost:3000

## API Reference

#### ENDPOINT public user

`GET /profile/` Retrieve the profile user by ID
  
`GET /profile/modify` Edit the profile user

####  ENDPOINT admin user

  `GET /products/add` Add new menu of dishes and drinks for 

  `GET /products/modify` Edit the menu of dishes and drinks

  `GET /products/del/:id` Delete the menu of dishes and drinks by ID

  `GET /products/product_detail/` Retrieve the spesific menu of dishes and drinks







## Additional Notes

- Make sure to have the latest version of Node.js and PostgreSQL installed.
- Remember to run npm install to install the dependencies before starting the server.
- To properly test the API endpoints, it is recommended to use a tool such as Postman.


## Deployment

You can use my deployment of this repo here :

```bash
https://backend-haya-coffee.vercel.app/
```


## Documentation

[POSTMAN](https://documenter.getpostman.com/view/23706916/2s83zgvQf8)


## Related

Here are some related projects

[Frontend Haya Coffee](https://github.com/luqmanito/my-app)

[Mobile App Haya Coffee](https://github.com/luqmanito/HayaShop)

