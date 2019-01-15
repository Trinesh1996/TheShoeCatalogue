

module.exports = function (pool) {

    async function addToCart(shoe_item) {
        
        let cartItems = await pool.query("SELECT * from items_cart where shoe_id = $1", [shoe_item])
        let item = await pool.query('SELECT id from shoes where id = $1', [shoe_item]);
        let cost = await pool.query('SELECT price from shoes where id = $1', [shoe_item]);

        if (shoe_item == undefined || shoe_item == "") {
            return false;
        }

        let ItemsQty = await pool.query("SELECT qty from items_cart where shoe_id = $1", [shoe_item])
        

        let sellPrice = cost.rows[0].price;

       
         

        if (cartItems.rowCount === 0) {
            let totalprice = 0;
            await pool.query('insert into items_cart (shoe_id, qty, price, totalprice) values ($1,$2,$3, $4)', [item.rows[0].id, 1, cost.rows[0].price, totalprice])
        }
        else {
            await pool.query('update items_cart set qty = qty + 1 where shoe_id = $1', [shoe_item])
            await pool.query('update items_cart set totalprice = qty * price where shoe_id = $1', [shoe_item])
          

        }
        return;
    }

  

    async function getAllCartData() {
        let result = await pool.query('SELECT * from items_cart');
        console.log(result.rows)
        return result.rows;
    }

    async function getCartByBrands(brand) {
        let result = await pool.query(`select shoes.id, items_cart.shoe_id, brand, color, size, shoes.price, items_cart.qty
        from shoes
        join items_cart
        on shoes.id = items_cart.shoe_id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id
        join brands
        on shoes.brand_id = brands.id where brand = $1`, [brand])
        

        return result.rows
    }

    async function getCartByColor(color) {
        let result = await pool.query(`select shoes.id, items_cart.shoe_id, brand, color, size, shoes.price, items_cart.qty
        from shoes
        join items_cart
        on shoes.id = items_cart.shoe_id
        join brands
        on shoes.brand_id = brands.id        
        join sizes
        on shoes.size_id = sizes.id
        join shoe_color
        on shoes.color_id = shoe_color.id where color = $1`, [color])
        return result.rows
    }

    async function getCartData() {
        let result = await pool.query(`select shoes.id, items_cart.shoe_id, brand, color, size, items_cart.price, items_cart.qty, items_cart.totalprice
        from shoes
        join items_cart
        on shoes.id = items_cart.shoe_id
        join brands
        on shoes.brand_id = brands.id        
        join sizes
        on shoes.size_id = sizes.id
        join shoe_color
        on shoes.color_id = shoe_color.id;`)

        return result.rows;
    }

    async function getCartBySize(size) {
        let result = await pool.query(`select shoes.id, items_cart.shoe_id, brand, color, size, shoes.price, items_cart.qty
        from shoes
        join items_cart
        on shoes.id = items_cart.shoe_id
        join brands
        on shoes.brand_id = brands.id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id where size = $1`, [size])
        return result.rows
    }

    async function getCartByShoeID(id) {
        let result = await pool.query(`select shoes.id, items_cart.shoe_id, brand, color, size, shoes.price, items_cart.qty
        from shoes
        join items_cart
        on shoes.id = items_cart.shoe_id
        join brands
        on shoes.brand_id = brands.id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id where shoe_id = $1`, [id])
        return result.rows
    }


    // update cart: Once the user has selected their items.
    // In there cart they can 




    return {
        addToCart,
        getAllCartData,
        getCartByBrands,
        getCartByColor,
        getCartBySize,
        getCartByShoeID,      
        getCartData
    
     
    }
}