CREATE TABLE User(
  email varchar(20) PRIMARY KEY,
  password varchar(500)
);

CREATE TABLE Dictionary(
  name VARCHAR(30) PRIMARY KEY ,
  description varchar(200)
);

CREATE TABLE Words(
  word varchar(30),
  chinese VARCHAR(100),
  dict VARCHAR(30) REFERENCES Dictionary(name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;