FROM node:10.11.0-alpine

# Create app directory
# VOLUME /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/

EXPOSE 3000

RUN npm install

ENTRYPOINT ["./start-test.sh"]