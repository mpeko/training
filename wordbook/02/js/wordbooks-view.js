/*
    単語帳
*/

var lessonBtn = '<input type="button" value="練習" class="js-lessonBtn">';
var testBtn = '<input type="button" value="テスト" class="js-testBtn">';
var editBtn = '<input type="button" value="編集" class="js-editBtn">';
var deleteBtn = '<input type="button" value="削除" class="js-deleteBtn">';

$(function(){

    var elementObj = {
        $headerText: $('#header .title'),                   // タイトル
        $wordBooksView: $('.js-wordBooksView'),            // 単語帳一覧 トップ画面
        $wordBookView: $('.js-wordBookView'),              // 単語帳編集 
        $lessonView: $('.js-lessonView'),                  // 練習
        $testView: $('.js-testView'),                      // テスト
    }

    //-------------------------------------------------------------------------
    // 単語帳一覧
    //-------------------------------------------------------------------------
    var inputWordBooksObj = {
        $el: elementObj.$wordBooksView,
        $wordBooksMain: elementObj.$wordBooksView.find('.js-wordBooksMain'),
        $wordBooksEdit: elementObj.$wordBooksView.find('.js-wordBooksEdit'),
        $wordBooksAdd: elementObj.$wordBooksView.find('.js-wordBooksAdd'),
        data: wordBookObj,
        initialize: function() {
            
            this.$wordBooksEdit.addClass('hide');
            this.$wordBooksAdd.addClass('hide');

            updateWordBooksMainList();
            updateWordBooksEditList();
            
            this.onWordBooksAddBtn();
            this.onAddBtn();
            this.onEditModeBtn();
            this.onEditBtn();
            this.onDeleteBtn();
            this.onLessonBtn();
            this.onTestBtn();
            this.onBackBtn();

            updateHeaderText('単語帳一覧');
	    },
        onWordBooksAddBtn: function() {
            var addBtn = this.$el.find('.js-wordBooksAddBtn');
            var self = this;
            addBtn.click(function(){
                self.$wordBooksMain.addClass('hide');
                self.$wordBooksAdd.removeClass('hide');

                updatePankuzu('単語帳一覧 > 単語帳追加');
                updateHeaderText('単語帳追加');
            });
        },
        onAddBtn: function() {
            var addBtn = this.$el.find('.js-addBtn');
            var self = this;
            addBtn.click(function(){
                // 単語帳追加する
                var name = self.$el.find('.js-bookNameTxt').val();
                self.displayErrorBookName(name);
                var check = wordBookObj.validWordBooks(name);
                if (!check) return;
         
                self.data.addBookName(name);
                self.$el.find('.js-bookNameTxt').val('');

                updateWordBooksMainList();
                updateWordBooksEditList();

                self.resetToMain();

                updatePankuzu('単語帳一覧');
                updateHeaderText('単語帳一覧');
            });
        },
        onEditModeBtn: function() {
            var editModeBtn = this.$el.find('.js-editModeBtn');
            var self = this;
            editModeBtn.click(function(){

                // 単語帳一覧編集へ
                self.$wordBooksMain.addClass('hide');
                self.$wordBooksEdit.removeClass('hide');

                updatePankuzu('単語帳一覧 > 単語帳一覧編集');
                updateHeaderText('単語帳一覧編集');
            });
        },
        onEditBtn: function() {
            var editBtn = this.$el.find('.js-editBtn');
            var self = this;
            editBtn.click(function(){

                // 単語帳編集へ
                self.$el.addClass('hide');
                elementObj.$wordBookView.removeClass('hide');

                updatePankuzu('単語帳一覧 > 単語帳一覧編集 > 単語帳編集');
                updateHeaderText('単語帳編集');
            });
        },
        onDeleteBtn: function() {
            var deleteBtn = this.$el.find('.js-wordBooksEdit .js-deleteBtn');
            var self = this;
            deleteBtn.click(function(){
                // 単語帳削除
                var index = deleteBtn.index(this);
                self.data.deleteBook(index);

                updateWordBooksMainList();
                updateWordBooksEditList();
               
                self.resetBtn();

                updatePankuzu('単語帳一覧');
                updateHeaderText('単語帳一覧');
            });
        },
        onLessonBtn: function() {
            var lessonBtn = this.$el.find('.js-lessonBtn');
            var self = this;
            lessonBtn.click(function(){
                // 練習画面へ
                self.$el.addClass('hide');
                elementObj.$lessonView.removeClass('hide');

                updatePankuzu('練習');
                updateHeaderText('練習');
            });
        },
        onTestBtn: function() {
            var testBtn = this.$el.find('.js-testBtn');
            var self = this;
            testBtn.click(function(){
                // テスト画面へ
                self.$el.addClass('hide');
                elementObj.$testView.removeClass('hide');

                updatePankuzu('テスト');
                updateHeaderText('テスト');
            });
        },
        onBackBtn: function() {
            var backBtn = this.$el.find('.js-backBtn');
            var self = this;
            backBtn.click(function(){
                // 共通・戻る
                self.resetToMain();

                updatePankuzu('単語帳一覧');
                updateHeaderText('単語帳一覧');
            });
        },
        displayErrorBookName: function(name) {
            var errorMsg = '';
            if (name == ''){
               errorMsg = wordBookObj.errorMessages[0].bookName; 
            }
            this.$el.find('.js-errorMsg').text(errorMsg);
        },
        resetToMain: function() {
            // 共通・メイン画面へ
            this.$wordBooksMain.removeClass('hide');
            this.$wordBooksEdit.addClass('hide');
            this.$wordBooksAdd.addClass('hide');
            this.resetBtn();
            this.resetErrorMsg();
        },
        resetBtn: function() {
            // 配列を操作したときなどにボタンが効かなくなるので再度設定
            this.onEditBtn();
            this.onDeleteBtn();
            this.onLessonBtn();
            this.onTestBtn();
        },
        resetErrorMsg: function() {
            this.$el.find('.js-errorMsg').text('');
        }
    }

    // 単語帳一覧 メイン
    var updateWordBooksMainList = function(){
        elementObj.$wordBooksView.find('.js-wordBooksMain ul').remove();
        var wordBooks = wordBookObj.wordBooks;
        var list = _.template("<ul>"+"<% _.each(wordBooks, function(item) { %>"+" <li><%= lessonBtn %> <%= testBtn %> <%= item.name %> </li>"+"<% }); %>"+"</ul>")({wordBooks: wordBooks});
        elementObj.$wordBooksView.find(".js-wordBooksMain .js-list").append(list);
    }

    // 単語帳一覧 編集
    var updateWordBooksEditList = function(){
        elementObj.$wordBooksView.find('.js-wordBooksEdit ul').remove();
        var wordBooks = wordBookObj.wordBooks;
        var list = _.template("<ul>"+"<% _.each(wordBooks, function(item) { %>"+" <li><%= deleteBtn %> <%= editBtn %> <%= item.name %> </li>"+"<% }); %>"+"</ul>")({wordBooks: wordBooks});
        elementObj.$wordBooksView.find(".js-wordBooksEdit .js-list").append(list);
    }

    elementObj.$wordBooksView.each(function(){
        var $books = $(this);

        $books.find('.js-wordBooksEdit .js-list').on('click', 'input' ,function() {
            if ($(this).attr('class') == 'js-editBtn'){
                // 選択した単語帳編集一覧へ
                var index = $books.find('.js-wordBooksEdit .js-editBtn').index(this);
                elementObj.$wordBookView.find($('.js-name')).text(wordBookObj.wordBooks[index].name);
                wordBookObj.editBookNameIndex(index);
                wordBookObj.currentEditBook = wordBookObj.wordBooks[index];

                showWordBook();
            } 
        });
    });

    //-------------------------------------------------------------------------
    // 単語帳編集
    //-------------------------------------------------------------------------
    var inputWordBookObj = {
        $el: elementObj.$wordBookView,
        $wordBookMain: elementObj.$wordBookView.find('.js-wordBookMain'),
        $wordBookNameUpdate: elementObj.$wordBookView.find('.js-wordBookNameUpdate'),
        $wordBookUpdate: elementObj.$wordBookView.find('.js-wordBookUpdate'),
        $wordBookAdd: elementObj.$wordBookView.find('.js-wordBookAdd'),
        data: wordBookObj,
        initialize: function() {

            this.$el.addClass('hide');

            this.$wordBookNameUpdate.addClass('hide');
            this.$wordBookUpdate.addClass('hide');
            this.$wordBookAdd.addClass('hide');

            this.onMainAddBtn();
            this.onBookNameUpdateBtn();
            this.onUpdateBtn();
            this.onAddBtn();
            this.onMainBackBtn();
            this.onBackBtn();
	    },
        onMainAddBtn: function() {
            var mainAddBtn = this.$el.find('.js-mainAddBtn');
            var self = this;
            mainAddBtn.click(function(){
                // 単語追加画面へ
                self.$wordBookMain.addClass('hide');
                self.$wordBookAdd.removeClass('hide');

                updatePankuzu('単語帳一覧 > 単語帳一覧編集  > 単語帳編集  > 単語追加');
                updateHeaderText('単語追加');
            });
        },
        onBookNameUpdateBtn: function() {
            var updateBtn = this.$wordBookNameUpdate.find('.js-updateBtn');
            var self = this;
            updateBtn.click(function(){

                // 単語帳名の更新
                var text = self.$wordBookNameUpdate.find('.js-updateNameTxt').val();
                self.displayErrorBookName(text);
                var check = wordBookObj.validWordBooks(text);
                if (!check) return;
   
                wordBookObj.updateBookName(text);
                self.$wordBookMain.find('.js-name').text(text);
                
                updateWordBooksMainList();
                updateWordBooksEditList();

                self.$wordBookNameUpdate.find('.js-updateNameTxt').val('');

                self.resetToMain();
            });
        },
        onUpdateBtn: function() {
            var updateBtn = this.$wordBookUpdate.find('.js-updateBtn');
            var self = this;
            updateBtn.click(function(){

                // 単語更新
                var word = self.$wordBookUpdate.find('.js-updateWordTxt').val();
                var meaing = self.$wordBookUpdate.find('.js-updateMeaningTxt').val();

                self.displayErrorWord('.js-wordBookUpdate .js-errorMsg', word, meaing);
                var check = wordBookObj.validWordBook(word, meaing);
                if (!check) return;

                wordBookObj.updateWord(word, meaing);

                self.$el.find('.js-list > ul > li:eq('+wordBookObj.updateWordIndex+')').html(deleteBtn+' '+editBtn+' '+word +' : '+ meaing);

                self.$wordBookUpdate.find('.js-updateWordTxt').val('');
                self.$wordBookUpdate.find('.js-updateMeaningTxt').val('');
                
                self.resetToMain();
            });
        },
        onAddBtn: function() {
            var addBtn = this.$wordBookAdd.find('.js-addBtn');
            var self = this;
            addBtn.click(function(){
                // 単語を登録
                var word = self.$wordBookAdd.find('.js-wordTxt').val();
                var meaing = self.$wordBookAdd.find('.js-meaningTxt').val();

                self.displayErrorWord('.js-wordBookAdd .js-errorMsg', word, meaing);
                var check = wordBookObj.validWordBook(word, meaing);
                if (!check) return;

                wordBookObj.addWord(word, meaing);
                showWordBook();

                self.$wordBookAdd.find('.js-wordTxt').val('');
                self.$wordBookAdd.find('.js-meaningTxt').val('');

                self.resetToMain();
            });
        },
        onMainBackBtn: function() {
            var backBtn = this.$el.find('.js-mainBackBtn');
            var self = this;
            backBtn.click(function(){
                // 戻る
                self.$el.addClass('hide');
                elementObj.$wordBooksView.removeClass('hide');

                updatePankuzu('単語帳一覧 > 単語帳一覧編集');
                updateHeaderText('単語帳一覧編集');
            });
        },
        onBackBtn: function() {
            var backBtn = this.$el.find('.js-backBtn');
            var self = this;
            backBtn.click(function(){
                // 共通・戻る
                self.resetToMain();
            });
        },
        displayErrorBookName: function(name) {
            var errorMsg = '';
            if (name == ''){
               errorMsg = wordBookObj.errorMessages[0].bookName; 
            }
            this.$el.find('.js-wordBookNameUpdate .js-errorMsg').text(errorMsg);
        },
        displayErrorWord: function(el, word, meaning) {
            var errorMsg = '';
            if (word == ''){
                errorMsg += wordBookObj.errorMessages[0].word;
            }
            if (meaning == '') {
                errorMsg += wordBookObj.errorMessages[0].meaning;
            }
            this.$el.find(el).text(errorMsg);
        },
        resetToMain: function() {
            // 共通・単語帳編集画面へ
            this.$el.find('.js-wordBookMain').removeClass('hide');
            this.$el.find('.js-wordBookNameUpdate').addClass('hide');
            this.$el.find('.js-wordBookUpdate').addClass('hide');
            this.$el.find('.js-wordBookAdd').addClass('hide');
            
            this.resetErrorMsg();

            updatePankuzu('単語帳一覧 > 単語帳一覧編集 > 単語帳編集');
            updateHeaderText('単語帳編集');
        },
        resetErrorMsg: function() {
            this.$el.find('.js-errorMsg').text('');
        }
    }

    elementObj.$wordBookView.each(function(){
        var $book = $(this);
        
        $book.find('.js-title .js-editBtn').click(function() {
            //  単語帳名の編集
            $book.find('.js-updateNameTxt').val(wordBookObj.currentEditBook.name);
            $book.find('.js-wordBookMain').addClass('hide');
            $book.find('.js-wordBookNameUpdate').removeClass('hide');

            updatePankuzu('単語帳一覧 > 単語帳一覧編集  > 単語帳編集  > 単語帳名の編集');
            updateHeaderText('単語帳名の編集');
        });

        
        $book.find('.js-wordBookMain .js-list').on('click', 'input' ,function() {

            if ($(this).attr('class') == 'js-editBtn'){
                // 単語の編集
                var index = $book.find('.js-list .js-editBtn').index(this);
                wordBookObj.editWordIndex(index);
                $book.find('.js-updateWordTxt').val(wordBookObj.currentEditBook.wordBook[wordBookObj.updateWordIndex].word);
                $book.find('.js-updateMeaningTxt').val(wordBookObj.currentEditBook.wordBook[wordBookObj.updateWordIndex].meaning);

                $book.find('.js-wordBookMain').addClass('hide');
                $book.find('.js-wordBookUpdate').removeClass('hide');

                updatePankuzu('単語帳一覧 > 単語帳一覧編集  > 単語帳編集  > 単語の編集');
                updateHeaderText('単語の編集');

            } else if ($(this).attr('class') == 'js-deleteBtn') {
                // 単語の削除
                if ($(this).attr('class') == 'js-deleteBtn'){
                    var index = $book.find('.js-list .js-deleteBtn').index(this);
                    wordBookObj.deleteWord(index);
                    showWordBook();
                }
            }
        });
    });

    // 単語一覧表示
    var showWordBook = function(){
        elementObj.$wordBookView.each(function(){
            var $book = $(this);
            $book.find('.js-list ul').remove();
            
            var wordBook = wordBookObj.currentEditBook.wordBook;
            var list = _.template("<ul>"+"<% _.each(wordBook, function(item) { %>"+" <li><%= deleteBtn %> <%= editBtn %> <%= item.word %> : <%= item.meaning %></li>"+"<% }); %>"+"</ul>")({wordBook: wordBook});

            $book.find('.js-list').append(list);
        });
    }

    //-------------------------------------------------------------------------
    // 練習
    //-------------------------------------------------------------------------
    var inputLessonObj = {
        $el: elementObj.$lessonView,
        data: wordBookObj,
        initialize: function() {

            this.$el.addClass('hide');
            this.onBackBtn();
	    },
        onBackBtn: function() {
            var backBtn = this.$el.find('.js-backBtn');
            var self = this;
            backBtn.click(function(){
                self.$el.addClass('hide');
                elementObj.$wordBooksView.removeClass('hide');

                updatePankuzu('単語帳一覧');
                updateHeaderText('単語帳一覧');
            });
        }
    }

    //-------------------------------------------------------------------------
    // テスト
    //-------------------------------------------------------------------------
    var inputTestObj = {
        $el: elementObj.$testView,
        data: wordBookObj,
        initialize: function() {
            this.$el.addClass('hide');
            this.$el.find('.js-result').addClass('hide');
            this.onBackBtn();
	    },
        onBackBtn: function() {
            var backBtn = this.$el.find('.js-backBtn');
            var self = this;
            backBtn.click(function(){
                self.$el.addClass('hide');
                elementObj.$wordBooksView.removeClass('hide');

                updatePankuzu('単語帳一覧');
                updateHeaderText('単語帳一覧');
            });
        }
    }

    //-------------------------------------------------------------------------
    // 共通
    //-------------------------------------------------------------------------

    // タイトル
    var updateHeaderText = function(text){
        elementObj.$headerText.text(text);
    }

    // パンくずリスト TODO：横スライドができるようになったら削除する
    var updatePankuzu = function(text){
        $('.js-pankuzu span').text(text);
    }

    inputWordBooksObj.initialize();
    inputWordBookObj.initialize();
    inputLessonObj.initialize();
    inputTestObj.initialize();
});