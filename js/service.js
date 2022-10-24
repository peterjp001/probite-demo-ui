function showMessage(type,message){
    $('#message').removeClass('d-none');
    $('#message').fadeIn('slow'); 
    $('#message').addClass(type);
    $('#message').text(message); 
}

function meeting(datas){
    $.ajax({
        method : "POST",
        url : 'http://localhost:9091/api/v1/meeting', 
        headers: { 'Content-Type': 'application/json'},
        data : JSON.stringify(datas),
     }).done(function(response){
        showMessage("bg-success",JSON.stringify(response));
    }).fail(function (jqXHR) {
        if(jqXHR.status == 400){
            showMessage("bg-danger",JSON.stringify(jqXHR.responseJSON.errorMessage));
        } else{
            showMessage("bg-danger",JSON.stringify(jqXHR.responseJSON));
        }
        // $('#message').removeClass('d-none');
        //     $('#message').fadeIn('slow'); 
        //     $('#message').addClass('bg-danger');
        //     $('#message').text(JSON.stringify(jqXHR.responseJSON));  
    });
}

export   { meeting }