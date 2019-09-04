use dgswboard;

drop table if exists post;
drop table if exists user;

create table user (
  id bigint primary key auto_increment,
  account varchar(100) not null unique,
  password varchar(100),
  name varchar(30),
  gender varchar(10),
  grade bigint,
  stored_path varchar(255),
  original_name varchar(255),
  created datetime default current_timestamp,
  updated datetime default current_timestamp on update current_timestamp
) engine=InnodB default charset=utf8mb4;

create table post (
  id bigint primary key auto_increment,
  user_id bigint,
  category bigint,
  title varchar(255),
  content text,
  views bigint default 0,
  likes bigint default 0,
  created datetime default current_timestamp,
  updated datetime default current_timestamp on update current_timestamp
) engine=InnodB default charset=utf8mb4;