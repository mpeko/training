/*
JSトレーニングステップ3 【問題(単語と意味)の出力】 
*/

$(function(){
    
    var wordBookList = [];
    $('#js-wordBookListGroup').addClass('hide');

    // 単語を追加
    $('#js-add').click(function(){
        wordBookList.push({ word: $('#js-word').val(), meaning: $('#js-meaning').val()});

        var word = '';
        var meaning = '';

        for (var i = 0; i < wordBookList.length; i++) {
            if (i == (wordBookList.length-1)) {
                word = wordBookList[i].word;
                meaning = wordBookList[i].meaning;
            }
        }

        $('#js-wordCard').text(word);
        $('#js-meaningCard').text(meaning).addClass('hide');
    })

    // 単語一覧を表示
    $('#js-showWordList').click(function(){

        $('#js-wordBookList ul').remove();
        $('#js-wordBookListGroup').removeClass('hide');

        var word_list = '<ul>';
        for (var i = 0; i < wordBookList.length; i++) {
            word_list += "<li>"+wordBookList[i].word +' : '+ wordBookList[i].meaning+"</li>"
        }

        word_list += '</ul>';
        $("#js-wordBookList").append(word_list);
    })

    // 単語一覧を閉じる
    $('#js-closeWordList').click(function(){
        $('#js-wordBookListGroup').addClass('hide');
    })

    // 答えを見る
    $('#js-answer').click(function(){
        $('#js-wordBookListGroup').addClass('hide');
        $('#js-meaningCard').removeClass('hide');
    })
});
