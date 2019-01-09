drop table if exists brands, shoe_color, sizes, shoes, items_cart, checkout;




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
    id serial not NULL primary key,
    brand_id INT not null,
    size_id INT not null,
    color_id INT not null,
    price INT not null,
    monthlyStock int not null,
    inStock int not null

    FOREIGN key (brand_id) REFERENCES brands(id),
    FOREIGN key (size_id) REFERENCES sizes(id),
    FOREIGN key (color_id) REFERENCES shoe_color(id)
);


create table items_cart (
    id serial not null,
    shoe_id int not null,
    qty int not null,
    price int not null,
    totalPrice int not NULL,    
    FOREIGN key (shoe_id) REFERENCES shoes(id)

);

create table checkout (
    id serial not null,
    totalPrice int not null,
    totalItems int not null,
    timeOfCheckout TIMESTAMP
);


insert into brands (id,brand) values (1,'Nike');
insert into brands(id,brand) values (2,'Adiddas');
insert into brands (id,brand) values (3,'Puma');
insert into brands (id,brand) values (4,'Jordan');
insert into brands (id,brand) values (5,'Airmax');

insert into shoe_color (id,color) values (1, 'White');
insert into shoe_color (id,color) values (2, 'Red');
insert into shoe_color (id,color) values (3, 'Brown');
insert into shoe_color (id,color) values (4, 'Black');
insert into shoe_color (id,color) values (5, 'Silver');


insert into sizes (id, size) values (1, 6);
insert into sizes (id, size) values (2, 7);
insert into sizes (id, size) values (3, 8);
insert into sizes (id, size) values (4, 9);
insert into sizes (id, size) values (5, 10);


insert into shoes (id, brand_id, size_id, color_id, price, qtyForMonth, qtyRemaining) values (1,1,1,1,300,10,10);
insert into shoes (id, brand_id, size_id, color_id, price, qtyForMonth, qtyRemaining) values (2,2,2,2,400,10,10);
insert into shoes (id, brand_id, size_id, color_id, price, qtyForMonth, qtyRemaining) values (3,3,3,3,500,10,10);

insert into items_cart (id, shoe_id, qty, price, totalPrice) values (1,1,2,300,600);
insert into items_cart (id, shoe_id, qty, price, totalPrice) values (2,2,1,400,400);
insert into items_cart (id, shoe_id, qty, price, totalPrice) values (2,2,1,500,500);



