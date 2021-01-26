## Instructions

In order to run the complete project is necessary to run the following command from within docker directory:

docker-compose --build up

3 services will run out of the previous command:
- opi-db which uses the files inside /docker/postgis/ to generate a postgres database with postgis extension.
The initdb-postgis.sh initializes the database and loads the csv file into a table named "stores"
- opi-backend which uses the files inside /docker/back/
- opi-frontend which uses the files inside /docker/front

each service can be run individually from within the same directory with the following command:

docker-compose up {service-name}

## BEFORE RUN:
- create a .env file at the root of /docker/

## AFTER RUN:
Go to [localhost:3000](http://localhost:3000) in your browser.
