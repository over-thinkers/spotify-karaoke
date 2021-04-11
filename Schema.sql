CREATE DATABASE IF NOT EXISTS spotioki;

USE spotioki;

CREATE TABLE IF NOT EXISTS playlist (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255),
    artist varchar(255),
    title varchar(255),
    albumUrl varchar(555),
    PRIMARY KEY (id)
);