# Team sh32 Main Project - Team Project 3 Course 2024-25

## Off Axis - Gig Ticketing & Management Platform

## Description
A ground-up rebuild of the Off Axis website that adds features to make it more streamlined and automated.

Features added:
- Ability for artists to create an account using an in-built form
- Ability for artists to edit their profile
- Ability for artists to create and edit their gigs
- Admin panel to approve artist and gig applications
- Admin panel to edit artist and gig information
- Checkout/cart system
- Partial festival functionality
- Partial gig support request system
- Built on React/NodeJS instead of wordpress, making it much more customisable and scalable.

## Documentation

Detailed documentation about the project, including API endpoints, can be found on the [Wiki](https://stgit.dcs.gla.ac.uk/team-project-h/2024/sh32/sh32-main/-/wikis/home).

## Prerequisites
- Docker (deployment)
- React + Vite (frontend)
- node.js 20+ (backend)
- npm (installing dependencies)
- Stripe Account (for payments)
- emailjs Account (for automatic emails)
- Google Account (for Google Sign Ins)

## Installation
Assuming the above prerequisites are installed, you can proceed with installation as follows.

1. Clone the main repository onto your linux machine (or virtual machine).
2. Navigate to: `[project-location]/sh32-main/frontend/`
3. To install frontend dependencies, run:
> $ npm install
4. Navigate to: `[project-location]/sh32-main/backend/`
5. To verify the correct version of NodeJS is installed, run:
> $ nvm install
6. To install backend dependencies, run:
> $ npm install
7. Create `.env` file in the backend folder. Paste the following into the file, replacing the key placeholders with your own development/deployment keys.

```
DB_USERNAME="root"
DB_PASSWORD="example"
DB_HOSTNAME="localhost"
DB_DATABASENAME="mydb"
DB_PORT="3306"
CLIENT_URL="http://localhost:5173"<br>

JWT_SECRET_KEY={GOOGLE KEY PLACEHOLDER}

STRIPE_PRIVATE_KEY={STRIPE KEY PLACEHOLDER}
```

8. Compose docker by running: 
> $ sudo docker compose up -d

## Running the Project (Development)

#### Database

1. Compose the docker container, as above, by running:
> $ sudo docker compose up -d

#### Frontend

1. Navigate to: `[project-location]/sh32-main/frontend/`
2. Run:
> $ npm run dev

#### Backend

NOTE: Backend will not start unless the database has been started.
1. Navigate to `[project-location]/sh32-main/backend/`
2. Run:
> $ npm start

## Populating with Test Data (Development)

The database can be populated with test data using a population script built into the backend, as an api endpoint.

These API endpoints can be sent requests by using a tool such as Postman. All requests for this purpose are post requests, with empty request bodies. More info can be found on the [API Docs Page](https://stgit.dcs.gla.ac.uk/team-project-h/2024/sh32/sh32-main/-/wikis/API-Docs/Main)

This can be executed in the following way:

1. Start the project (as above).
2. Create the database tables by sending a `POST` request to:
> http://localhost:5001/api/main/createTable
3. Populate the database tables by sending a `POST` request to:
> http://localhost:5001/api/main/mockPopulateTable

## Authors and acknowledgment

Developed by
- Adam Meek (2759825M)
- Katie Thomas (275660T)
- Sirapop Tuntithanakij (3042270T)
- Aidan Yip (2789553Y)
- Ibrahim Hassan (2667185H)

With Support From
Derick (From Off Axis)
Farzwan Mohamed

## License
MIT No Attribution License

## Project status
Proof of Concept
