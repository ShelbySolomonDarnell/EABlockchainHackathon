# Kweli Wallet Manager

Building a Secure Decentralized Digital Identity

## Installation

1. [Use indy sdk Readme to find libindy library to download](https://github.com/hyperledger/indy-sdk/blob/master/cli/README.md)
2. [Dowload and unzip libindy](https://repo.sovrin.org/macos/libindy/master/)
  a. Move the lib and include folders to `/usr/local/lib` and `/usr/local/include` respectively.
1. Download the indy sdk and install the indy-sdk `npm i indy-sdk -g`
2. Pull the following docker images: `docker pull mongo` & `docker pull mongo-express`
3. Go to the *webdb* directory and type the following into the command line: `docker-compose up -d`
   1. this runs indy-sdk, mongo db and mongo express
4. Go back to the main directory and use docker compose once again: `docker-compose up -d`

The Kweli Wallet manager consists of a web GUI frontend and a web service backend.
It will be used as a central point for disparate SecuRegister backend services for configuration values, and in the future for frontend as well.

## Development Usage

For development go to the *webdb* directory that will start the mongo and mongo express containers using the command `docker-compose up -d`.
Running the web interface and nodejs backend is to be accomplished by running to following two commands:

+ `nvm use 10`
+ `npm run start`

in the project main directory.

## Some troubleshooting

If you are having problems with the system asking whether or not docker is running on linux, type the command `sudo service docker restart` on the command line.

In the docker-compose.yml file, there are settings for mongo-express

+ mongoex:
  + image: mongo-express
  + environment:
    + ME_CONFIG_OPTIONS_EDITORTHEME=ambiance
    + ME_CONFIG_MONGODB_AUTH_DATABASE=admin
    + ME_CONFIG_MONGODB_SERVER=webdb
    + ME_CONFIG_MONGODB_PORT=27017
    + ME_CONFIG_MONGODB_ENABLE_ADMIN=true #false
  + ports:
    + "8081:8081"
  + links:
    + webdb

The database is named `webdb`; therefore, the link and the `ME_CONFIG_MONGODB_SERVER` is set to `webdb`.
If it is named differently change 2 fields: `links` and `ME_CONFIG_MONGODB_SERVER`.

## Purpose

### Create a Web Interface to

* manage simple indy wallets
* allow selection of user type
* create DiDs to relate to different types of data
* allows usage of multiple wallets
* search data attached to wallets
* display wallet summary data
* create keys for normal user

## Plan & Design

Populate database tables with available system features and configuration settings.
Each service will call an endpoint http://{url}:{port}/api/config/{servicename}.

## Managing docker images

Clear null images with the command `docker image prune -f`.
To build an image use the command `docker-compose build`.
Save an image you've modified or created using the command `docker save -o myImage.tar VeryNiceImage`.
Load an image you've saved using the command `docker load -i myImage.tar`.

[This link](https://itnext.io/lets-dockerize-a-nodejs-express-api-22700b4105e4) shows the initial directions I used for creating a docker image for this service.
In order to see how what has been done for our service differs from what is in this tutorial takes a perusal of the following files: `docker-compose.yml` and `Dockerfile`.
In `docker-compose.yml` the only changes were due to image names.
On the other hand `Dockerfile` required three changes:
- command order modification (the code was copied before running `npm install`
- above `npm install` we had to add `npm i --save nodemon` due to that not being captured in package.json
- the `CMD` parameters were changed to match what exists in our `package.json` file (from `["npm", "run", "start"]` to `["npm", "start"]`)