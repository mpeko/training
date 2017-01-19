/*
JSトレーニングステップ5 【単語/意味の編集】
*/

$(function(){
    
    var wordBookList = [];  // 単語データ
    var rewordIndex = 0;    // 編集する単語のindex
    var editBtn = '<input type="button" value="編集" class="js-editBtn">';

    $('#js-wordBookListGroup').addClass('hide');

    // 単語を追加
    $('#js-addBtn').click(function(){

        var check = validation();
        if (!check) return;

        wordBookList.push({ word: $('#js-word').val(), meaning: $('#js-meaning').val()});

        var word = wordBookList[wordBookList.length-1].word;
        var meaning = wordBookList[wordBookList.length-1].meaning;

        $('#js-wordCard').text(word);
        $('#js-meaningCard').text(meaning).addClass('hide');

        $('#js-word').val('');
        $('#js-meaning').val('');
    })

    // 単語一覧を表示
    $('#js-wordListBtn').click(function(){

        $('#js-wordBookList ul').remove();
        $('#js-wordBookListGroup').removeClass('hide');

        var wordList = '<ul>';
        for (var i = 0; i < wordBookList.length; i++) {
            wordList += "<li>"+wordBookList[i].word +' : '+ wordBookList[i].meaning + editBtn +"</li>"
        }

        wordList += '</ul>';
        $elm = $(wordList).appendTo("#js-wordBookList");

        // 単語編集
        $elm.find('input').click(function() {
            rewordIndex = $('.js-editBtn').index(this);
            $('.js-reword').val(wordBookList[rewordIndex].word);
            $('.js-reneaning').val(wordBookList[rewordIndex].meaning);
        });
    })

    // 単語更新
    $('.js-renewalBtn').click(function(){
        wordBookList[rewordIndex].word = $('.js-reword').val();
        wordBookList[rewordIndex].meaning = $('.js-reneaning').val();

        var renewal = wordBookList[rewordIndex].word +' : '+ wordBookList[rewordIndex].meaning + editBtn;
        $('#js-wordBookList > ul > li:eq('+rewordIndex+')').html(renewal);

        $('.js-reword').val('');
        $('.js-reneaning').val('');
    });

    // 単語一覧を閉じる
    $('#js-closeWordListBtn').click(function(){
        $('#js-wordBookListGroup').addClass('hide');
    });

    // 答えを見る
    $('#js-answerBtn').click(function(){
        $('#js-wordBookListGroup').addClass('hide');
        $('#js-meaningCard').removeClass('hide');
    });
    
    // バリデーション
    function validation(){

        var errorMsg = '';
        $('.js-errorMsg').remove();

        if($('#js-word').val() == ''){
            errorMsg += '単語を入力してください。';
        }

        if($('#js-meaning').val() == ''){
            errorMsg += '意味を入力してください。';
        }

        if(errorMsg) {
            errorMsg = '<p class="js-errorMsg">'+ errorMsg +'</p>'
            $(".js-addGroup").append(errorMsg);
            return false;
        } else {
            return true;
        }
    }
    
});
