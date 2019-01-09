function shoesOnCatalogue() {


    function getAllShoes() {
        try {
            const response = axios.get('/api/routes/shoesAPI/');
            return response;
        }
        catch (err) {
            alert(err)
        }
    }



    function getShoeByID(id) {   
        try {
            const response = axios.get('/api/routes/shoesAPI/selectedShoe/' + id);
         
            return response;
        }
        catch (err) {
            console.log(err);
            alert(err)
        }
    }

    function deleteShoeByID(id) {
        try {
            const response = axios.get('/api/routes/shoesAPI/deleteShoe/' + id);
            console.log(response);
            return response;
        }

        catch (err) {
            console.log(err);
            alert(err)
        }
    }


    // // CART
    function addItemsToCart(id) {
        console.log(id)
        try {
            const response = axios.post('/api/routes/cart/addToCart/' + id);
            console.log(response);
            return response;
        }
        catch (err) {
            console.log(err) 
                alert(err)
            }
        }

    function getAllCart() {
        try {
            const response = axios.get('/api/routes/ShowCartData');
            return response
        }
        catch (err) {
            console.log(err) 
                alert(err)
            }
        }




    function filterStockByBrand(brand) {
        try {
            const response = axios.get('/api/routes/shoesAPI/brand/:brand' + brand);
            return response
        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }

    function filterStockByColor(color) {
        try {
            const response = axios.get('/api/routes/shoesAPI/color/:color' + color);
            return response
        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }

    function filterStockBySize(size) {
        try {
            const response = axios.get('/api/routes/shoesAPI/size/:size' + size);
            return response
        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }

    function filterStockByBrandAndSize(brand, size) {
        try {
            const response = axios.get('/api/stock/filter/brands/:brand/sizes/:size' + brand + size);
            return response
        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }
        

    function filterStockByBrandAndColor(brand, color) {
        try {
            const response = axios.get('/api/stock/filter/brand/:brands/color/:colors/' + brand + color);
            return response
        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }

    function filterStockByColorAndSize(color, size) {
        try {
            const response = axios.get('/api/stock/filter/colors/:color/sizes/:size'+ color + size);
            return response
        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }

    function filterStockByBrandAndColorAndSize(brand, color, size) {
        try {
            const response = axios.get('/api/stock/filter/brands/:brand/colors/:color/sizes/:size' + brand + color + size);
            return response
        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }

    
    

    return {
        getAllShoes,
        getShoeByID,
        deleteShoeByID,
        addItemsToCart,
        getAllCart,
        filterStockByBrand,
        filterStockByColor,
        filterStockBySize,
        filterStockByBrandAndSize,
        filterStockByColorAndSize,
        filterStockByBrandAndColorAndSize,
        filterStockByBrandAndColor
   
    }
}