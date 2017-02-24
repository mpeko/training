$(function(){

    var count = 0;
    var setIntervalId = 0;

    $('#stop').hide();

    $('#start').click(function(){
        $('#time').html(count);
        counter();
        $('#start').hide();//css('display', 'none');と同じ
        $('#stop').show();
    })

    function counter() {
        setIntervalId = setInterval(function(){
            count++;
            $('#time').html(count);
        }, 1000);
    }

    $('#stop').click(function(){
        clearInterval(setIntervalId);
    })

    $('#clear').click(function(){
        count = 0;
        $('#time').html(0);
        $('#start').show();
        $('#stop').hide();
    })

    // setTimeout 一定時間後に特定の処理をおこなう（繰り返さずに一度だけ）
    // setInterval 繰り返し
});