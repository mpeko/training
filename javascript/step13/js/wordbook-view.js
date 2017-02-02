/*
    単語
*/

var showWordList;   // 単語一覧表示

$(function(){

    $('.js-wordBook').addClass('hide');
    $('.js-wordBook .js-update').addClass('hide');

    var inputWordBookObj = {
        $el: elementObj.$wordBook,
        data: wordBookObj,
        onAddBtn: function() {
            var addBtn = this.$el.find('.js-addBtn');
            var self = this;
            addBtn.click(function(){
                // 単語追加ボタンが押された場合の処理
                var check = validation('word');
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

                $('.js-errorMsg').remove();
            });
        }
    }

    // 単語一覧表示
    showWordList = function(){
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

    $('.js-wordBook').each(function(){
        $book = $(this);
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
    });

    inputWordBookObj.onAddBtn();
    inputWordBookObj.onUpdateBtn();
    inputWordBookObj.onCloseBtn();
});