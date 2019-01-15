module.exports = function (stockServices) {

    async function addShoeItems (req, res, next) {
        let shoe = req.body;
        console.log(shoe)
        try {
            await stockServices.addShoeQualities(shoe.brand,shoe.size, shoe.color)
            await stockServices.addShoeItem(shoe.brand, shoe.size, shoe.color, shoe.price, shoe.monthlystock, shoe.imgURL);

            res.json ( {
                status: 'success'
            })
        }
        catch (err) {
            next (err)
            console.log(err)
        }
    }

    async function updateQTY(req, res, next) {
        try {
            let id = req.params.id;
            await stockServices.updateShoeQty(id)

            res.json ( {
                status: 'success'
            })
        }
        catch (err) {
            next(err) 
                console.log(err)
            
        }
    }

    async function shoeQualities(req, res, next) {
        try {
            let qualities = await stockServices.returnQualities()

            res.json ( {
                status: "Success: returns qualities",
                data: qualities

            })
        }
            catch (err) {
                console.log(err)
                next(err)
            } 
        }

    

    async function showSelectedShoe(req, res, next) {
        try {
            let selectedShoe = await stockServices.getShoesItem(req.params.id);

            res.json ( {
                status: "Success: selected shoe",
                data: selectedShoe

            })
        }
            catch (err) {
                console.log(err)
                next(err)
            } 
        }

    async function getAvailableShoes(req, res ,next) {
        try {
            let getShoes = await stockServices.getAllShoes();
            res.json({
                status: 'success',
                data: getShoes
            });
        }
        
        catch (err) {
			next(err);
        }
    }
    async function getAvailableShoesByName(req, res ,next) {
        try {
            let getShoes = await stockServices.getAllShoesByName();
            res.json({
                status: 'success',
                data: getShoes
            });
        }
        
        catch (err) {
			next(err);
        }
    }

    async function getShoesByBrand(req, res, next) {
        try {
            let brands = req.params.brand;
            let getBrand = await stockServices.getShoeByBrand(brands);
            res.json ( {
                status: 'success',
                data: getBrand
            });
        }
        catch (err) {
            next (err)
        }
    }

    async function getShoesBySize(req, res, next) {
        try {
            let sizes = req.params.size;
            let getSize = await stockServices.getShoeBySize(sizes)
            res.json ( {
                status: 'success',
                data: getSize
            });
        }    
        catch (err) {
            next (err)
        }
    }
    async function getShoesByColor(req, res, next) {
        try {
            let color = req.params.color;
            let getColor = await stockServices.getShoeByColor(color)
            res.json ( {
                status: 'success',
                data: getColor
            });
        }    
        catch (err) {
            next (err)
        }
    }

    async function filterByBrandAndSize(req, res ,next) {
        let brand = req.params.brand;
        let size = req.params.size;

        try {
            let getShoes = await stockServices.getShoeByBrandAndSize(brand, size);
            res.json({
                status: 'success',
                data: getShoes
            });
        }
        
        catch (err) {
			next(err);
        }
    }

    async function filterByColorAndSize(req, res ,next) {
        let color = req.params.color;
        let size = req.params.size;

        try {
            let getShoes = await stockServices.getShoeByColorAndSize(color, size);
            res.json({
                status: 'success',
                data: getShoes
            });
        }
        
        catch (err) {
			next(err);
        }
    }




    async function filterByBrandAndColor(req, res ,next) {
        let brand = req.params.brand;
        let color = req.params.color;

        try {
            let getShoes = await stockServices.getShoeByBrandAndColor(brand, color);
            res.json({
                status: 'success',
                data: getShoes
            });
        }
        
        catch (err) {
			next(err);
        }
    }

    async function filterByBrandAndColorAndSize(req, res ,next) {
        let brand = req.params.brand;
        let color = req.params.color;
        let size = req.params.size;

        try {
            let getShoes = await stockServices.getShoeByBrandAndColor(brand, color, size);
            res.json({
                status: 'success',
                data: getShoes
            });
        }
        
        catch (err) {
			next(err);
        }
    }



    async function getShoesID(req, res ,next) {
        let ids = req.params.id;
        try {
            let getShoes = await stockServices.getShoesByShoeID(ids);            
            res.json({
                status: 'success',
                data: getShoes
            });
        }        
        catch (err) {
			next(err);
        }
    }

 

    
    async function deleteShoeByID(req, res, next) {
        try {
        
            let deleteShoe = await stockServices.deleteShoe(req.params.id);
            let displayAllShoes = await stockServices.getAllShoes();

            res.json ( {
                status: 'Shoe is deleted',
                data: displayAllShoes
            });
        }

            catch(err) {
                next (err)
            }
        }


    async function getBrands (req, res, next) {
        try {
            let brand = await stockServices.getAllBrands();

            res.json ( {
                status: 'success',
                data: brand
            });
        }
        catch (err) {
            next (err)
        }
    }

    async function getSizes (req, res, next) {
        try {
            let size = await stockServices.getAllSizes();

            res.json ( {
                status: 'success',
                data: size
            });
        }
        catch (err) {
            next (err)
        }
    }

    async function getColors (req, res, next) {
        try {
            let color = await stockServices.getAllColors();

            res.json ( {
                status: 'success',
                data: color
            });
        }
        catch (err) {
            next (err)
        }
    }
    
    return {
        getAvailableShoes,
        getShoesByBrand,
        getShoesBySize,
        getShoesByColor,
        shoeQualities,
        getAvailableShoesByName,
        addShoeItems,
        getShoesID,
        deleteShoeByID,
        showSelectedShoe,
        updateQTY,

        filterByBrandAndColor,
        filterByBrandAndSize,
        filterByColorAndSize,
        filterByBrandAndColorAndSize,
        getBrands,
        getSizes,
        getColors
    }
}