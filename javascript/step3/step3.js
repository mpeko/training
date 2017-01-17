/*
JSトレーニングステップ3 【問題(単語と意味)の出力】 
*/

$(function(){
    
    var wordBookList = [];
    $('#js-wordBookListGroup').addClass('hide');

    // 単語を追加
    $('#js-add').click(function(){
        wordBookList.push({ word: $('#js-word').val(), meaning: $('#js-meaning').val()});

        for (var i = 0; i < wordBookList.length; i++) {
            if (i == (wordBookList.length-1)) {
                $('#js-wordCard').text(wordBookList[i].word);
                $('#js-meaningCard').text(wordBookList[i].meaning).addClass('hide');
            }
        }
    })

    // 単語一覧を表示
    $('#js-showWordList').click(function(){

        $('#js-wordBookList ul *').remove();
        $('#js-wordBookListGroup').removeClass('hide');

        for (var i = 0; i < wordBookList.length; i++) {

            var li = document.createElement('li'); 
            li.innerHTML = wordBookList[i].word +' : '+ wordBookList[i].meaning ; 
            var ul = document.getElementsByTagName("ul").item(0); 
            ul.appendChild(li);
        }
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
