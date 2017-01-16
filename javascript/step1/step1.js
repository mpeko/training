/*
JSトレーニングステップ1 【単語の登録】
*/

$(function(){
    
    var wordBookList = [];

    $('#js-add').click(function(){
        wordBookList.push({ word: $('#js-word').val(), meaning: $('#js-meaning').val()});

        for (var i = 0; i < wordBookList.length; i++) {
          console.log('wordBookList[i].word = ' + wordBookList[i].word + ' wordBookList[i].meaning = ' +wordBookList[i].meaning);
        }
    })
});
