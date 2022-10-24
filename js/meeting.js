$(document).ready(function() {

    function getInputData() {
        let $inputs = $("#formMeeting :input"); 
        let values = {}; 
        
        $inputs.each(function() {
            let data = $(this).val();
            if(this.name !== null && this.name !== ''){ 
                    values[this.name] = data; 
            } 
        }); 
        return values;
    }

    $( "#formMeeting" ).submit(function( event ) {
        event.preventDefault();
        let inputs = getInputData(); 

        if(inputs.lastName == "" || inputs.firstName == "" || inputs.phone == "" || inputs.email == "" || inputs.dateMeeting == "" || inputs.timeMeeting == ""  ){
            showMessage("bg-danger","All Fields Required")
        }else{
            showMessage("bg-success","Processing...... wait a while!");
            meeting(inputs)
        }

  });

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
    });
}

 
function showMessage(type,message){
    $('#message').removeClass('d-none');
    $('#message').fadeIn('slow'); 
    $('#message').addClass(type);
    $('#message').text(message); 
}

});