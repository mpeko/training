/*
JSトレーニングステップ3 【問題(単語と意味)の出力】 
*/

$(function(){
    
    var wordBookList = [];
    $('#js-wordBookListGroup').hide();

    // 単語を追加
    $('#js-add').click(function(){
        wordBookList.push({ word: $('#js-word').val(), meaning: $('#js-meaning').val()});

        for (var i = 0; i < wordBookList.length; i++) {
            if (i == (wordBookList.length-1)) {
                $('#js-wordCard').text(wordBookList[i].word);
                $('#js-meaningCard').text(wordBookList[i].meaning).hide();
            }
        }
    })

    // 単語一覧を表示
    $('#js-showWordList').click(function(){

        $('table#js-wordBookListTable tbody *').remove();
        $('#js-wordBookListGroup').show();

        for (var i = 0; i < wordBookList.length; i++) {
            $('#js-wordBookListTable > tbody').append(
                $('<tr>').append(
                    $('<td>').append(wordBookList[i].word),
                    $('<td>').append(wordBookList[i].meaning)
                )
            );
        }
    })

    // 単語一覧を閉じる
    $('#js-closeWordList').click(function(){
        $('#js-wordBookListGroup').hide();
    })

    // 答えを見る
    $('#js-answer').click(function(){
        $('#js-wordBookListGroup').hide();
        $('#js-meaningCard').show();
    })
});
