drop table if exists brands, shoe_color, sizes, shoes, items_cart, checkout, admin, customer;



create table admin(
    id serial not null primary key,
    fullname text not null,
    email text not null,
    password text not null
);

create table customer(
    id serial not null primary key,
    fullname text not null,
    email text not null,
    password text not null
);


create table brands (
    id serial not null primary key,
    brand text not null    
);

create table shoe_color (
    id serial not null primary key,
    color text not null    
);

create table sizes (
    id serial not null primary key,
    size int not null    
);

create table shoes (
    id serial not NULL PRIMARY KEY,
    brand_id INT not null,
    size_id INT not null,
    color_id INT not Null,
    price INT not null,
    monthlyStock int not null,
    inStock int not null,
    imgURL text not null,

    FOREIGN key (brand_id) REFERENCES brands(id),
    FOREIGN key (size_id) REFERENCES sizes(id),
    FOREIGN key (color_id) REFERENCES shoe_color(id)

);


create table items_cart (
    id serial not null,
    shoe_id int not null,
    qty int not null,
    price int not null,     
    FOREIGN key (shoe_id) REFERENCES shoes(id)

);

create table checkout (
    id serial not null,
    totalPrice int not null,
    totalItems int not null,
    timeOfCheckout TIMESTAMP
);






