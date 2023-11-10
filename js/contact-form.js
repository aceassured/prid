/* ---------------------------------------------
 Contact form
 --------------------------------------------- */
$(document).ready(function(){

    // $.ajax({ cache: false,
    //     url: "https://aceassured.github.io/prid",
    //     dataType : 'json',
    //     type: 'GET',
    //     xhrFields: { withCredentials: true }
    //     });


    $("#submit_btn").click(function(){
        
        //get input field values
        var user_name = $('input[name=name]').val();
        var user_email = $('input[name=email]').val();
        var user_message = $('textarea[name=message]').val();

        header("Access-Control-Allow-Origin: https://aceassured.github.io/prid");        
        header("Access-Control-Allow-Credentials: true");
        header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        // header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        
        
        

        
        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if (user_name == "") {
            $('input[name=name]').css('border-color', '#e41919');
            proceed = false;
        }
        if (user_email == "") {
            $('input[name=email]').css('border-color', '#e41919');
            proceed = false;
        }
        
        if (user_message == "") {
            $('textarea[name=message]').css('border-color', '#e41919');
            proceed = false;
        }
        
        //everything looks good! proceed...
        if (proceed) {
            //data to be sent to server
            post_data = {
                'userName': user_name,
                'userEmail': user_email,
                'userMessage': user_message
            };
            
            //Ajax post data to server
            $.post('php/contact_me.php', post_data, function(response){
            
                //load json data from server and output message     
                if (response.type == 'error') {
                    output = '<div class="error">' + response.text + '</div>';
                    
                }
                else {
                
                    output = '<div class="success">' + response.text + '</div>';
                    // output = '<div class="error"> haiii </div>'
                    
                    //reset values in all input fields
                    $('#contact_form input').val('');
                    $('#contact_form textarea').val('');
                }
                
                $("#result").hide().html(output).slideDown();
            }, 'json');
            
        }
        
        return false;
    });
    
    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").keyup(function(){
        $("#contact_form input, #contact_form textarea").css('border-color', '');
        $("#result").slideUp();
    });
    
});
