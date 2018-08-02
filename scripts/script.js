class Item {
      constructor(name, price, description, picture) {
          this.name = name;
          this.price = price;
          this.description = description;
          this.picture = picture;
      }
  }

// for (let i=0; i< item.length; i++)
// console.log(i)

$(document).ready( () => {
    $('#ccInfo').hide();
    $('#cashInfo').hide();

    $('body').on('change', '#checkoutForm input[type=radio]', (e)=> {
        if($(e.target).attr('id')==='cash') {
            $('#ccInfo').hide();
            $('#cashInfo').show();
        } else if ($(e.target).attr('id')==='creditCard') {
            $('#ccInfo').show();
            $('#cashInfo').hide();
        }
    });

    $('body').on('click', '.cart #haul', ()=>{
        showCheckout()
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

   for (let i =0; i < item.length; i++) {
   $("#storeProducts").append(` <section>
        <p>${item[i].name}</p>
        <p>$${item[i].price}</p>
        <p>${item[i].description}</p>
        <img src = '${item[i].picture}'>
   </section>`)
   }
});
