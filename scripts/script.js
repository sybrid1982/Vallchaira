$(document).ready( () => {
    $('body').on('change', '#checkoutForm input[type=radio]', (e)=> {
        if($(e.target).attr('id')==='cash') {
            $('#ccInfo').hide();
            $('#cashInfo').show();
        } else if ($(e.target).attr('id')==='creditCard') {
            $('#ccInfo').show();
            $('#cashInfo').hide();
        }
    })
});