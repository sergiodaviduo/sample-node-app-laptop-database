function updateLaptop(name){
    $.ajax({
        url: '/update_laptop/' + name,
        type: 'PUT',
        data: $('#update-laptop').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};