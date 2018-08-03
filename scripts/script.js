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
      $("body").on("click", "#check", (e)=>{
        $("#cartDisplay").hide();
        showCheckout();
      })






    const showStore = () => {
        $('section#storePage').show();
        $('section#checkoutForm').hide();
    }

    const showCheckout = () => {
        $('#storePage').hide();
        $('#checkoutForm').show();
        $('#cartDisplay').show();
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

    showStore();

    let item = [
        new Item("Iron Throne", 500, "description", 'newimages/fancy-chair.jpg'),
        new Item("Iron Throne", 500, "description", 'newimages/hand-throne.jpg'),
        new Item("Iron Throne", 500, "description", 'newimages/small-wooden.jpg'),
        new Item("Iron Throne", 500, "description", 'newimages/viking-chair.jpg'),
        new Item("Iron Throne", 500, "description", 'newimages/wooden-throne.jpg'),
        new Item("Iron Throne", 500, "description", 'newimages/simple-design.jpg'),
        new Item("Iron Throne", 500, "description", 'newimages/scary-chair.jpg'),
        new Item("Iron Throne", 500, "description", 'newimages/metal-throne.jpg'),
        new Item("Loks Dream", 500, "description", 'newimages/loks-dream.jpg'),
        new Item("Iron Throne", 500, "description", 'newimages/iron-throne.jpg'),
        new Item("Iron Throne", 500, "description", 'newimages/carved-chair.jpg'),
        new Item("Iron Throne", 500, "description", 'newimages/braided-wood.jpg'),
    ];

   for (let i =0; i < item.length; i++) {

   $("#storeProducts").append(
       ` <section>
            <p class="name">${item[i].name}</p>
            <p class="price">$${item[i].price}</p>
            <p class="description">${item[i].description}</p>
            <img class="picture" src = '${item[i].picture}'>
            <button value='${[i]}'>Add To Cart</button>
        </section>`)
    }
});
