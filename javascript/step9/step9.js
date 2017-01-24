/*
JSトレーニング9 オブジェクトを使用したリファクタリング
*/

$(function(){

    var wordBookObj = {
        wordBookList : [],      // 単語データ
        questionIndex : 0,      // 出題されている単語のindex
        updateIndex : 0,        // 編集する単語のindex
        // 単語追加
        add: function(text1, text2){
            this.wordBookList.push({ word: text1, meaning: text2});
            this.setQuestionIndex(this.wordBookList.length - 1);
            var word = this.wordBookList[this.getQuestionIndex()].word;
            var meaning = this.wordBookList[this.getQuestionIndex()].meaning;
        },
        // 編集する単語のindex
        editIndex: function(index){
            this.updateIndex = index;
        },
        // 単語更新
        update: function(text1, text2){
            this.wordBookList[this.updateIndex].word = text1;
            this.wordBookList[this.updateIndex].meaning = text2;
        },
        // 問題index set
        setQuestionIndex: function(index){
            this.questionIndex = index;
        },
        // 問題index get
        getQuestionIndex: function(){
            return this.questionIndex;
        }
    }

    var editBtn = '<input type="button" value="編集" class="js-editBtn">';
    $('.js-wordBookListGroup').addClass('hide');
    $('.questionGroup').addClass('hide');

    // 単語を追加
    $('.js-addBtn').click(function(){

        var check = validation();
        if (!check) return;

        var word = $('.js-word').val();
        var meaing = $('.js-meaning').val();
        wordBookObj.add(word, meaing);
 
        $('.js-wordCard').text(word);
        $('.js-meaningCard').text(meaing).addClass('hide');

        $('.js-word').val('');
        $('.js-meaning').val('');

        changeQuestionBtn();

        $('.questionGroup').removeClass('hide');
    })

    // 単語一覧を表示
    $('.js-wordListBtn').click(function(){
        $('.js-wordBookList ul').remove();
        $('.js-wordBookListGroup').removeClass('hide');

        var word_list = '<ul>';
        for (var i = 0; i < wordBookObj.wordBookList.length; i++) {
            word_list += "<li>"+wordBookObj.wordBookList[i].word +' : '+ wordBookObj.wordBookList[i].meaning + editBtn +"</li>"
        }
        word_list += '</ul>';

        $(".js-wordBookList").append(word_list);
    });

    // 単語編集
    $('.js-wordBookList').on('click', 'input' ,function() {
        var index = $('.js-editBtn').index(this);
        wordBookObj.editIndex(index);
        $('.js-updateWord').val(wordBookObj.wordBookList[wordBookObj.updateIndex].word);
        $('.js-updateMeaning').val(wordBookObj.wordBookList[wordBookObj.updateIndex].meaning);
    });

    // 単語更新
    $('.js-updateBtn').click(function(){
        var word = $('.js-updateWord').val();
        var meaing = $('.js-updateMeaning').val();

        wordBookObj.update(word, meaing);

        var updateWord = wordBookObj.wordBookList[wordBookObj.updateIndex].word;
        var updateMeaning = wordBookObj.wordBookList[wordBookObj.updateIndex].meaning;
        $('.js-wordBookList > ul > li:eq('+wordBookObj.updateIndex+')').html(updateWord +' : '+ updateMeaning + editBtn);

        $('.js-updateWord').val('');
        $('.js-updateMeaning').val('');
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
        var index = wordBookObj.getQuestionIndex();
        wordBookObj.setQuestionIndex(index -= 1);
        changeQuestion();
        changeQuestionBtn();
    });

    // 進む
    $('.js-nextBtn').click(function(){
        var index = wordBookObj.getQuestionIndex();
        wordBookObj.setQuestionIndex(index += 1);
        changeQuestion();
        changeQuestionBtn();
    });

    // 問題の切り替え
    function changeQuestion(){
        $('.js-wordCard').text(wordBookObj.wordBookList[wordBookObj.getQuestionIndex()].word);
        $('.js-meaningCard').text(wordBookObj.wordBookList[wordBookObj.getQuestionIndex()].meaning);
    }

    // 戻る/進む ボタンの切り替え
    function changeQuestionBtn(){
        if(wordBookObj.getQuestionIndex() == 0) {
            $('.js-prevBtn').addClass('hide');
        } else {
            $('.js-prevBtn').removeClass('hide');
        }
        if(wordBookObj.getQuestionIndex() == wordBookObj.wordBookList.length-1) {
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