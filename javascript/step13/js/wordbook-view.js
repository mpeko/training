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
                self.$el.find('.js-errorMsg').text('');

                var word = self.$el.find('.js-wordTxt').val();
                var meaing = self.$el.find('.js-meaningTxt').val();

                self.displayError(word, meaing);
                var check = wordBookObj.validWordBook(word, meaing);
                if (!check) return;

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
        },
        displayError: function(word, meaning) {
            var errorMsg = '';
            if (word == ''){
                errorMsg += wordBookObj.errorMessages[0].word;
            }
            if (meaning == '') {
                errorMsg += wordBookObj.errorMessages[0].meaning;
            }
            this.$el.find('.js-errorMsg').text(errorMsg);
        }
    }

    // 単語一覧表示
    showWordList = function(){
        $('.js-wordBook').each(function(){
            $book = $(this);
            $book.find('.js-list ul').remove();
            
            // var list = '<ul>';
            // for (var i = 0; i < wordBookObj.currentEditBook.wordBook.length; i++) {
            //     list += "<li>"+ wordBookObj.currentEditBook.wordBook[i].word +' : ' + wordBookObj.currentEditBook.wordBook[i].meaning +wordEditBtn +"</li>"
            // }
            // list += '</ul>';

            var wordBook = wordBookObj.currentEditBook.wordBook;
            var list = _.template("<ul>"+"<% _.each(wordBook, function(item) { %>"+" <li><%= item.word %> : <%= item.meaning %> <%= wordEditBtn %></li>"+"<% }); %>"+"</ul>")({wordBook: wordBook});

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

    inputWordBookObj.initialize();
});