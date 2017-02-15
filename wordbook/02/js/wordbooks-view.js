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
            
            this.handleEvent();

            updateHeaderText('単語帳一覧');
	    },
        handleEvent: function() {
            var wordBooksAddBtn = this.$el.find('.js-wordBooksAddBtn');
            var addBtn = this.$el.find('.js-addBtn');
            var editModeBtn = this.$el.find('.js-editModeBtn');
            var editBtn = this.$el.find('.js-editBtn');
            var deleteBtn = this.$el.find('.js-wordBooksEdit .js-deleteBtn');
            var lessonBtn = this.$el.find('.js-lessonBtn');
            var testBtn = this.$el.find('.js-testBtn');
            var backBtn = this.$el.find('.js-backBtn');
            var self = this;
            wordBooksAddBtn.click(function(){
                self.$wordBooksMain.addClass('hide');
                self.$wordBooksAdd.removeClass('hide');

                updatePankuzu('単語帳一覧 > 単語帳追加');
                updateHeaderText('単語帳追加');
            });
            addBtn.click(function(){
                // 単語帳追加する
                var name = self.$el.find('.js-bookNameTxt').val();
                var check = wordBookObj.validWordBooks(name);
                if (!check) {
                    self.displayErrorBookName(name);
                    return;
                }
         
                self.data.addBookName(name);
                self.$el.find('.js-bookNameTxt').val('');

                updateWordBooksMainList();
                updateWordBooksEditList();

                self.resetToMain();

                updatePankuzu('単語帳一覧');
                updateHeaderText('単語帳一覧');
            });
            editModeBtn.click(function(){

                // 単語帳一覧編集へ
                self.$wordBooksMain.addClass('hide');
                self.$wordBooksEdit.removeClass('hide');

                updatePankuzu('単語帳一覧 > 単語帳一覧編集');
                updateHeaderText('単語帳一覧編集');
            });
            editBtn.click(function(){

                // 単語帳編集へ
                self.$el.addClass('hide');
                elementObj.$wordBookView.removeClass('hide');

                updatePankuzu('単語帳一覧 > 単語帳一覧編集 > 単語帳編集');
                updateHeaderText('単語帳編集');
            });
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
            lessonBtn.click(function(){
                // 練習画面へ

                // 問題の選択
                var index = self.$el.find('.js-lessonBtn').index(this);
                wordBookObj.currentLessonBook = wordBookObj.wordBooks[index];
                elementObj.$lessonView.find('.js-wordbookName').text(wordBookObj.currentLessonBook.name);

                if(wordBookObj.wordBooks[index].wordBook[0] != undefined){
                    inputLessonObj.startLesson();
                }
                
                self.$el.addClass('hide');
                elementObj.$lessonView.removeClass('hide');

                updatePankuzu('練習');
                updateHeaderText('練習');
            });
            testBtn.click(function(){
                // テスト画面へ
                self.$el.addClass('hide');
                elementObj.$testView.removeClass('hide');

                updatePankuzu('テスト');
                updateHeaderText('テスト');
            });
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
            this.handleEvent();
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

            this.handleEvent();
	    },
        handleEvent: function() {
            var mainAddBtn = this.$el.find('.js-mainAddBtn');
            var bookNameUpdateBtn = this.$wordBookNameUpdate.find('.js-updateBtn');
            var bookUpdateBtn = this.$wordBookUpdate.find('.js-updateBtn');
            var addBtn = this.$wordBookAdd.find('.js-addBtn');
            var mainBackBtn = this.$el.find('.js-mainBackBtn');
            var backBtn = this.$el.find('.js-backBtn');
            var self = this;
            mainAddBtn.click(function(){
                // 単語追加画面へ
                self.$wordBookMain.addClass('hide');
                self.$wordBookAdd.removeClass('hide');

                updatePankuzu('単語帳一覧 > 単語帳一覧編集  > 単語帳編集  > 単語追加');
                updateHeaderText('単語追加');
            });
            bookNameUpdateBtn.click(function(){

                // 単語帳名の更新
                var text = self.$wordBookNameUpdate.find('.js-updateNameTxt').val();
                var check = wordBookObj.validWordBooks(text);
                if (!check) {
                    self.displayErrorBookName(text);
                    return;
                }
   
                wordBookObj.updateBookName(text);
                self.$wordBookMain.find('.js-name').text(text);
                
                updateWordBooksMainList();
                updateWordBooksEditList();

                self.$wordBookNameUpdate.find('.js-updateNameTxt').val('');

                self.resetToMain();
            });
            bookUpdateBtn.click(function(){

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
            mainBackBtn.click(function(){
                // 戻る
                self.$el.addClass('hide');
                elementObj.$wordBooksView.removeClass('hide');

                updatePankuzu('単語帳一覧 > 単語帳一覧編集');
                updateHeaderText('単語帳一覧編集');
            });
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
        randomFlag: true,
        reverseFlag: true,
        randomArray: [],
        initialize: function() {

            this.$el.addClass('hide');
            this.$el.find('.js-topCardBtn').addClass('hide');

            this.handleEvent();
	    },
        handleEvent: function() {
            var answerBtn = this.$el.find('.js-answerBtn');
            var prevBtn = this.$el.find('.js-prevBtn');
            var nextBtn = this.$el.find('.js-nextBtn');
            var topCardBtn = this.$el.find('.js-topCardBtn');
            var backBtn = this.$el.find('.js-backBtn');
            var randomBtn = this.$el.find('.js-randomBtn');
            var reverseBtn = this.$el.find('.js-reverseBtn');
            var self = this;
            answerBtn.click(function(){
                // 答えを見る
                answerBtn.addClass('hide');
                self.$el.find('.js-meaningCard').removeClass('hide');
            });
            prevBtn.click(function(){
                // 戻る
                var index = wordBookObj.getLessonWordIndex();
                wordBookObj.setLessonWordIndex(index -= 1);
                updateCardNum();
                changeCard('prev');
                changeCardBtn();
            });
            nextBtn.click(function(){
                // 進む
                var index = wordBookObj.getLessonWordIndex();
                wordBookObj.setLessonWordIndex(index += 1);
                updateCardNum();
                changeCard('next');
                changeCardBtn();
            });
            topCardBtn.click(function(){
                // 最初から
                topCardBtn.addClass('hide');
                self.startLesson();
            });
            backBtn.click(function(){
                self.$el.addClass('hide');
                elementObj.$wordBooksView.removeClass('hide');

                updatePankuzu('単語帳一覧');
                updateHeaderText('単語帳一覧');
            });
            randomBtn.click(function(){
                if(self.randomFlag){
                    self.randomFlag = false;

                    // ランダム用の配列生成
                    var wordBooklength = wordBookObj.currentLessonBook.wordBook.length;
                    for (var i = 0; i < wordBooklength; i++) {
                        self.randomArray.push(i);
                    }
                    self.randomArray = getRandomArray(self.randomArray);

                } else {
                    self.randomFlag = true;
                }
                self.startLesson();
            });
            reverseBtn.click(function(){
                if(self.reverseFlag){
                    // meaning/word
                    self.reverseFlag = false;
                } else {
                    // word/meaning
                    self.reverseFlag = true;
                }
                self.startLesson();
            });
        },
        startLesson: function() {
            wordBookObj.setLessonWordIndex(0);
            updateCardNum();
            changeCardBtn();

            var startIndex;

            if(this.randomFlag){
                startIndex = 0;
            } else {
                startIndex = this.randomArray[0];
            }

            if(this.reverseFlag){
                this.$el.find('.js-wordCard').text(wordBookObj.currentLessonBook.wordBook[startIndex].word);
                this.$el.find('.js-meaningCard').text(wordBookObj.currentLessonBook.wordBook[startIndex].meaning).addClass('hide');
            } else {
                this.$el.find('.js-wordCard').text(wordBookObj.currentLessonBook.wordBook[startIndex].meaning);
                this.$el.find('.js-meaningCard').text(wordBookObj.currentLessonBook.wordBook[startIndex].word).addClass('hide');
            }

            this.$el.find('.js-answerBtn').removeClass('hide');
            this.$el.find('.js-meaningCard').addClass('hide');
        }
    }

    // カードの切り替え
    var changeCard = function(btnType){

        var currentIndex;

        if(inputLessonObj.randomFlag){
            currentIndex = wordBookObj.getLessonWordIndex();
        } else {
            currentIndex = inputLessonObj.randomArray[wordBookObj.getLessonWordIndex()];
        }

        if(inputLessonObj.reverseFlag){
            elementObj.$lessonView.find('.js-wordCard').text(wordBookObj.currentLessonBook.wordBook[currentIndex].word);
            elementObj.$lessonView.find('.js-meaningCard').text(wordBookObj.currentLessonBook.wordBook[currentIndex].meaning);
        } else {
            elementObj.$lessonView.find('.js-wordCard').text(wordBookObj.currentLessonBook.wordBook[currentIndex].meaning);
            elementObj.$lessonView.find('.js-meaningCard').text(wordBookObj.currentLessonBook.wordBook[currentIndex].word);
        }

        if (btnType == 'prev'){
            elementObj.$lessonView.find('.js-answerBtn').addClass('hide');
            elementObj.$lessonView.find('.js-meaningCard').removeClass('hide');
        } else if (btnType == 'next'){
            elementObj.$lessonView.find('.js-answerBtn').removeClass('hide');
            elementObj.$lessonView.find('.js-meaningCard').addClass('hide');
        }
    }

    // ボタンの切り替え
    var changeCardBtn = function(){
        if(wordBookObj.getLessonWordIndex() == 0) {
            elementObj.$lessonView.find('.js-prevBtn').addClass('hide');
        } else {
            elementObj.$lessonView.find('.js-prevBtn').removeClass('hide');
        }

        if(wordBookObj.getLessonWordIndex() == wordBookObj.currentLessonBook.wordBook.length-1) {
            elementObj.$lessonView.find('.js-nextBtn').addClass('hide');
            elementObj.$lessonView.find('.js-topCardBtn').removeClass('hide');
        } else {
            elementObj.$lessonView.find('.js-nextBtn').removeClass('hide');
            elementObj.$lessonView.find('.js-topCardBtn').addClass('hide');            
        }

    }

    var updateCardNum = function() {
        elementObj.$lessonView.find('.js-currentNum').text(wordBookObj.getLessonWordIndex()+1);
        elementObj.$lessonView.find('.js-totalNum').text(wordBookObj.currentLessonBook.wordBook.length);
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
            this.handleEvent();
	    },
        handleEvent: function() {
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

    // ランダムな配列
    var getRandomArray = function(array){
        var n = array.length, t, i;
        while (n) {
            i = Math.floor(Math.random() * n--);
            t = array[n];
            array[n] = array[i];
            array[i] = t;
        }
        return array;
    }

    inputWordBooksObj.initialize();
    inputWordBookObj.initialize();
    inputLessonObj.initialize();
    inputTestObj.initialize();

});