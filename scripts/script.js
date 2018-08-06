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
        this.displayCart(document.getElementById('cart'));
    }
    delElement(i) {
        this.lineItems.splice(i, 1);

        this.displayCart(document.getElementById('cart'));
        this.displayCart(document.getElementById('checkoutCart'));

    }

    displayCart(targetElement) {
        let cartdata = '<table><tr><th>Product Name</th><th>Price</th><th>Quantity</th><th>subTotal</th><th>Total</th></tr>';

        let subtotal = 0;
        let total = 0;

        for (let i = 0; i < this.lineItems.length; i++) {
            subtotal = this.lineItems[i].subtotal();
            total += subtotal + (subtotal * .06)
            // let thumb = (src = this.lineItems[i].item.name);
            let img = '<a href"' + this.lineItems[i].item.picture + '"><img src="' + this.lineItems[i].item.picture + '"/></a>';
            cartdata += "<tr><td>" + this.lineItems[i].item.name + "</td><td>"+'$'+ + this.lineItems[i].item.price + "</td><td>" + this.lineItems[i].quantity + "</td><td>" +'$'+ + this.lineItems[i].subtotal() + "</td><td></td><td><button>Delete</button></td></tr>"

           

        }

        cartdata += '<tr><td></td><td></td><td></td></td><td></td><td>'+'$'+ + total + '</td></tr></table>'

        targetElement.innerHTML = cartdata;

    }


    getTotal() {
        let total = 0;
        let subtotal = 0;
        // Confirm lineItems is not empty, else the total is zero
        if(this.lineItems.length > 0) {
            // Loop through the definitely not empty array of lineItems
            for (let i = 0; i < this.lineItems.length; i++) {
                subtotal = this.lineItems[i].subtotal();
                total += subtotal + (subtotal * .06)
            }
        }
        return total;
    }

    emptyCart(){
        if(this.lineItems.length > 0) {
            while(this.lineItems.length > 0) {
                this.lineItems.pop();
            }
        }
        this.displayCart(document.getElementById('cart'));
        this.displayCart(document.getElementById('checkoutCart'));

    }

}

$(document).ready(() => {
    $('#ccInfo').hide();
    $('#cashInfo').hide();
    $('#bForm').hide();

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

    // The ship button that takes you to the checkout
    $('body').on('click', '.cart #haul', () => {
        showCheckout()
    });
    // The less exciting text products that leads to the store
    $('body').on('click', 'nav .home', () => {
        showStore()
    });

    // ADD TO CART BUTTON
    $('body').on('click', '#storeProducts > section > button', (e) => {
        cart.addItem(item[$(e.target).val()], 1);
        $("#cartDisplay").show();
        // Change the text to added right away
        $(e.target).text('Added');
        // Set a delay for three seconds
        window.setTimeout(changeTextBackToAdded, 3000, e.target);
    });

    const changeTextBackToAdded = (target) => {
        $(target).text('Add To Cart');
    }

    // PLACE ORDER
    $('body').on('click', '#checkoutForm .placeOrder', (e) => {

        // If they're paying cash, check if they've paid enough and if not,
        // Warn them and let them know how much more they still owe
        // Then abort the order
        if ($(e.target).parent().attr('id')==='cashInfo') {
            if(calculateChange() < 0) {
                $('#warning').text(`Insufficent funds, you still owe $${calculateChange()*-1}.`).css('color', 'red');
                return;
            }
        }
        // Make sure the store and checkout are hidden

        $('section#storePage').hide();
        $('section#checkoutForm').hide();
        const $receipt = $('section#receiptForm');
        $receipt.show();
        cart.displayCart(document.getElementById('receiptCart'));
        $('#receiptCart button').hide();
        if((e.target).parentNode.getAttribute('id')==='ccInfo') {
            $('#paidMessage').text(`You paid by credit card`);
        } else if ($(e.target).parent().attr('id')==='cashInfo') {
            $('#paidMessage').text(`You paid by cash and are due $${calculateChange()} in change.`);
        }
    });

    // Hover on checkout cart table should change image
    $('body').on('mouseenter', '#checkoutForm tr', (e)=> {
        // Get the full table
        let parentTable = e.target.parentElement.parentElement;
        // Make sure we're mousing over a row which is neither the total or the header
        if(e.target.tagName.toUpperCase() === 'TD' && parentTable.lastChild !== e.target.parentElement){
            let cartIndex = Array.from(parentTable.children).indexOf(e.target.parentElement);
            // We actually need to remove one from cartIndex since the header 
            // is the first child at index 0 and the first cart item in it is index 1
            // while the cart's first index is at 0 and not 1
            cartIndex -= 1;
            // Pass that number in to showCartImage
            showCartImage(cartIndex);
        }
    }); 

    // Delete Button Event
    $('body').on('click', 'table button', (e) => {
        // If we're on the checkout form, and we delete an item, it might be
        // the last and we need to show the empty cart display now
        let checkoutForm = document.getElementById('checkoutForm');
        // If this is true, then the delete button was pressed on the
        // checkout page
        if($.contains(checkoutForm, e.target)) {
            // If cart.lineItems.length is 1, then when we delete it,
            // the cart will be empty, and we need to display the
            // empty cart message
            if(cart.lineItems.length <= 1) {
                showEmptyCartCheckout();
            }
        }
        // Now that we've handled all the checkout page cart shenanigans,
        // we can just delete the item
        cart.delElement($(e.target).val());
    });

    // Hide Cart if you click the (x) button or continue shopping button
    $("body").on("click", "#cartDisplay img:first", (e) => {
        $("#cartDisplay").hide();
    })
    // Same, if you click on 'continue shopping'
    $("body").on("click", "#continue", (e) => {
        $("#cartDisplay").hide();
    })
    // If you checkout, hide the cart and show the checkout page
    $("body").on("click", "#check", (e)=>{
        showCheckout();
    });
    $('body').on('click', '#checkoutContinue', () => {
        showStore();
    });
    // Clear the cart
    $('body').on('click', '#emptyCart', () => {
        cart.emptyCart();
        showCheckout();
    });

    $("body").on("click", ".pic", (e)=>{
        $("#bForm").show();
    });

    // Hide badgerForm if you click the (x) button
    $("body").on("click", "#bForm img:first", (e) => {
        $("#bForm").hide();
    });
    $("body").on("click", "#bad", (e)=>{
        $("#bForm").hide();
    });

    $("body").on("click", ".logo", (e)=>{
        showStore();
    })

    const showStore = () => {
        $('section#storePage').show();
        $('section#checkoutForm').hide();
        $('.price').hide();
        $('.description').hide();
        $('.welcome-block').show();

        // Hide the ship button
        $('nav .cart').show();
        // Show the home button
        $('nav .home').hide();
        // Hide the receipt page
        $('#receiptForm').hide();
    }

    const showCartImage = (index) => {
        // If we pass an index out of range, just grab the first item image
        if(index > cart.lineItems.length) {
            index = 0;
        }
        // If we have anything in the cart, then grab the image at the index
        if(cart.lineItems.length > 0) {
            $('#cartContainer img').show();
            $('#cartContainer img').eq(0).prop('src', cart.lineItems[index].item.picture);
        } else {
            // The cart is empty, so hide the image altogether
            $('#cartContainer img').hide();
        }
    }

    const showCheckout = () => {
        // Hide the store page
        $('#storePage').hide();
        // Show the checkout
        $('#checkoutForm').show();
        // Hide the welcome block
        $('.welcome-block').hide();
        // Hide the cart display
        $('#cartDisplay').hide();
        // Hide the ship button
        $('nav .cart').hide();
        // Show the home button
        $('nav .home').show();
        // Hide the receipt form
        $('#receiptForm').hide();

        cart.displayCart(document.getElementById('checkoutCart'));

        if(cart.lineItems.length > 0) {
            $('#emptyCartWarning').hide();
            $('#paymentInfo').show();
            $('#cashInfo #cashRequired').text(`Please pay ${cart.getTotal()}`);
        } else {
            showEmptyCartCheckout();
        }
        showCartImage(0);
    }

    const showEmptyCartCheckout = () => {
        $('#emptyCartWarning').show();
        $('#paymentInfo').hide();
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

        new Item("The Seat of Iron", 1200, "Created by 12 Dwarfs of Nathgar, this seat offers only the best cushion for your push", 'newimages/fancy-chair.jpg'),
        new Item("Oak Throne", 600, "The wood of this throne has been blessed by the moon goddess", 'newimages/hand-throne.jpg'),
        new Item("The Golden Serpant Seat", 400, "This seat has been bitten by 12,000 serpent fangs, their venom was like melted gold", 'newimages/small-wooden.jpg'),
        new Item("The Watcher", 650, "This throne watches over your dreams as you drift to rest after a long days battle", 'newimages/viking-chair.jpg'),
        new Item("The All Father", 1200, "Carry we, who die in battle. Over land and sea, across the rainbow bridge to Vallhala. Odins waiting for me.", 'newimages/wooden-throne.jpg'),
        new Item("Wyvern Fury", 300, "After the battle with the dragon, Hookfang. The only thing standing in the city of Ashtin was this  throne", 'newimages/simple-design.jpg'),
        new Item("The Wolves Maw", 1500, "Only an Alpha may sit in this throne, the entire throne is crafted from rusted swords who have wronged the Wolf King", 'newimages/scary-chair.jpg'),
        new Item("Muh Ladies Throne", 950, "This chair is as old and as mystrioues as time, passed down from kingdom to kingdom, legend says this seat shapes to the users butt", 'newimages/metal-throne.jpg'),
        new Item("Loki's Dream", 400, "Binded from bones of frost elves, the skeleton has aged into it's elder state", 'newimages/loks-dream.jpg'),
        new Item("Seat of Pain", 500, "A fitting gift for your ex, this one-ton block of aged metal will punish", 'newimages/iron-throne.jpg'),
        new Item("Valkyrie's Kiss", 700, "Created from the remains of Odins lost ship", 'newimages/carved-chair.jpg'),
        new Item("Jormungander", 500, "Binded by Vikings and shaped with a Dragons scale, will be the topic of discussion at your next tavern social",'newimages/braided-wood.jpg')
    ];

    // When you click on a picture in the store, it will slide down to show the
    // description and price, or slide back up to hide it if necessary
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
            <button id="add" class="cart-button" value='${[i]}'>Add To Cart</button>

        </section>`)
    }

    showStore();
});
