let counter = new ReactiveHbs({
    container: '#confirmOrder',
    template: '#tpl',
    data: {
      count: 0
    }
 
});

counter.events({
    'click [name="increment-count"]'(e, elm, tpl) {
        tpl.set( 'count', tpl.get('count') + 1 );
    }
});

counter.render();
  
  // Filter Selectors
    let filterBrand = document.querySelector(".ui.brand");   
   
   // add shoe selectors
    let brandAdmin = document.querySelector('.brandAdmin');
    let colorAdmin = document.querySelector('.colorAdmin');
    let sizeAdmin = document.querySelector('.sizeAdmin');
    let priceAdmin = document.querySelector('.priceAdmin');
    let qtyAdmin = document.querySelector('.qtyAdmin');




    // Admin Update Shoe
    let renderShoesForUpdateSource = document.querySelector('.renderShoesForUpdate').innerHTML;
    let renderShoesForUpdateTemplate = Handlebars.compile(renderShoesForUpdateSource);
    let displayShoesForUpdate = document.querySelector('.ui.modal.update')


    // Filter Shoes

    let filterShoesSource = document.querySelector('.filterSelection').innerHTML;
    let filterShoesTemplate = Handlebars.compile(filterShoesSource);
    let displayFilterSelection = document.querySelector(".displayFilter")

        // Shoe All Available Shoes In Stock
    let renderAllTemplateSource = document.querySelector('.renderAllShoes').innerHTML;
    let renderUserTemplate = Handlebars.compile(renderAllTemplateSource);
    let displayTemplate = document.querySelector('.displayTemplate');


            // update Shoes
    let updateAllTemplateSource = document.querySelector('.updateShoes').innerHTML;
    let updateUserTemplate = Handlebars.compile(renderAllTemplateSource);
    let updateTemplate = document.querySelector('.updateTemplate');


     // Shoe Items available in cart
     let shoeAllCartItemsTemplateSource = document.querySelector('.AllCartItems').innerHTML;
     let cartItemsModalTemplate = Handlebars.compile(shoeAllCartItemsTemplateSource);
     let displayAllCartItemsModal = document.querySelector('#cart_modal');




    let confirmBuyTemplateSource = document.querySelector('.confirmBuy').innerHTML;
    let confirmBuyModalTemplate = Handlebars.compile(confirmBuyTemplateSource);
    let displayBuyModal = document.querySelector('#confirmOrder');

    // buttons
    let addShoeBtn = document.querySelector('.addShoe');
    let confirmBtn = document.querySelector('.confirmBuy');
    let addToCartItemBtn = document.querySelector("#addToCart");
    let itemQty = document.querySelector("#itemQty")
    let filterBtn = document.querySelector(".filterBtn")

    let shoeAPI = shoesOnCatalogue();







    function showAllShoes() {
        axios.get('/api/routes/shoesAPI/names')
        .then(function(results) {
            let shoeData = results.data.data;   
            
            
            console.log(shoeData)

            

            displayTemplate.innerHTML = renderUserTemplate({shoeData})
        })
    }

    showAllShoes();


    // function filterShoes() {
    //     axios.get('/api/qualities/allQualities')
    //     .then(function (results) {
    //         let qualities = results.data.data
    //         let brand = [];
    //         let color =[];
    //         let size = [];


    //         let uniqueBrands = [];
    //         let uniqueColor = [];
    //         let uniqueSize = []

    //         let all = [];

    //         for (data of qualities) {
    //             let brands = data.brand
    //             brand.push(brands)
    //         }          
          
    //         $.each(brand, function(i, el){
    //             if($.inArray(el, uniqueBrands) === -1) uniqueBrands.push(el);
    //         });

            
    //         for (data of qualities) {
    //             let colors = data.color
    //             color.push(colors)
    //         }

    //         $.each(color, function(i, el){
    //             if($.inArray(el, uniqueColor) === -1) uniqueColor.push(el);
    //         });

    //         for (data of qualities) {
    //             let sizes = data.size
    //             size.push(sizes)
    //         }

    //         $.each(size, function(i, el){
    //             if($.inArray(el, uniqueSize) === -1) uniqueSize.push(el);
    //         });


    //         for ( var i=0 ; i <uniqueBrands.length; i++) {   
    //             for ( var i=0 ; i <uniqueColor.length; i++)  {
    //                 for ( var i=0 ; i <uniqueSize.length; i++)  {
    //                     all[all.length] = {brand:uniqueBrands[i], color: uniqueColor[i], size: uniqueSize[i]};

                    
    //             }    
           
    //         }
    //     }
    //         console.log(all)
            
          
           

    //         displayFilterSelection.innerHTML = filterShoesTemplate({all})

    //     })
    // }

    // filterShoes();

   
    // Shoe Cart Data

    function showAllShoesInCart() {
        axios.get('/api/routes/ShowCartData')
        .then(function (results) {
            console.log(results.data.data)
            let cartData = results.data.data;
            displayAllCartItemsModal.innerHTML = cartItemsModalTemplate({cartData})


        })
    }

    showAllShoesInCart();

    function filterByBrand() {
        axios.get('/api/routes/shoesAPI/brand/:brand')
        .then(function (results) {
            console.log(results)
            
        })
    }



    // function showShoesForUpdate() {
    //     axios.get('/api/routes/shoesAPI/names')
    //     .then(function(results) {

    //         let updateShoeData = results.data.data;
    //         displayShoesForUpdate.innerHTML = renderShoesForUpdateTemplate({updateShoeData})
    //     })
    // }
    // showShoesForUpdate();






       
function confirmShoePurchase(id){
    if (id) {
        shoeAPI.getShoeByID(id)
        .then(results => {
            if (results.data.status == "Success: selected shoe") {
                console.log(results.data.data)
                let shoeData = results.data.data;
                displayBuyModal.innerHTML = confirmBuyModalTemplate({shoeData})
            }
        });

      $(".toggle-confirm-modal").click(function() {
          $("#confirmOrder").modal('show');
  });
    }

   
  
}

function addItemsToCart(id) { 
    if (id) {
        shoeAPI.addItemsToCart(id)
        .then(results => {
            if (results.data.status == 'success: Item has been added to cart') {
                shoeAPI.updateShoesQty(id)
                .then(res => {
                    if (res.data.status === "success") {
                        console.log("SHOE QTY UPDATED")
                    }
                })
                location.reload();
           

            
               
            }
        })      
 
    }

}

function deleteShoe(id) {
    if (id) {
        shoeAPI.deleteShoeByID(id)
        .then (results => {
            if (results.data.status == "Shoe is deleted") {
                console.log(results.data.data);
                console.log('SHOE ID ' + id + ' HAS BEEN DELETED')
    
            }
        })

    }
}

function filterAllShoes(brand) {
    console.log(brand)

        shoeAPI.filterStockByBrand(brand)
        .then(results => {
            if (results.data.status == "success") {
           

            }
        })
        
    }

  


    $('#toggle-cart-modal').click(function () {
        $('#cart_modal').modal('show');        
     
    });

