FROM node:current-alpine

RUN mkdir -p /usr/src/app

# Create app workdirecotyr
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm i --save nodemon
RUN npm install

# Expose application ports
EXPOSE 3000
CMD [ "npm", "start" ]