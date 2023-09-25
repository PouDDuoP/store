FROM node:20

COPY package*.json ./
RUN npm install

RUN npm install -g @angular/cli
RUN mkdir -p /home/app

WORKDIR /home/app

EXPOSE 4200

CMD ng serve --host 0.0.0.0