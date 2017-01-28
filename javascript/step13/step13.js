/*
JSトレーニング13 【単語帳の複数登録を行える様にする】 
*/

$(function(){
        
    var wordBookObj = {
        wordBookNameList : [{"name": "fruit"}], // 単語帳
        wordBookList : [[{"word": "apple", "meaning": "りんご"}],[],[],[],[],[]],      // 単語データ6つ
        updateBookNameIndex : 0,                // 編集する単語帳名のindex
        updateWordIndex : 0,                    // 編集する単語のindex
        questionIndex : 0,
        questionWordIndex : 0,                      // 出題されている単語のindex
        // 単語帳（単語帳名）追加
        addBookName: function(text){
            this.wordBookNameList.push({name:text});
        },
         // 編集する単語帳名のindex
        editBookNameIndex: function(index){
            this.updateBookNameIndex = index;
        },
        // 単語帳名更新
        updateBookName: function(text){
            this.wordBookNameList[this.updateBookNameIndex].name = text;
        },
        // 単語追加
        addWord: function(text1, text2){
            this.wordBookList[this.updateBookNameIndex].push({ word: text1, meaning: text2 });
        },
        // 編集する単語のindex
        editWordIndex: function(index){
          this.updateWordIndex = index;
        },
        // 単語更新
        updateWord: function(text1, text2){
            this.wordBookList[this.updateWordIndex].word = text1;
            this.wordBookList[this.updateWordIndex].meaning = text2;
        },
        // 問題index set
        setQuestionIndex: function(index){
            this.questionIndex = index;
        },
        // 問題index get
        getQuestionIndex: function(){
            return this.questionIndex;
        },
        // 問題単語index set
        setQuestionWordIndex: function(index){
            this.questionWordIndex = index;
        },
        // 問題単語index get
        getQuestionWordIndex: function(){
            return this.questionWordIndex;
        }
    }

    var bookNameEditBtn = '<input type="button" value="名前" class="js-bookNameEditBtn">';
    var selectQuestionBtn = '<input type="button" value="問題選択" class="js-selectQuestionBtn">';
    var wordEditBtn = '<input type="button" value="編集" class="js-wordEditBtn">';
    var initList = '<ul><li>'+ wordBookObj.wordBookNameList[0].name + bookNameEditBtn + wordEditBtn + selectQuestionBtn+'</li></ul>'
    
    $('.questionBtnGroup').addClass('hide');
    $('.js-wordBookListGroup').addClass('hide');
    $('.js-wordBookListGroup .js-update').addClass('hide');
    $('.js-wordListGroup').addClass('hide');
    $('.js-wordListGroup .js-update').addClass('hide');
    $('.js-wordCard').text(wordBookObj.wordBookList[0][0].word);
    $('.js-meaningCard').text(wordBookObj.wordBookList[0][0].meaning).addClass('hide');
    $(".js-wordBookListGroup .js-wordBookList").append(initList);

    // 単語帳一覧表示
    $(".js-wordBookListBtn input:button").click(function(){
        $('.js-wordBookListBtn').addClass('hide');
        $('.js-wordBookListGroup').removeClass('hide');
    });

    // 単語帳を追加
    $(".js-wordBookListGroup .js-addBtn").click(function(){

        var check = validation('book');
        if (!check) return;

        var name = $('.js-wordListName').val();
        wordBookObj.addBookName(name);
        showWordBookList();
        $('.js-wordListName').val('');
    });

    // 単語帳表示
    function showWordBookList(){

        $('.js-wordBookList ul').remove();

        var list = '<ul>';
        for (var i = 0; i < wordBookObj.wordBookNameList.length; i++) {
            list += "<li>"+wordBookObj.wordBookNameList[i].name + bookNameEditBtn + wordEditBtn + selectQuestionBtn +"</li>"
        }
        list += '</ul>';

        $(".js-wordBookList").append(list);
    }

    //
    $('.js-wordBookList').on('click', 'input' ,function() {

        // 単語帳名の編集
        if ($(this).attr('class') == 'js-bookNameEditBtn'){
            var index = $('.js-bookNameEditBtn').index(this);
            wordBookObj.editBookNameIndex(index);
            $('.js-updateName').val(wordBookObj.wordBookNameList[index].name);
            $('.js-wordBookListGroup .js-update').removeClass('hide');
        
        // 単語帳の編集
        } else if ($(this).attr('class') == 'js-wordEditBtn'){
            
            var index = $('.js-wordEditBtn').index(this);
            $('.js-wordListGroup .js-bookName').text(wordBookObj.wordBookNameList[index].name);
            wordBookObj.editBookNameIndex(index);
            $('.js-wordBookListGroup').addClass('hide');
            $('.js-wordListGroup').removeClass('hide');

            showWordList();

        // 問題の選択
        } else if ($(this).attr('class') == 'js-selectQuestionBtn'){
            var index = $('.js-selectQuestionBtn').index(this);
            wordBookObj.setQuestionIndex(index);
            wordBookObj.setQuestionWordIndex(0);
            
            if(wordBookObj.wordBookList[index][0] != undefined){
                changeQuestionBtn();
                $('.questionBtnGroup').removeClass('hide');
                $('.js-wordCard').text(wordBookObj.wordBookList[index][0].word);
                $('.js-meaningCard').text(wordBookObj.wordBookList[index][0].meaning).addClass('hide');
            }
        }
    });

    // 単語帳名の更新
    $(".js-wordBookListGroup .js-update input:button").click(function(){

        var text = $('.js-wordBookListGroup .js-updateName').val();
        wordBookObj.updateBookName(text);
        $('.js-wordBookListGroup .js-updateName').text(text);

        $('.js-wordBookListGroup .js-wordBookList > ul > li:eq('+wordBookObj.updateBookNameIndex+')').html(text + bookNameEditBtn + wordEditBtn);

        $('.js-wordBookListGroup .js-updateName').val('');
        $('.js-wordBookListGroup .js-update').addClass('hide');

    });

    // 単語帳一覧 閉じる
    $(".js-wordBookListGroup .js-closeBtn").click(function(){
        $('.js-wordBookListBtn').removeClass('hide');
        $('.js-wordBookListGroup').addClass('hide');

        $('.js-errorMsg').remove();
    });

    // 単語　 閉じる
    $(".js-wordListGroup .js-closeBtn").click(function(){
        $('.js-wordBookListGroup').removeClass('hide');
        $('.js-wordListGroup').addClass('hide');
        changeQuestionBtn();

        $('.js-errorMsg').remove();
    });

    // 単語表示
    function showWordList(){
        $('.js-wordList ul').remove();

        var list = '<ul>';
        for (var i = 0; i < wordBookObj.wordBookList[wordBookObj.updateBookNameIndex].length; i++) {
            list += "<li>"+ wordBookObj.wordBookList[wordBookObj.updateBookNameIndex][i].word +' : ' + wordBookObj.wordBookList[wordBookObj.updateBookNameIndex][i].meaning +wordEditBtn +"</li>"
        }
        list += '</ul>';

        $(".js-wordList").append(list);
    }

    // 単語を追加
    $('.js-wordListGroup .js-addBtn').click(function(){
        var check = validation('word');
        if (!check) return;

        var word = $('.js-wordListGroup .js-word').val();
        var meaing = $('.js-wordListGroup .js-meaning').val();
        wordBookObj.addWord(word, meaing);

        showWordList();

        $('.js-wordListGroup .js-word').val('');
        $('.js-wordListGroup .js-meaning').val('');

    });

    // 単語一覧の編集
    $('.js-wordListGroup .js-wordList').on('click', 'input' ,function() {
        if ($(this).attr('class') == 'js-wordEditBtn'){
            var index = $('.js-wordEditBtn').index(this);
            wordBookObj.editWordIndex(index);
            $('.js-wordListGroup .js-updateWord').val(wordBookObj.wordBookList[wordBookObj.updateBookNameIndex][wordBookObj.updateWordIndex].word);
            $('.js-wordListGroup .js-updateMeaning').val(wordBookObj.wordBookList[wordBookObj.updateBookNameIndex][wordBookObj.updateWordIndex].meaning);
            $('.js-wordListGroup .js-update').removeClass('hide');
        }
    });


    // 単語の更新
    $(".js-wordListGroup .js-update input:button").click(function(){

        var word = $('.js-wordListGroup .js-updateWord').val();
        var meaing = $('.js-wordListGroup .js-updateMeaning').val();

        wordBookObj.updateWord(word, meaing);

        $('.js-wordListGroup .js-wordList > ul > li:eq('+wordBookObj.updateWordIndex+')').html(word +' : '+ meaing + wordEditBtn);

        $('.js-wordListGroup .js-update .js-updateWord').val('');
        $('.js-wordListGroup .js-update .js-updateMeaning').val('');
        $('.js-wordListGroup .js-update').addClass('hide');

    });

    // 答えを見る
    $('.js-answerBtn').click(function(){
        $('.js-meaningCard').removeClass('hide');
    });
    
    // 戻る
    $('.js-prevBtn').click(function(){
        var index = wordBookObj.getQuestionWordIndex();
        wordBookObj.setQuestionWordIndex(index -= 1);
        changeQuestion();
        changeQuestionBtn();
    });

    // 進む
    $('.js-nextBtn').click(function(){
        var index = wordBookObj.getQuestionWordIndex();
        wordBookObj.setQuestionWordIndex(index += 1);
        changeQuestion();
        changeQuestionBtn();
    });

    // 問題の切り替え
    function changeQuestion(){
        $('.js-wordCard').text(wordBookObj.wordBookList[wordBookObj.getQuestionIndex()][wordBookObj.getQuestionWordIndex()].word);
        $('.js-meaningCard').text(wordBookObj.wordBookList[wordBookObj.getQuestionIndex()][wordBookObj.getQuestionWordIndex()].meaning);
    }

    // 戻る/進む ボタンの切り替え
    function changeQuestionBtn(){
        if(wordBookObj.getQuestionWordIndex() == 0) {
            $('.js-prevBtn').addClass('hide');
        } else {
            $('.js-prevBtn').removeClass('hide');
        }
        if(wordBookObj.getQuestionWordIndex() == wordBookObj.wordBookList[wordBookObj.getQuestionIndex()].length-1) {
            $('.js-nextBtn').addClass('hide');
        } else {
            $('.js-nextBtn').removeClass('hide');
        }
    }

    // バリデーション
    function validation(str){
        var errorMsg = '';
        $('.js-errorMsg').remove();

        if(str == 'book'){
            if($('.js-wordListName').val() == ''){
            errorMsg += '単語帳名を入力してください。';
            }
        }
        
        if(str == 'word'){
            if($('.js-word').val() == ''){
                errorMsg += '単語を入力してください。';
            }

            if($('.js-meaning').val() == ''){
                errorMsg += '意味を入力してください。';
            }
        }

        if(errorMsg) {
            errorMsg = '<p class="js-errorMsg">'+ errorMsg +'</p>'

            if(str == 'book'){
                $(".js-wordBookListGroup .js-addGroup").append(errorMsg);
            }

            if(str == 'word'){
                 $(".js-wordListGroup .js-addGroup").append(errorMsg);
            }

            return false;
        } else {
            return true;
        }
    }
    
});