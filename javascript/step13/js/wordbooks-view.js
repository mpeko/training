/*
    単語帳
*/

var bookNameEditBtn = '<input type="button" value="名前" class="js-bookNameEditBtn">';
var selectQuestionBtn = '<input type="button" value="問題選択" class="js-selectQuestionBtn">';
var wordEditBtn = '<input type="button" value="編集" class="js-wordEditBtn">';
var initList = '<ul><li>'+ wordBookObj.currentEditBook.name + bookNameEditBtn + wordEditBtn + selectQuestionBtn +'</li></ul>'

$(function(){

    var inputWordBooksObj = {
        $el: elementObj.$wordBooks,
        data: wordBookObj,
        initialize: function() {
            this.$el.addClass('hide');
            this.$el.find('.js-update').addClass('hide');
            this.$el.find('.js-list').append(initList);

            this.onAddBtn();
            this.onUpdateBtn();
            this.onCloseBtn();
	    },
        onAddBtn: function() {
            var addBtn = this.$el.find('.js-addBtn');
            var self = this;
            // addBtn.on('click', function(){
            addBtn.click(function(){
                // 単語帳追加ボタンが押された場合の処理
                self.$el.find('.js-errorMsg').text('');
                var check = wordBookObj.validWordBooks($('.js-bookNameTxt').val());
                if (!check){
                    self.displayError();
                    return;
                }

                var name = self.$el.find('.js-bookNameTxt').val();
                self.data.addBookName(name);

                // 表示
                self.$el.find('.js-list ul').remove();
                
                var wordBooks = self.data.wordBooks;
                var list = _.template("<ul>"+"<% _.each(wordBooks, function(item) { %>"+" <li><%= item.name %>  <%= bookNameEditBtn %><%= wordEditBtn %><%= selectQuestionBtn %></li>"+"<% }); %>"+"</ul>")({wordBooks: wordBooks});

                self.$el.find(".js-list").append(list);
                self.$el.find('.js-bookNameTxt').val('');
            });
            
        },
        onUpdateBtn: function() {
            var updateBtn = this.$el.find('.js-updateBtn');
            var self = this;
            updateBtn.click(function(){
                // 単語帳名の更新
                var text = self.$el.find('.js-updateNameTxt').val();
                wordBookObj.updateBookName(text);
                self.$el.find('.js-updateNameTxt').text(text);
                self.$el.find('.js-list > ul > li:eq('+ wordBookObj.updateBookNameIndex +')').html(text + bookNameEditBtn + wordEditBtn + selectQuestionBtn);
                self.$el.find('.js-updateNameTxt').val('');
                self.$el.find('.js-update').addClass('hide');
            });
        },
        onCloseBtn: function() {
            var closeBtn = this.$el.find('.js-closeBtn');
            var self = this;
            closeBtn.click(function(){
                // 単語帳一覧 閉じる
                elementObj.$topBtns.find('.js-wordBooksBtn').removeClass('hide');
                self.$el.find('.js-errorMsg').remove();
                self.$el.addClass('hide');
            });
        },
        displayError: function() {
            var errorMsg = wordBookObj.errorMessages[0].bookName;
            this.$el.find('.js-errorMsg').text(errorMsg);
        }
    }

    $('.js-wordBooks').each(function(){
        $books = $(this);

        $books.find('.js-list').on('click', 'input' ,function() {
            
            // 単語帳名の編集
            if ($(this).attr('class') == 'js-bookNameEditBtn'){
                var index = $books.find('.js-bookNameEditBtn').index(this);
                wordBookObj.editBookNameIndex(index);
                wordBookObj.currentEditBook = wordBookObj.wordBooks[index];
                $books.find('.js-updateNameTxt').val(wordBookObj.wordBooks[index].name);
                $books.find('.js-update').removeClass('hide');
            
            // 単語帳の編集
            } else if ($(this).attr('class') == 'js-wordEditBtn'){
                var index = $books.find('.js-wordEditBtn').index(this);
                elementObj.$wordBook.find('.js-bookName').text(wordBookObj.wordBooks[index].name);
                wordBookObj.editBookNameIndex(index);
                wordBookObj.currentEditBook = wordBookObj.wordBooks[index];
                $books.addClass('hide');
                elementObj.$wordBook.removeClass('hide');

                showWordList();

            // 問題の選択
            } else if ($(this).attr('class') == 'js-selectQuestionBtn'){
                var index = $books.find('.js-selectQuestionBtn').index(this);

                wordBookObj.currentQuestionBook = wordBookObj.wordBooks[index];
                wordBookObj.setQuestionWordIndex(0);

                if(wordBookObj.wordBooks[index].wordBook[0] != undefined){
                    changeQuestionBtn();
                    elementObj.$questions.find('.js-questionBtnGroup').removeClass('hide');
                    elementObj.$questions.find('.js-wordCard').text(wordBookObj.currentQuestionBook.wordBook[0].word);
                    elementObj.$questions.find('.js-meaningCard').text(wordBookObj.currentQuestionBook.wordBook[0].meaning).addClass('hide');
                }
            }
        });
    });

    inputWordBooksObj.initialize();
});