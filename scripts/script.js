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

     displayCart() {


       let cartdata = '<table><tr><th>Product Name</th><th>Price</th><th>Quantity</th><th>subTotal</th><th>Total</th></tr>';

        let subtotal = 0;
        let total = 0;

        for (let i = 0; i < this.lineItems.length; i++) {
            subtotal = this.lineItems[i].quantity * this.lineItems[i].item.price;
            total += subtotal + (subtotal * .06)
            cartdata += "<tr><td>" + this.lineItems[i].item.name + "</td><td>" +this.lineItems[i].item.price + "</td><td>" +this.lineItems[i].quantity + "</td><td>" +this.lineItems[i].quantity * this.lineItems[i].item.price + "</td><td><button onclick='delElement(" + i + ")'>Delete</button></td></tr>"
        }

        cartdata += '<tr><td></td><td></td><td></td>' + subtotal + '</td><td>' + total + '</td></tr></table>'

        document.getElementById('cart').innerHTML = cartdata

    }
}




$(document).ready(() => {
    $('#ccInfo').hide();
    $('#cashInfo').hide();

    let cart = new Cart();

    $('body').on('change', '#checkoutForm input[type=radio]', (e) => {
        if ($(e.target).attr('id') === 'cash') {
            $('#ccInfo').hide();
            $('#cashInfo').show();
        } else if ($(e.target).attr('id') === 'creditCard') {
            $('#ccInfo').show();
            $('#cashInfo').hide();
        }
    });

  

   


    function delElement(a) {
        inames.splice(a, 1);
        iqty.splice(a, 1)
        iprice.splice(a, 1)
        displayCart()
    }

    $('body').on('click', '.cart #haul', () => {
        showCheckout()
    })
    $('body').on('click', '#storeProducts > section > button', (e)=> {
        cart.addItem(item[$(e.target).val()], 1);
    })

    const showStore = () => {
        $('section#storePage').show();
        $('section#checkoutForm').hide();
    }

    const showCheckout = () => {
        $('#storePage').hide();
        $('#checkoutForm').show();
    }

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

    for (let i = 0; i < item.length; i++) {
        $("#storeProducts").append(` <section>
        <p>${item[i].name}</p>
        <p>$${item[i].price}</p>
        <p>${item[i].description}</p>
        <img src = '${item[i].picture}'>
        <button value='${[i]}'>Add To Cart</button>
   </section>`)
    }
});
