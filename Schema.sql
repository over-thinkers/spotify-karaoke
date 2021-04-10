CREATE DATABASE IF NOT EXISTS spoti-oki;

USE spoti-oki;

CREATE TABLE IF NOT EXISTS playlist (
    id int NOT NULL AUTO_INCREMENT,
    artist varchar(255),
    title varchar(255),
    albumUrl varchar(555),
    PRIMARY KEY (id)
);