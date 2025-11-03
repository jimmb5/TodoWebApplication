drop table if exists task;
drop table if exists account;

create table account (
    id serial primary key,
    email varchar(50) not null unique,
    password varchar(255) not null
);

create table task (
    id serial primary key,
    description varchar(255) not null,
    user_id integer references account(id) on delete cascade
);