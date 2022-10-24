$(document).ready(function() {
    function getInputData() {
    let $inputs = $("#formSubmit :input");
    let values = {};
    $inputs.each(function() {
        if (this.type != 'reset') {
            let data = $(this).val();
            if(this.name !== null && this.name !== ''){
                    values[this.name] = data;
            }
        }
    });
    return values;
}


$( "#formSubmit" ).submit(function( event ) {
    event.preventDefault();
    let inputs = getInputData();
    // if(inputs)
    
    if(inputs.username == "" || inputs.password == ""){
        $('#message').removeClass('d-none');
        $('#message').fadeIn('slow'); 
        $('#message').text("Usernane and password Requires"); 
    }else{
        $('#message').addClass('d-none'); 
        console.log(sendData(inputs));  
    }

  });

   function sendData(datas){ 
    $.ajax({
        method : "POST",
        url : 'http://localhost:9090/api/v1/login',
        data : datas,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).done(function(response){
        let result = JSON.parse(response); 
        localStorage.setItem('accessToken', result.access_token);
        localStorage.setItem('refreshToken', result.refresh_token);
    }).fail(function (jqXHR, textStatus) {
        console.log(JSON.stringify(jqXHR)+' / '+JSON.stringify(textStatus));
    });
}



 

});

