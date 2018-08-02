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
        lineItems = [];
    }
    addItem(item, quantity) {
        let newLineItem = null;
        if (lineItems.length > 0) {
            for (let i = 0; i < lineItems.length; i++) {
                if (lineItems[i].compare(item)) {
                    newLineItem = lineItems[i];
                    lineItems[i].quantity += quantity;
                }
            }
        }
        if (!newLineItem) {
            lineItems.push(new LineItem(item, quantity));
        }
        displayCart()
    } 

     displayCart() {


        cartdata = '<table><tr><th>Product Name</th><th>Price</th><th>Quantity</th><th>subTotal</th><th>Total</th></tr>';

        subtotal = 0;
        total = 0;

        for (i = 0; i < lineItems.length; i++) {
            subtotal = lineItems[i].quantity * lineItems[i].item.price;
            total += subtotal + (subtotal * .06)
            cartdata += "<tr><td>" + lineItems[i].item.name[i] + "</td><td>" +lineItems[i].item.price + "</td><td>" +lineItems[i].quantity + "</td><td>" +lineItems[i].quantity * lineItems[i].item.price + "</td><td><button onclick='delElement(" + i + ")'>Delete</button></td></tr>"
        }

        cartdata += '<tr><td></td><td></td><td></td>' + subtotal + '</td><td>' + total + '</td></tr></table>'

        document.getElementById('cart').innerHTML = cartdata

    }
}




$(document).ready( () => {
    $('#ccInfo').hide();
    $('#cashInfo').hide();

    $('body').on('change', '#checkoutForm input[type=radio]', (e) => {
        if ($(e.target).attr('id') === 'cash') {
            $('#ccInfo').hide();
            $('#cashInfo').show();
        } else if ($(e.target).attr('id') === 'creditCard') {
            $('#ccInfo').show();
            $('#cashInfo').hide();
        }
    });


    // inames = []
    // iqty = []
    // iprice = []

    // function addItem() {

    //     inames.push(document.getElementById('name').value)
    //     iqty.push(parseInt(document.getElementById('price').value))
    //     iprice.push(parseInt(document.getElementById('qty').value))

    //     displayCart()

    // }

   


    function delElement(a) {
        inames.splice(a, 1);
        iqty.splice(a, 1)
        iprice.splice(a, 1)
        displayCart()
    }

    $('body').on('click', '.cart #haul', () => {

        showCheckout()
    })


    //When "products" is clicked from the checkout page, takes you back to the products page
    $('body').on('click', '.home a', ()=>{
        showStore()
    } )

    const showStore = () => {
        $('section#storePage').show();
        $('section#checkoutForm').hide()
        $('.home a').hide();
        $('.cart #haul').show();
    }

    const showCheckout = () => {
        $('#storePage').hide()
        $('.cart #haul').hide();
        $('#checkoutForm').show();
        $('.home a').show();
    }

    showStore();

  // array of item objects. Holds info including: name, price, description, and image link
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


//loops through item array to display all 12 items including name, price, description, and image
   for (let i =0; i < item.length; i++) {
   $("#storeProducts").append(` <section>

        <p>${item[i].name}</p>
        <p>$${item[i].price}</p>
        <p>${item[i].description}</p>
        <img src = '${item[i].picture}'>
   </section>`)
    }
});
