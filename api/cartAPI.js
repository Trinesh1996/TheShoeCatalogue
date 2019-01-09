module.exports = function (cartServices) {

    async function getCart(req, res ,next) {
      
        try {
            let getCartData = await cartServices.getAllCartData();
            res.json({
                status: 'success',
                data: getCartData
            });

        }
        catch (err) {
			next(err);
        }
    }

    async function getRelevantCartData(req, res, next) {
        try {
            let allCartData = await cartServices.getCartData();
      
            res.json({
                status: 'success',
                data: allCartData
            
            });

        }
        catch (err) {
			next(err);
        }
    }


    async function addItemsToCart(req, res, next) {
        try {
            await cartServices.addToCart(req.params.id);
            res.json({
                status: 'success: Item has been added to cart',
            
            });

        }
        catch (err) {
			next(err);
        }
    }


    async function getCartByBrand(req, res ,next) {
        let brands = req.params.cart_brand;
        try {
        
            let getCartBrands = await cartServices.getCartByBrands(brands);
            console.log(getCartBrands)
            
            res.json({
                status: 'success',
                data: getCartBrands
            })
        }
        catch (err) {
            next (err)
        }
    }
    async function getCartByColors(req, res ,next) {
        let color = req.params.cart_color;
        try {
      
            let getCartColor = await cartServices.getCartByColor(color);

            console.log(getCartColor)
            
            res.json({
                status: 'success',
                data: getCartColor
            })
        }
        catch (err) {
            next (err)
        }
    }
    async function getCartBySizes(req, res ,next) {
        let size = req.params.cart_size;
        try {     
            let getCartSize = await cartServices.getCartBySize(size);
            
            console.log(getCartSize)
            res.json({
                status: 'success',
                datas: getCartSize
            })
        }
        catch (err) {
            next (err)
        }
    }

    async function getCartByShoeIDs(req, res ,next) {
        let ids = req.params.id;
        try {
         
            let getCartID = await cartServices.getCartByShoeID(ids);
            
     
            res.json({
                status: 'success',
                data: getCartID
            })
        }
        catch (err) {
            next (err)
        }
    }

    return {
        getCart,
        getCartByBrand,
        getCartByColors,
        getCartBySizes,
        getCartByShoeIDs,
        addItemsToCart,
        getRelevantCartData
    }
}