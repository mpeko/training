/*
    単語
*/

var showWordList;   // 単語一覧表示

$(function(){

    var inputWordBookObj = {
        $el: elementObj.$wordBook,
        data: wordBookObj,
        initialize: function() {
            this.$el.addClass('hide');
            this.$el.find('.js-update').addClass('hide');

            this.onAddBtn();
            this.onUpdateBtn();
            this.onCloseBtn();
	    },
        onAddBtn: function() {
            var addBtn = this.$el.find('.js-addBtn');
            var self = this;
            addBtn.click(function(){
                // 単語追加ボタンが押された場合の処理
                self.$el.find('.js-errorMsg').remove();
                var checkArr = validWordBook($('.js-wordTxt').val(), $('.js-meaningTxt').val());
                var check = displayError(checkArr);
                if (!check) return;

                var word = self.$el.find('.js-wordTxt').val();
                var meaing = self.$el.find('.js-meaningTxt').val();
                wordBookObj.addWord(word, meaing);

                showWordList();

                self.$el.find('.js-wordTxt').val('');
                self.$el.find('.js-meaningTxt').val('');
            });
        },
        onUpdateBtn: function() {
            var updateBtn = this.$el.find('.js-updateBtn');
            var self = this;
            updateBtn.click(function(){
                // 単語更新
                var word = self.$el.find('.js-updateWordTxt').val();
                var meaing = self.$el.find('.js-updateMeaningTxt').val();

                wordBookObj.updateWord(word, meaing);

                self.$el.find('.js-list > ul > li:eq('+wordBookObj.updateWordIndex+')').html(word +' : '+ meaing + wordEditBtn);

                self.$el.find('.js-updateWordTxt').val('');
                self.$el.find('.js-updateMeaningTxt').val('');
                self.$el.find('.js-update').addClass('hide');
            });
        },
        onCloseBtn: function() {
            var closeBtn = this.$el.find('.js-closeBtn');
            var self = this;
            // 単語帳一覧 閉じる
            closeBtn.click(function(){
                elementObj.$wordBooks.removeClass('hide');
                self.$el.addClass('hide');
                changeQuestionBtn();

                self.$el.find('.js-errorMsg').remove();
            });
        }
    }

    // 単語一覧表示
    showWordList = function(){
        $('.js-wordBook').each(function(){
            $book = $(this);
            $book.find('.js-list ul').remove();

            var list = '<ul>';
            for (var i = 0; i < wordBookObj.currentEditBook.wordBook.length; i++) {
                list += "<li>"+ wordBookObj.currentEditBook.wordBook[i].word +' : ' + wordBookObj.currentEditBook.wordBook[i].meaning +wordEditBtn +"</li>"
            }
            list += '</ul>';
            $book.find('.js-list').append(list);
        });
    }

    $('.js-wordBook').each(function(){
        $book = $(this);
        // 単語一覧の編集
        $book.find('.js-list').on('click', 'input' ,function() {
            if ($(this).attr('class') == 'js-wordEditBtn'){
                var index = $book.find('.js-wordEditBtn').index(this);
                wordBookObj.editWordIndex(index);
                $book.find('.js-updateWordTxt').val(wordBookObj.currentEditBook.wordBook[wordBookObj.updateWordIndex].word);
                $book.find('.js-updateMeaningTxt').val(wordBookObj.currentEditBook.wordBook[wordBookObj.updateWordIndex].meaning);
                $book.find('.js-update').removeClass('hide');
            }
        });
    });

    var displayError = function(arr){
        var flag = true;
        var errorMsg = '';
    
        for (var i = 0; i < arr.length; i++) {
            if (arr[0] == false){
                errorMsg += '単語を入力してください。';
            } else if (arr[1] == false) {
                errorMsg += '意味を入力してください。';
            }
        }

        if (errorMsg != ''){
            errorMsg = '<p class="js-errorMsg">'+ errorMsg +'</p>'
            $('.js-wordBook .js-addGroup').append(errorMsg);
            flag = false;
        }

        return flag;
    }

    inputWordBookObj.initialize();
});