class Item {
    constructor(name, price, description, picture) {
   
        this.name = name;
        this.price = price;
        this.description = description;
        this.picture = picture;
      
    }
}

class LineItem {
    constructor(item, quantity) {
        this.item = item;
        this.quantity = quantity;
    }
    compare(item) {
        if (item.name === this.item.name) {
            return true;
        }
        else {
            return false;
        }
    }
    subtotal(){
        let subtotal = this.item.price * this.quantity;
        return subtotal;
    }
}

class Cart {
    constructor() {
        this.lineItems = [];
    }
    addItem(item, quantity) {
        let newLineItem = null;
        if (this.lineItems.length > 0) {
            for (let i = 0; i < this.lineItems.length; i++) {
                if (this.lineItems[i].compare(item)) {
                    newLineItem = this.lineItems[i];
                    this.lineItems[i].quantity += quantity;
                }
            }
        }
        if (!newLineItem) {
            this.lineItems.push(new LineItem(item, quantity));
        }
        this.displayCart()
    }
    delElement(i) {
        this.lineItems.splice(i, 1);

        this.displayCart()
    }

    displayCart() {
        let cartdata = '<table><tr><th>Product Name</th><th>Price</th><th>Quantity</th><th>subTotal</th><th>Total</th></tr>';

        let subtotal = 0;
        let total = 0;

        for (let i = 0; i < this.lineItems.length; i++) {
            subtotal = this.lineItems[i].subtotal();
            total += subtotal + (subtotal * .06)



            cartdata += "<tr><td>" + this.lineItems[i].item.name + "</td><td>"+'$'+ + this.lineItems[i].item.price + "</td><td>" + this.lineItems[i].quantity + "</td><td>" +'$'+ + this.lineItems[i].subtotal() + "</td><td></td><td><button>Delete</button></td></tr>"


        }

       cartdata += '<tr><td></td><td></td><td></td></td><td></td><td>'+'$'+ + total + '</td></tr></table>'

        document.getElementById('cart').innerHTML = cartdata

    }


    getTotal() {
        let total = 0;
        let subtotal = 0;
        for (let i = 0; i < this.lineItems.length; i++) {
            subtotal = this.lineItems[i].subtotal();
            total += subtotal + (subtotal * .06)
        }
        return total;
    }

}

$(document).ready(() => {
    $('#ccInfo').hide();
    $('#cashInfo').hide();

    let cart = new Cart();

    // Registering Event Handlers/Listeners
    $('body').on('change', '#checkoutForm input[type=radio]', (e) => {
        if ($(e.target).attr('id') === 'cash') {
            $('#ccInfo').hide();
            $('#cashInfo').show();
        } else if ($(e.target).attr('id') === 'creditCard') {
            $('#ccInfo').show();
            $('#cashInfo').hide();
        }
    });

    $('body').on('click', '.cart #haul', () => {
        showCheckout()
    })
    $('body').on('click', '#storeProducts > section > button', (e) => {
        cart.addItem(item[$(e.target).val()], 1);

    });

    $('body').on('click', '#checkoutForm .placeOrder', (e) => {
        $('section#storePage').hide();
        $('section#checkoutForm').hide();
        const $receipt = $('section#receiptForm');
        $receipt.append(`<h3>Thank You For Your Order</h3>`);
        $receipt.append(`<div class='cart'></div>`);
        cart.displayCart();
        console.log($(e.target).parent());
        if((e.target).parentNode.getAttribute('id')==='ccInfo') {
            $receipt.append(`<p>You paid by credit card</p>`);
        } else if ($(e.target).parent().attr('id')==='cashInfo') {
            $receipt.append(`You paid by cash and are due $${calculateChange()} in change.`);
        }
    });

    $('body').on('click', 'table button', (e) => {
        cart.delElement($(e.target).val());
    })

    $("body").on("click", "#add", (e) => {
        $("#cartDisplay").show();
        console.log(e.target);
        $("#cartDisplay #cart").text;
        currentTable = $(e.target);
      });

      $("body").on("click", "#cartDisplay img:first", (e) => {
        $("#cartDisplay").hide();
       
      })
      $("body").on("click", "#continue", (e) => {
        $("#cartDisplay").hide();
       
      })
      $("body").on("click", "#check", (e)=>{
        $('#checkoutForm').show();
        $("#cartDisplay").hide();
        
      })


    const showStore = () => {
        $('section#storePage').show();
        $('section#checkoutForm').hide();
        $('.price').hide();
        $('.description').hide();
    }

    const showCheckout = () => {
        $('#storePage').hide();
        $('#checkoutForm').show();
        $('.welcome-block').hide();

        $('#cartDisplay').hide
        if(cart.lineItems.length > 0) {
            $('#emptyCartWarning').hide();
            $('#paymentInfo').show();
            $('#cashInfo #cashRequired').text(`Please pay ${cart.getTotal()}`);
        } else {
            $('#emptyCartWarning').show();
            $('#paymentInfo').hide();
        }
    }

    // This will grab the cash required amount and the
    // cash given amount and calculate the amount of change
    // due.
    // If negative, then we know the user needs to input
    // more cash.
    const calculateChange = () => {
        const costReq = cart.getTotal();
        let cashInput = parseFloat($('#cashInfo #cashGiven').val());
        console.log(costReq, cashInput);
        return cashInput - costReq;
    }

    $("body").on("click", "#check", (e)=>{
        $("#cartDisplay").hide();
        showCheckout();
    });

    let item = [
        new Item("The Seat of Iron", 1200, "description", 'newimages/fancy-chair.jpg'),
        new Item("Oak Throne", 600, "description", 'newimages/hand-throne.jpg'),
        new Item("The Golden serpant seat", 400, "description", 'newimages/small-wooden.jpg'),
        new Item("The Watcher", 650, "description", 'newimages/viking-chair.jpg'),
        new Item("The All Father", 1200, "description", 'newimages/wooden-throne.jpg'),
        new Item("Wyvern Fury", 300, "description", 'newimages/simple-design.jpg'),
        new Item("The Wolves Maw", 1500, "description", 'newimages/scary-chair.jpg'),
        new Item("Muh Ladies Throne", 950, "description", 'newimages/metal-throne.jpg'),
        new Item("Loki's Dream", 400, "description", 'newimages/loks-dream.jpg'),
        new Item("Seat of Pain", 500, "description", 'newimages/iron-throne.jpg'),
        new Item("Valkyrie's Kiss", 700, "description", 'newimages/carved-chair.jpg'),
        new Item("Jormungander", 500, "description",'newimages/braided-wood.jpg')
    ];

   
    $('body').on('click', '#storeProducts .picture', (e) => {
    // for (let i =0; i < item.length; i++)
    // let index = parseInt($(e.target).val());
    // let descriptionParent = $('#storeProducts').children().eq(index); {
    //     if ($('#storeProducts.description').val() === item[i].picture){
            index = $(e.target);
            let descriptions = $('.description');
            let prices = $('.price');

            for(let i = 0; i < descriptions.length; i++) {
                //grabs description/price from description(i)/price(i)
                let description = descriptions.eq(i);
                let price = prices.eq(i);
                if ($(e.target).hasClass(`${i}`))  {
                    if (price.hasClass("clicked")){
                        price.removeClass("clicked").slideUp();
                        description.removeClass('clicked').slideUp();
                    } else {
                        price.slideDown().addClass("clicked");
                        description.slideDown().addClass("clicked");
                    }
                }
            }
          
     })

//      $('body').on('click', '#storeProducts .picture', '.clicked', (e) => {
//         $('#storeProducts .price').slideUp();
//         $('#storeProducts .description').slideUp();
//  })
   

//loops through item array to display all 12 items including name, price, description, and image






   for (let i =0; i < item.length; i++) {
   $("#storeProducts").append(
       ` <section class='wrapper'>
            <p class="name">${item[i].name}</p>

            <p class="price ${i}">$${item[i].price}</p>
            <p class="description ${i}">${item[i].description}</p>
            <img class="picture ${i}"  src = '${item[i].picture}'>
            <button id="add" value='${[i]}'>Add To Cart</button>

        </section>`)
    }



    showStore();
});
