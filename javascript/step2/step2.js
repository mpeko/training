/*
JSトレーニングステップ2 【登録した単語/意味の出力】
*/

$(function(){
    
    var wordBookList = [];
    $('#js-wordBookListGroup').hide();

    // 単語を追加
    $('#js-add').click(function(){
        wordBookList.push({ word: $('#js-word').val(), meaning: $('#js-meaning').val()});

        // for (var i = 0; i < wordBookList.length; i++) {
        //   console.log('wordBookList[i].word = ' + wordBookList[i].word + ' wordBookList[i].meaning = ' +wordBookList[i].meaning);
        // }
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
});
