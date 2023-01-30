# FIVE TRIBES GAME

## DESCRIPTION

This is a variation of a board game called [Five Tribes](https://www.crowdgames.ru/collection/pyat-plemyon).  
Board game itself was created by [Bruno Cathala](https://boardgamegeek.com/boardgamedesigner/1727/bruno-cathala).

Check Frontend repo [here](https://github.com/mamonten0k/five-tribes-game-server).

## HOW INSTALL AND RUN

Final version vill be probably hosted on Heroku. Before that, you still won't be able to play the game just by installing github repo, because I won't share my .env file.

```bash
$ npm install
```

```bash
$ npm run start
```

## TECH STACK

- NestJS & Typescript
- Socket-io

Till the final version eveything could change.

In the beginning I was going to setup my authorization in independent from my database, with NestJS version of PassportJS and Redis as session storage. But due to specific way of accessing my database, I decided to not to use it for now. About specific way of accessing data from database - this game is a project for my University subject, we create database on server and can access it via specific API. Nonotheless, I decided to create backend server to properly use Websockets in this game.
