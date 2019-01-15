module.exports = function (pool) {

    async function addShoeQualities(brand, size, color) {
        // add more constraints        
        let addBrand = await pool.query('select * from brands where brand = $1', [brand]);
        let addColor = await pool.query('select * from shoe_color where color = $1', [color]);
        let addSize = await pool.query('select * from sizes where size = $1', [size]);

       if (brand == undefined && brand == "" || color == undefined && color == "" ||
         size == undefined && size == "" ) {

        return false;
         }

         else {

        if (addBrand.rowCount === 0) {
            await pool.query('insert into brands (brand) values ($1)', [brand])
        }
        if (addSize.rowCount === 0) {
            await pool.query('insert into sizes (size) values ($1)', [size])
        }

        if (addColor.rowCount === 0) {
            await pool.query('insert into shoe_color (color) values ($1)', [color])
        }       
    }
        return {
            addBrand,
            addSize,
            addColor        
         
        }         
    }

    // why does it come out as an empty array
    async function getAllBrands() {
        let results = await pool.query('Select * from brands');
        return results.rows
    }
    async function getAllColors() {
        let results = await pool.query('Select * from shoe_color');
        return results.rows
    }
    async function getAllSizes() {
        let results = await pool.query('Select * from sizes');
        return results.rows
    }

    async function addShoeItem(brand_id, size_id, color_id, price, monthlyStock, imgURL) {
        let BrandID = await pool.query('select id from brands where brand = $1', [brand_id]);
        let ColorID = await pool.query('select id from shoe_color where color = $1', [color_id]);
        let SizeID = await pool.query('select id from sizes where size = $1', [size_id]);



        let allShoes = await pool.query(`select * from shoes where brand_id = $1 and size_id = $2
        and color_id = $3 and price = $4 and monthlystock = $5 and imgURL = $6`, [BrandID.rows[0].id, SizeID.rows[0].id, ColorID.rows[0].id, price, monthlyStock, imgURL]);       

        if (brand_id == undefined || brand_id == "" &&
        size_id == undefined || size_id == "" &&
        color_id == undefined || color_id == "" &&
        price == undefined || price == null &&
        monthlyStock== undefined || monthlyStock == null) {

        return false
        }

        let inStock = monthlyStock;

        if (allShoes.rowCount === 0) {
            await pool.query('insert into shoes (brand_id, size_id, color_id, price, monthlyStock, inStock, imgURL) values ($1, $2, $3, $4, $5, $6, $7)', [BrandID.rows[0].id, SizeID.rows[0].id, ColorID.rows[0].id, price, monthlyStock, inStock, imgURL]);
       
        }
        else {
            return false;
        }
       
    }


    async function returnQualities () {
        let data = await pool.query(`select shoes.id, brand, color, size
        from brands
        Join shoes
        on brands.id = shoes.brand_id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id;`)

        return data.rows
    }
        
        

    async function getAllShoes () {
        let result = await pool.query('select * from shoes');
        return result.rows
    }

    async function getAllShoesByName() {
        let result = await pool.query(`select shoes.id, brand, color, size, price, monthlystock, imgurl
        from brands
        Join shoes
        on brands.id = shoes.brand_id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id`);
        return result.rows;
    }

    async function getShoesByShoeID(id) {
        let result = await pool.query(`select shoes.id, brand, color, size, price, monthlyStock, inStock
        from brands
        Join shoes
        on brands.id = shoes.brand_id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id where shoes.id = $1`, [id]);
        return result.rows
    }

    async function getShoeByBrand(brand) {
        let result = await pool.query(`select shoes.id, brand, color, size, price, monthlyStock
        from brands
        Join shoes
        on brands.id = shoes.brand_id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id where brand = $1;`, [brand]);
        return result.rows;
    }



    async function getShoeByColor(color) {
        let result = await pool.query(`select shoes.id, brand, color, size, price, monthlyStock
        from brands
        Join shoes
        on brands.id = shoes.brand_id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id where color = $1;`, [color]);
        return result.rows;
    }

    async function getShoeBySize(size) {
        let result = await pool.query(`select shoes.id, brand, color, size, price, monthlyStock
        from brands
        Join shoes
        on brands.id = shoes.brand_id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id where size = $1;`, [size]);
        return result.rows;
    }

    async function getShoeByBrandAndColor(brand, color) {
        let result = await pool.query(`select shoes.id, brand, color, size, price, monthlyStock
        from brands
        Join shoes
        on brands.id = shoes.brand_id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id where brand = $1 and color = $2;`, [brand, color]);

        return result.rows;

    }
    async function getShoeByBrandAndSize(brand, size) {
        let result = await pool.query(`select shoes.id, brand, color, size, price, monthlyStock
        from brands
        Join shoes
        on brands.id = shoes.brand_id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id where brand = $1 and size = $2;`, [brand, size]);

        return result.rows;

    }

    async function getShoeByColorAndSize(color, size) {
        let result = await pool.query(`select shoes.id, brand, color, size, price, monthlyStock
        from brands
        Join shoes
        on brands.id = shoes.brand_id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id where color = $1 and size = $2;`, [color, size]);

        return result.rows;

    }

    async function getShoeByBrandAndColorAndSize(brand, color, size) {
        let result = await pool.query(`select shoes.id, brand, color, size, price, monthlyStock
        from brands
        Join shoes
        on brands.id = shoes.brand_id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id where brand = $1 color = $2 and size = $3;`, [brand, color, size]);

        return result.rows;

    }




    async function updateShoeQty(shoe_item) {

        let shoeQty = await pool.query('SELECT monthlyStock from shoes where id = $1', [shoe_item]);        
        let cart_itemQTY = await pool.query('SELECT qty from items_cart where shoe_id = $1', [shoe_item])
        
        let cartItemValue = cart_itemQTY.rows[0].qty;        
        let shoeQtyValue = shoeQty.rows[0].monthlystock;
    
        let inStock = shoeQtyValue - cartItemValue;

        if (cartItemValue > 0) {
            await pool.query('update shoes SET instock = $1, monthlystock = $1 where id = $2', [inStock, shoe_item]);
        }
        else {
            return false
        }
    }

    // async function updateShoe(id) {
        async function updateShoes(brand_id, size_id, color_id, price, monthlyStock, imgURL, id) {

            let BrandID = await pool.query('select id from brands where brand = $1', [brand_id]);
            let ColorID = await pool.query('select id from shoe_color where color = $1', [color_id]);
            let SizeID = await pool.query('select id from sizes where size = $1', [size_id]);

            let allShoes = await pool.query(`select * from shoes where brand_id = $1 and size_id = $2
            and color_id = $3 and price = $4 and monthlystock = $5 and imgURL = $6`, [BrandID.rows[0].id, SizeID.rows[0].id, ColorID.rows[0].id, price, monthlyStock, imgURL]);

            let inStock = monthlyStock;


            if (allShoes.rowCount === 0) {
                await pool.query(`UPDATE shoes SET brand_id = $1, size_id = $2, color_id = $3, price = $4, 
                monthlystock = $5, imgurl = $6 where id = $7`, [BrandID.rows[0].id, SizeID.rows[0].id, ColorID.rows[0].id, price, monthlyStock, inStock, imgURL, id])

            }
          
        }



    // }

    async function deleteShoe(id) {
        let allShoes = await pool.query("SELECT * from shoes where id = $1", [id]);
        let shoeID = allShoes.rows[0].id;

        if (shoeID == id) {
            await pool.query("DELETE from shoes where id = $1", [shoeID])
            return true;
        }
        else {
            return false;
        }

    }

    async function deleteAll() {

        let allshoes = await pool.query("SELECT * from shoes");
        let allCartItems = await pool.query("SELECT * from items_cart")

        await pool.query("DELETE from items_cart");
      
        await pool.query("DELETE from shoes");


        return {
            allShoes: allshoes.rows,
            allCartItems: allCartItems.rows
        }
    }
 

    async function getBrandByID(id){
        let result = await pool.query('select brand from brands where id = $1', [id]);
        return result.rows
    }




    async function displayShoeItem() {
        let shoe_item = await pool.query(`select shoes.id, brand, color, size, price, qty
        from brands
        Join shoes
        on brands.id = shoes.brand_id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id;`);

        return shoe_item.rows

    }

    async function getShoesItem(id) {
        let result = await pool.query(`select shoes.id, brand, color, size, price, monthlyStock, inStock, imgurl
        from brands
        Join shoes
        on brands.id = shoes.brand_id
        join shoe_color
        on shoes.color_id = shoe_color.id
        join sizes
        on shoes.size_id = sizes.id where shoes.id = $1;`, [id]);
        return result.rows
    }


    return {
        addShoeQualities,
        addShoeItem,
        getBrandByID,
        displayShoeItem,
        getShoesItem,     
        getAllShoes,
     
        
       
        updateShoeQty,
        getAllBrands,
        getAllColors,
        getAllSizes,
        getAllShoesByName,
        getShoesByShoeID,
        deleteShoe,    
        deleteAll,   
        returnQualities,
        updateShoes,
        
        getShoeBySize,
        getShoeByColor,
        getShoeByBrand,
        getShoeByBrandAndSize,
        getShoeByBrandAndColor,
        getShoeByColorAndSize,
        getShoeByBrandAndColorAndSize
     
    }
}