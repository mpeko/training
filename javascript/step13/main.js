/*
JSトレーニング13 【単語帳の複数登録を行える様にする】 
*/

$(function(){

    var bookNameEditBtn = '<input type="button" value="名前" class="js-bookNameEditBtn">';
    var selectQuestionBtn = '<input type="button" value="問題選択" class="js-selectQuestionBtn">';
    var wordEditBtn = '<input type="button" value="編集" class="js-wordEditBtn">';
    var initList = '<ul><li>'+ wordBookObj.wordBooks[0].name + bookNameEditBtn + wordEditBtn + selectQuestionBtn+'</li></ul>'

    $('.js-wordCard').text(wordBookObj.wordBooks[0].wordBook[0].word);
    $('.js-meaningCard').text(wordBookObj.wordBooks[0].wordBook[0].meaning).addClass('hide');
    $('.js-questionBtnGroup').addClass('hide');
    $('.js-wordBook').addClass('hide');
    $('.js-wordBook .js-update').addClass('hide');

    // 単語帳一覧表示
    $(".js-wordBooksBtn").click(function(){
        $(this).addClass('hide');
        $('.js-wordBooks').removeClass('hide');
    });

    // 単語帳一覧
    $('.js-wordBooks').each(function(){
        $books = $(this);
        $books.addClass('hide');
        $books.find('.js-update').addClass('hide');
        $books.find('.js-list').append(initList);

        // 単語帳を追加
        $books.find('.js-addBtn').click(function(){
            
            var check = validation('book');
            if (!check) return;

            var name = $books.find('.js-bookNameTxt').val();
            wordBookObj.addBookName(name);

            // 表示
            $('.js-list ul').remove();
            var list = '<ul>';
            for (var i = 0; i < wordBookObj.wordBooks.length; i++) {
                list += "<li>"+wordBookObj.wordBooks[i].name + bookNameEditBtn + wordEditBtn + selectQuestionBtn +"</li>"
            }
            list += '</ul>';
            $(".js-list").append(list);

            $books.find('.js-bookNameTxt').val('');
        });

        // 単語帳名の更新
        $books.find('.js-updateBtn').click(function(){

            var text = $books.find('.js-updateNameTxt').val();
            console.log(text);
            wordBookObj.updateBookName(text);
            $books.find('.js-updateNameTxt').text(text);
            $books.find('.js-list > ul > li:eq('+wordBookObj.updateBookNameIndex+')').html(text + bookNameEditBtn + wordEditBtn);
            $books.find('.js-updateNameTxt').val('');
            $books.find('.js-update').addClass('hide');

        });

        $books.find('.js-list').on('click', 'input' ,function() {
            
            // 単語帳名の編集
            if ($(this).attr('class') == 'js-bookNameEditBtn'){
                var index = $books.find('.js-bookNameEditBtn').index(this);
     
                wordBookObj.editBookNameIndex(index);
                $books.find('.js-updateNameTxt').val(wordBookObj.wordBooks[index].name);
                $books.find('.js-update').removeClass('hide');
            
            // 単語帳の編集
            } else if ($(this).attr('class') == 'js-wordEditBtn'){
                // console.log($(this));// js-wordEditBtn [input.js-wordEditBtn, context: input.js-wordEditBtn]
                // console.log(this);//js-wordEditBtn  <input type="button" value="編集" class="js-wordEditBtn">
                var index = $books.find('.js-wordEditBtn').index(this);

                $('.js-wordBook .js-bookName').text(wordBookObj.wordBooks[index].name);
                wordBookObj.editBookNameIndex(index);
                $books.addClass('hide');
                $('.js-wordBook').removeClass('hide');

                showWordList();

            // 問題の選択
            } else if ($(this).attr('class') == 'js-selectQuestionBtn'){

                var index = $('.js-selectQuestionBtn').index(this);

                questionObj.setQuestionIndex(index);
                questionObj.setQuestionWordIndex(0);

                if(wordBookObj.wordBooks[index].wordBook[0] != undefined){
                    changeQuestionBtn();
                    $('.js-questionBtnGroup').removeClass('hide');
                    $('.js-wordCard').text(wordBookObj.wordBooks[index].wordBook[0].word);
                    $('.js-meaningCard').text(wordBookObj.wordBooks[index].wordBook[0].meaning).addClass('hide');
                }
            }
        });

        // 単語帳一覧 閉じる
        $books.find('.js-closeBtn').click(function(){
            $('.js-wordBooksBtn').removeClass('hide');
            $('.js-errorMsg').remove();
            $books.addClass('hide');
        });
    });

    // 単語一覧
    function showWordList(){

        $('.js-wordBook').each(function(){

            $book = $(this);
            $book.find('.js-list ul').remove();

            var list = '<ul>';
            for (var i = 0; i < wordBookObj.wordBooks[wordBookObj.updateBookNameIndex].wordBook.length; i++) {
                list += "<li>"+ wordBookObj.wordBooks[wordBookObj.updateBookNameIndex].wordBook[i].word +' : ' + wordBookObj.wordBooks[wordBookObj.updateBookNameIndex].wordBook[i].meaning +wordEditBtn +"</li>"
            }
            list += '</ul>';
            $book.find('.js-list').append(list);
        });
    }

    // 単語 一覧
    $('.js-wordBook').each(function(){
        $book = $(this);

        // 単語を追加
        $book.find('.js-addBtn').click(function(){
            var check = validation('word');
            if (!check) return;

            var word = $book.find('.js-wordTxt').val();
            var meaing = $book.find('.js-meaningTxt').val();
            wordBookObj.addWord(word, meaing);

            showWordList();

            $book.find('.js-wordTxt').val('');
            $book.find('.js-meaningTxt').val('');
        });

        // 単語一覧の編集
        $book.find('.js-list').on('click', 'input' ,function() {
            if ($(this).attr('class') == 'js-wordEditBtn'){
                var index = $book.find('.js-wordEditBtn').index(this);
                wordBookObj.editWordIndex(index);
                $book.find('.js-updateWordTxt').val(wordBookObj.wordBooks[wordBookObj.updateBookNameIndex].wordBook[wordBookObj.updateWordIndex].word);
                $book.find('.js-updateMeaningTxt').val(wordBookObj.wordBooks[wordBookObj.updateBookNameIndex].wordBook[wordBookObj.updateWordIndex].meaning);
                $book.find('.js-update').removeClass('hide');
            }
        });

        // 単語の更新
        $book.find('.js-updateBtn').click(function(){

            var word = $book.find('.js-updateWordTxt').val();
            var meaing = $book.find('.js-updateMeaningTxt').val();

            wordBookObj.updateWord(word, meaing);

            $book.find('.js-list > ul > li:eq('+wordBookObj.updateWordIndex+')').html(word +' : '+ meaing + wordEditBtn);

            $book.find('.js-updateWordTxt').val('');
            $book.find('.js-updateMeaningTxt').val('');
            $book.find('.js-update').addClass('hide');

        });

        // 単語帳一覧 閉じる
        $book.find('.js-closeBtn').click(function(){
            $('.js-wordBooks').removeClass('hide');
            $('.js-wordBook').addClass('hide');
            changeQuestionBtn();

            $('.js-errorMsg').remove();
        });
    });

    // 問題
    $('.js-questions').each(function(){

        $questions = $(this);

        // 答えを見る
        $questions.find('.js-answerBtn').click(function(){
            $questions.find('.js-meaningCard').removeClass('hide');
        });

        // 戻る
        $questions.find('.js-prevBtn').click(function(){
            var index = questionObj.getQuestionWordIndex();
            questionObj.setQuestionWordIndex(index -= 1);
            changeQuestion();
            changeQuestionBtn();
        });

        // 進む
        $questions.find('.js-nextBtn').click(function(){
            var index = questionObj.getQuestionWordIndex();
            questionObj.setQuestionWordIndex(index += 1);
            changeQuestion();
            changeQuestionBtn();
        });

    });

    // 問題の切り替え
    function changeQuestion(){
        $('.js-questions .js-wordCard').text(wordBookObj.wordBooks[questionObj.getQuestionIndex()].wordBook[questionObj.getQuestionWordIndex()].word);
        $('.js-questions .js-meaningCard').text(wordBookObj.wordBooks[questionObj.getQuestionIndex()].wordBook[questionObj.getQuestionWordIndex()].meaning);
    }

    // 戻る/進む ボタンの切り替え
    function changeQuestionBtn(){
        if(questionObj.getQuestionWordIndex() == 0) {
            $('.js-prevBtn').addClass('hide');
        } else {
            $('.js-prevBtn').removeClass('hide');
        }
        if(questionObj.getQuestionWordIndex() == wordBookObj.wordBooks[questionObj.getQuestionIndex()].wordBook.length-1) {
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
            if($('.js-bookNameTxt').val() == ''){
            errorMsg += '単語帳名を入力してください。';
            }
        }
        
        if(str == 'word'){
            if($('.js-wordTxt').val() == ''){
                errorMsg += '単語を入力してください。';
            }

            if($('.js-meaningTxt').val() == ''){
                errorMsg += '意味を入力してください。';
            }
        }

        if(errorMsg) {
            errorMsg = '<p class="js-errorMsg">'+ errorMsg +'</p>'

            if(str == 'book'){
                $(".js-wordBooks .js-addGroup").append(errorMsg);
            }

            if(str == 'word'){
                 $(".js-wordBook .js-addGroup").append(errorMsg);
            }

            return false;
        } else {
            return true;
        }
    }
    
});