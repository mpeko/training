$(function(){
    var flag = true;

    $('#edit').click(function(){

        $('#errorMessege').text('');

        if($('#todoText').val() == ''){
            $('#errorMessege').text('入力してください');
            return;
        }

        if (flag){
            $('#todoList').html('<ul></ul>');
            flag = false;
        }
        
        var li = $('<li>').text($('#todoText').val());
        li.appendTo($('ul'));

        $('#todoText').val('');
    })

    $('#delete').click(function(){
        $('#errorMessege').text('');
        $('#todoList').html('');
        $('#todoText').val('');
        flag = true;
    })
});