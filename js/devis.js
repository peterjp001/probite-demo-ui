$(document).ready(function() {
 
    function getInputData() {
        let $inputs = $("#formDevis :input"); 
        let values = {}; 
        
        $inputs.each(function() {
            let data = $(this).val();
            if(this.name !== null && this.name !== '' && this.name !== "attachment"){ 
                    values[this.name] = data; 
            } 
        });

 
    return values;
       
    }

    $( "#formDevis" ).submit(function( event ) {
        event.preventDefault();
        let inputs = getInputData(); 
        if(inputs.lastName == "" || inputs.firstName == "" || inputs.phone == "" || inputs.email == "" || inputs.typeDs == "" || inputs.timeMeeting == "" || $('#attachment').val() == ""  ){
            showMessage("bg-danger","All Fields Required")
        }else{
            showMessage("bg-success","Processing...... wait a while!");
            devis(inputs)
        } 
  });

  function devis(datas){
    var formData = new FormData();
    formData.append("attachment",$('#attachment').get(0).files[0]); 
    formData.append("devis", JSON.stringify(datas) );
     
    $.ajax({
        method : "POST",
        url : 'http://localhost:9091/api/v1/send/devis', 
        processData: false,
        contentType: false,
        data :  formData,
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