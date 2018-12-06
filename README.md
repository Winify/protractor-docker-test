# protractor-docker-test

Run with docker-compose:
    docker-compose up --build --abort-on-container-exit --remove-orphans

Run with docker on Windows:
    docker run --rm --name test -p 3000:3000 -v $PWD\target:/usr/src/app/target protractor-docker-test

Run with docker on Linux:
    docker run --rm --name test -p 3000:3000 -v `pwd`/target:/usr/src/app/target protractor-docker-test