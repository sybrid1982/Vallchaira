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
  
   let item1 = new Item("Iron Throne", 500, "description", 'images/fancy-chair.jpg')
   let item2 = new Item("Iron Throne", 500, "description", 'images/hand-throne.jpg')
   let item3 = new Item("Iron Throne", 500, "description", 'images/small-wooden.jpg')
   let item4 = new Item("Iron Throne", 500, "description", 'images/viking-chair.jpg')
   let item5 = new Item("Iron Throne", 500, "description", 'images/wooden-throne.jpg')
   let item6 = new Item("Iron Throne", 500, "description", 'images/simple-design.jpg')
   let item7 = new Item("Iron Throne", 500, "description", 'images/scary-chair.jpg')
   let item8 = new Item("Iron Throne", 500, "description", 'images/metal-throne.jpg')
   let item9 = new Item("Loks Dream", 500, "description", 'images/loks-dream.jpg')
   let item10 = new Item("Iron Throne", 500, "description", 'images/iron-throne.jpg')
   let item11 = new Item("Iron Throne", 500, "description", 'images/carved-chair.jpg')
   let item12 = new Item("Iron Throne", 500, "description", 'images/braided-wood.jpg')
});
