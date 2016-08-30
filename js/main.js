/* globals console */
;
(function($, window, document, undefined) {
    'use strict';
  var Message = {

        init: function() {

            $('#frm-babu').on('submit',function(){
                if($("#frm-babu [name='email']").val()=="" || $("#frm-babu [name='password']").val()==""){
                    alert('Enter somthing dude');
                    return false;
                }
            });
        }




    };

       Message.init();

}(jQuery, window, document));
