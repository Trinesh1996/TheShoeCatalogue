'use strict'
let assert = require("assert");
let shoeCatalogueStock = require("../services/stock");
let shoeCatalogueCart = require("../services/cart");

let userValidate = require("../services/user");
const Connection = require('../config/testConnection')

const pool = Connection()

let stock = shoeCatalogueStock(pool);
let cart = shoeCatalogueCart(pool)
let user = userValidate(pool)



describe('Tests for stock and admin', async function () {

    // Default values
    beforeEach(async function (){  
        await pool.query('DELETE from items_cart');
        await pool.query('DELETE from shoes')
        await pool.query("ALTER SEQUENCE items_cart_id_seq RESTART 1;");         
        await pool.query("ALTER SEQUENCE shoes_id_seq RESTART 1;");  

        await stock.addShoeQualities('Nike',6,"White");
        await stock.addShoeQualities('Adiddas',7, 'Red');
        await stock.addShoeQualities('Puma',8, 'Brown');
        await stock.addShoeQualities('Jordan',9,'Black');          
        await stock.addShoeQualities('Airmax',10, 'Silver');
    })



    it ('Should check shoe qualities in stock', async function () {
        assert.deepEqual(await stock.getBrandByID(3), [{brand: 'Puma'}])


    })

    it ('should check all items in stock', async function () {
        await stock.addShoeItem('Nike', 8, 'Black', 200, 10, '../images/pumaBrown');     
          

        assert.deepEqual(await stock.getAllShoes(), [ { id: 1,
            brand_id: 1,
            size_id: 3,
            color_id: 4,
            price: 200,
            monthlystock: 10,
            instock: 10,
            imgurl: '../images/pumaBrown' }])
    })

    it ('should add a shoe to stock', async function () {
        await stock.addShoeItem('Jordan', 8, 'Black', 200, 10,10, '../images/pumaBrown.jpg');

        assert.deepEqual(await stock.getShoesItem(1), [{ id: 1, 
            brand: 'Jordan', 
            color: 'Black', 
            size: 8, 
            price: 200, 
            monthlystock: 10, 
            instock: 10,
        }])
     
    })

    it ('Should filter shoe according to brand', async function() {
        await stock.addShoeItem('Jordan', 8, 'Black', 200, 10, '../images/pumaBrown');
        await stock.addShoeItem('Airmax', 9, 'Black', 200, 10, '../images/pumaBrown');
        await stock.addShoeItem('Nike', 9, 'Black', 300, 10, '../images/pumaBrown');
        await stock.addShoeItem('Adiddas', 6, 'Brown', 500, 10, '../images/pumaBrown');
        await stock.addShoeItem('Puma', 10, 'Silver', 450, 10, '../images/pumaBrown');       


        assert.deepEqual(await stock.getShoeByBrand('Nike'), [ { id: 3,
            brand: 'Nike',
            color: 'Black',        
            size: 9,
            price: 300,
            monthlystock: 10,
            
        }]);
    });


    it ('Should filter according to color', async function() {
        await stock.addShoeItem('Jordan', 8, 'Black', 200, 10, '../images/pumaBrown');
        await stock.addShoeItem('Airmax', 9, 'Black', 200, 10, '../images/pumaBrown');
        await stock.addShoeItem('Nike', 9, 'Black', 300, 10,'../images/pumaBrown');
        await stock.addShoeItem('Adiddas', 6, 'Brown', 500, 10, '../images/pumaBrown');
        await stock.addShoeItem('Puma', 10, 'Silver', 450, 10, '../images/pumaBrown');
        await stock.addShoeItem('Nike', 9, 'White', 300, 10, '../images/pumaBrown');


        assert.deepEqual(await stock.getShoeByColor('Silver'), [
            { id: 5,
                brand: 'Puma',
                color: 'Silver',
                size: 10,
                price: 450,
                monthlystock: 10,
            }
        ])
    });


    it ('Should filter according to shoe_size', async function() {
        await stock.addShoeItem('Jordan', 8, 'Black', 200, 10, '../images/pumaBrown');
        await stock.addShoeItem('Airmax', 9, 'Black', 200, 10, '../images/pumaBrown');
        await stock.addShoeItem('Nike', 9, 'Black', 300, 10, '../images/pumaBrown');
        await stock.addShoeItem('Adiddas', 6, 'Brown', 500, 10, '../images/pumaBrown');
        await stock.addShoeItem('Puma', 10, 'Silver', 450, 10, '../images/pumaBrown');
        await stock.addShoeItem('Nike', 9, 'White', 300, 10, '../images/pumaBrown');


        assert.deepEqual(await stock.getShoeBySize(6), [{ id: 4,
            brand: 'Adiddas',
            color: 'Brown',
            size: 6,
            price: 500,
            monthlystock: 10
        }])
    });

    it ("Should delete shoe", async function () {
        await stock.addShoeItem('Jordan', 8, 'Black', 200, 10, '../images/pumaBrown');
        assert.deepEqual(await stock.deleteShoe(1), true);
        assert.deepEqual(await stock.getAllShoes(), [])
    })

    it('should update stock quantity when shoes are added to cart', async function () {
        // add shoe to stock  
        await stock.addShoeItem('Nike', 9, 'Black', 300, 10, '../images/pumaBrown');
       
        // add shoe to cart
        await cart.addToCart(1);
        
        // update qty of shoes when shoe is added to cart
        await stock.updateShoeQty(1);
        
        assert.deepEqual(await stock.getAllShoes(), [ 
            { id: 1,
                brand_id: 1,
                size_id: 4,
                color_id: 4,
                price: 300,
                monthlystock: 9,
                instock: 9},
    
           ]);
        });
    });


describe("Tests for Cart and Checkout", async function () {
    beforeEach(async function (){  
        await pool.query('DELETE from items_cart');
        await pool.query('DELETE from shoes')
        await pool.query("ALTER SEQUENCE items_cart_id_seq RESTART 1;");         
        await pool.query("ALTER SEQUENCE shoes_id_seq RESTART 1;");  

        await stock.addShoeQualities('Nike',6,"White");
        await stock.addShoeQualities('Adiddas',7, 'Red');
        await stock.addShoeQualities('Puma',8, 'Brown');
        await stock.addShoeQualities('Jordan',9,'Black');          
        await stock.addShoeQualities('Airmax',10, 'Silver');
    })

    it ('should add items to cart and check them in cart', async function () {
        await stock.addShoeItem('Jordan', 8, 'Black', 300, 10, '../images/pumaBrown');
       
       
        
        await cart.addToCart(1);
        await cart.addToCart(1);
        await cart.addToCart(1);
        await cart.addToCart(1);


        await stock.updateShoeQty(1)
      

        assert.deepEqual(await stock.getAllShoes(), [
            { id: 1,
                brand_id: 4,
                size_id: 3,
                color_id: 4,
                price: 300,
                monthlystock: 6,
                instock: 6,
                imgurl: '../images/pumaBrown    ' }
       

        ])
      
        let getData = await cart.getAllCartData();         

        assert.deepEqual(await cart.getAllCartData(), [
            { id: 1, shoe_id: 1, qty: 4, price: 300, totalprice: 1200}
           
            
        ])
    })


        it("SHOULD UPDATE SHOES", async function () {
            await stock.addShoeItem('Jordan', 8, 'Black', 300, 10, '../images/pumaBrown');
            await stock.updateShoes("Nike", 10, "Grey", 500, 9, './//adfa', 1)

 

            assert.deepEqual(await stock.getAllShoes(), [])

        })



    // describe("Tests for User Login and Registration Validation", function () {
    //     it("Should add a customer", async function () {
    //         await user.createCustomer("Trinesh Chetty", "trinesh@gmail.com", "1234567")

    //         assert.deepEqual(await user.getCustomer(), [{ id: 1,
    //             fullname: 'Trinesh Chetty',
    //             email: 'trinesh@gmail.com',
    //             password: "$2a$10$wpja1SR5qu88Ig2rJkxrG.u2iWHAhh5/79m4D.PTaBybL1rD5Ofk6"
    //         }])
    //     })

    //     it("should login a customer", async function () {
    //         await user.login("trinesh@gmail.com", "1234567");
            
    //     })
    // })

    after(function () {
        pool.end();
    })
})



