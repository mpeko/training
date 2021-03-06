/*
JSトレーニングステップ6 【問題の切り替え】
*/

$(function(){
    
    var wordBookList = [];          // 単語データ
    var rewordIndex = 0;            // 編集する単語のindex
    var showQuestionIndex = 0;      // 出題されている単語のindex
    var editBtn = '<input type="button" value="編集" class="js-editBtn">';

    $('.js-wordBookListGroup').addClass('hide');
    $('.questionGroup').addClass('hide');

    // 単語を追加
    $('.js-addBtn').click(function(){

        var check = validation();
        if (!check) return;

        wordBookList.push({ word: $('.js-word').val(), meaning: $('.js-meaning').val()});

        var word = '';
        var meaning = '';

        for (var i = 0; i < wordBookList.length; i++) {
            if (i == (wordBookList.length-1)) {
                word = wordBookList[i].word;
                meaning = wordBookList[i].meaning;
                showQuestionIndex = i;
            }
        }

        $('.js-wordCard').text(word);
        $('.js-meaningCard').text(meaning).addClass('hide');

        $('.js-word').val('');
        $('.js-meaning').val('');

        checkQuestionBtn();

        $('.questionGroup').removeClass('hide');
    })

    // 単語一覧を表示
    $('.js-wordListBtn').click(function(){

        $('.js-wordBookList ul').remove();
        $('.js-wordBookListGroup').removeClass('hide');

        var word_list = '<ul>';
        for (var i = 0; i < wordBookList.length; i++) {
            word_list += "<li>"+wordBookList[i].word +' : '+ wordBookList[i].meaning + editBtn +"</li>"
        }

        word_list += '</ul>';
        $(".js-wordBookList").append(word_list);
    })

    // 単語編集
    $('.js-wordBookList').on('click', 'input' ,function() {
        rewordIndex = $('.js-editBtn').index(this);

        $('.js-reword').val(wordBookList[rewordIndex].word);
        $('.js-reneaning').val(wordBookList[rewordIndex].meaning);
    });

    // 単語更新
    $('.js-renewalBtn').click(function(){
        wordBookList[rewordIndex].word = $('.js-reword').val();
        wordBookList[rewordIndex].meaning = $('.js-reneaning').val();

        var renewal = wordBookList[rewordIndex].word +' : '+ wordBookList[rewordIndex].meaning + editBtn;
        $('.js-wordBookList > ul > li:eq('+rewordIndex+')').html(renewal);

        $('.js-reword').val('');
        $('.js-reneaning').val('');
    });

    // 単語一覧を閉じる
    $('.js-closeWordListBtn').click(function(){
        $('.js-wordBookListGroup').addClass('hide');
    });

    // 答えを見る
    $('.js-answerBtn').click(function(){
        $('.js-wordBookListGroup').addClass('hide');
        $('.js-meaningCard').removeClass('hide');
    });
    
    // 戻る
    $('.js-prevBtn').click(function(){
        showQuestionIndex -= 1; 
        chengeQuestion();
        checkQuestionBtn();
    });

    // 進む
    $('.js-nextBtn').click(function(){
        showQuestionIndex += 1; 
        chengeQuestion();
        checkQuestionBtn();
    });

    // 問題の切り替え
    function chengeQuestion(){
        $('.js-wordCard').text(wordBookList[showQuestionIndex].word);
        $('.js-meaningCard').text(wordBookList[showQuestionIndex].meaning);
    }

    // 戻る/進む ボタンの切り替え
    function checkQuestionBtn(){
        if(showQuestionIndex == 0) {
            $('.js-prevBtn').addClass('hide');
        } else {
            $('.js-prevBtn').removeClass('hide');
        }
        if(showQuestionIndex == wordBookList.length-1) {
            $('.js-nextBtn').addClass('hide');
        } else {
            $('.js-nextBtn').removeClass('hide');
        }
    }

    // バリデーション
    function validation(){

        var errorMsg = '';
        $('.js-errorMsg').remove();

        if($('.js-word').val() == ''){
            errorMsg += '単語を入力してください。';
        }

        if($('.js-meaning').val() == ''){
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
