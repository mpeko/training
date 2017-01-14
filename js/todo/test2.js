$(function(){

    var todoList = '';
    var todo = '';
    var flag = true;

    $('#edit').click(function(){

        $('#errorMessege').html('');

        if($('#todoText').val() == ''){
            $('#errorMessege').html('入力してください');
            return;
        }

        if (flag){
            $('#todoList').html('<ul></ul>');
            flag = false;
        }
        
        todo = '<li>'+ $('#todoText').val() + '</li>';
        todoList = todoList + todo;

        $('ul').html(todoList);
        $('#todoText').val('');
    })

    $('#delete').click(function(){
        $('#errorMessege').html('');
        $('#todoList').html('');
        flag = true;
        todoList = '';
    })
});