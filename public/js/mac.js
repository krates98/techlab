$(document).ready(function() {
    $(".delete").hide();
    //when the Add Field button is clicked
    $("#add").click(function(e) {
      $(".delete").fadeIn("1500");
      $("#inputform").val($(".input-md1").length); 
      //Append a new row of code to the "#items" div
      $("#itemsfor").append(
        '<div class="margin-bottom next-input input-md1"><hr><input id="textinput" name="macaddress" type="text" placeholder="Enter MAC Address of Machine" class="form-control "></div>'
      );
    });
    $("body").on("click", ".delete", function(e) {
      $(".next-input").last().remove();
      $("#inputform").val($(".input-md1").length);
    });
    
  });



  
  