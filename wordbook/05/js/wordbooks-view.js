/*
    単語帳
*/

// TODO : 
var editBtn = '<span class="js-editBtn btn white-blue-btn">編集</span>';
var deleteBtn = '<img src="images/trash.png" class="js-deleteBtn trash-btn">';

$(function(){

    var elementObj = {
        $headerText: $('#header .title'),                  // タイトル
        $wordBooksView: $('.js-wordBooksView'),            // 単語帳一覧 トップ画面
        $wordBookView: $('.js-wordBookView'),              // 単語帳編集 
        $lessonView: $('.js-lessonView'),                  // 学習
    }

    function getWordData(){
        return $.ajax({
            url: 'data.json',
            dataType: 'json',
        });
    }

    // 初期データを取得する
    getWordData().done(function(result) {
        var resultLength = result.length;
        for (var i = 0; i < resultLength; i++) {
            var wordBooksLength = result[0].wordBooks.length;
            for (var j = 0; j < wordBooksLength; j++) {
                wordBookObj.wordBooks.push(result[0].wordBooks[j]);
            }
        }

        wordBookObj.getLocal();

        startView.initialize();
        wordBooksView.initialize();
        wordBookView.initialize();
        lessonView.initialize();
    });
    //-------------------------------------------------------------------------
    // スタートView
    //-------------------------------------------------------------------------
    var startView = {
        initialize: function() {
            var interval = setInterval(function() {
                $('.js-startView p').fadeOut(2000).queue(function() {
                    $('.js-startView').fadeOut(1000);
                });
                clearInterval(interval);
            }, 2000);
        }
    }

    //-------------------------------------------------------------------------
    // 単語帳一覧
    //-------------------------------------------------------------------------
    var wordBooksView = {
        $root: $('.js-wordBooksView'),
        data: wordBookObj,
        $wordBooksMain: elementObj.$wordBooksView.find('.js-wordBooksMain'),
        $wordBooksEdit: elementObj.$wordBooksView.find('.js-wordBooksEdit'),
        $wordBooksAdd: elementObj.$wordBooksView.find('.js-wordBooksAdd'),
        $wordbooksDeletePopup: $('.js-wordbooksDeletePopup'),
        pankuzu: wordBookObj.pankuzuTopName,
        deleteIndex: null,
        initialize: function() {
            
            this.$wordBooksEdit.addClass('hide');
            this.$wordBooksAdd.addClass('hide');
            this.$wordbooksDeletePopup.addClass('hide');

            this.displayMainTemplate();
            this.displayEditTemplate();
            
            this.handleEvent();

            updateHeaderText(wordBookObj.pankuzuTopName);
	    },
        displayMainTemplate: function() {
            // 単語帳一覧 
            this.$root.find('.js-wordBooksMain ul li').remove();
            var wordBooks = this.data.wordBooks;

            // テンプレートを取得
            var template = $("#js-wordBooksMain-template").text();
            // テンプレートを定義
            var compiled = _.map(wordBooks, function(wordBooks) {
                return _.template(template, wordBooks);
            })
            // テンプレート適用
            $("#js-showWordBooksMain-template").html(compiled);

            // elementObj.$wordBooksView.find('.js-wordBooksMain ul').remove();
            // var wordBooks = wordBookObj.wordBooks;

            // var list = _.template("<ul>"+"<% _.each(wordBooks, function(item) { %>"+" <li><%= lessonBtn %> <%= testBtn %> <%= item.name %> </li>"+"<% }); %>"+"</ul>")({wordBooks: wordBooks});
            // elementObj.$wordBooksView.find(".js-wordBooksMain .js-list").append(list);
        },
        displayEditTemplate: function() {
            // 単語帳一覧 編集
            this.$root.find('.js-wordBooksEdit ul li').remove();
            var wordBooks = this.data.wordBooks;
            // テンプレートを取得
            var template = $("#js-wordBooksEdit-template").text();
            // テンプレートを定義
            var compiled = _.map(wordBooks, function(wordBooks) {
                return _.template(template, wordBooks);
            })
            // テンプレート適用
            $("#js-showWordBooksEdit-template").html(compiled);
        },
        create: function() {
            // 単語帳の追加処理

            // 単語帳追加する
            var name = this.$root.find('.js-bookNameTxt').val();
            var check = wordBookObj.validWordBooks(name);
            if (!check) {
                this.displayErrorBookName(name);
                return;
            }
        
            this.data.addBookName(name);
            this.$root.find('.js-bookNameTxt').val('');

            this.displayMainTemplate();
            this.displayEditTemplate();

            this.resetToMain();

            updatePankuzu(wordBookObj.pankuzuTopName);
            updateHeaderText(wordBookObj.pankuzuTopName);
                
        },
        update: function() {
            // モデルの更新
        },
        delete: function(index) {
            // 単語帳の削除処理
            
            this.data.deleteBook(index);

            this.displayMainTemplate();
            this.displayEditTemplate();
            
            this.resetBtn();

            updatePankuzu('');
            updateHeaderText(wordBookObj.pankuzuTopName);
        },
        handleEvent: function() {
            var wordBooksAddBtn = this.$root.find('.js-wordBooksAddBtn');
            var addBtn = this.$root.find('.js-addBtn');
            var editModeBtn = this.$root.find('.js-editModeBtn');
            var editBtn = this.$root.find('.js-editBtn');
            var deleteBtn = this.$root.find('.js-wordBooksEdit .js-deleteBtn');
            var lessonBtn = this.$root.find('.js-lessonBtn');
            var backBtn = this.$root.find('.js-backBtn');
            var popupCloseBtn = this.$wordbooksDeletePopup.find('.js-closeBtn');
            var popupDeleteBtn = this.$wordbooksDeletePopup.find('.js-deleteBtn');
            var self = this;
            wordBooksAddBtn.click(function(){
                self.$wordBooksMain.addClass('hide');
                self.$wordBooksAdd.removeClass('hide');

                updateHeaderText('単語帳追加');
                updatePankuzu(wordBookObj.pankuzuTopName+' > 単語帳追加');
                
            });
            addBtn.click(function(){
                self.create();
            });
            editModeBtn.click(function(){

                // 単語帳一覧編集へ
                self.$wordBooksMain.addClass('hide');
                self.$wordBooksEdit.removeClass('hide');

                updateHeaderText('単語帳一覧編集');
                updatePankuzu(wordBookObj.pankuzuTopName+' > 単語帳一覧編集');
            });
            editBtn.click(function(){

                // 選択した単語帳編集一覧へ
                var index = self.$root.find('.js-wordBooksEdit .js-editBtn').index(this);
                elementObj.$wordBookView.find($('.js-name')).text(wordBookObj.wordBooks[index].name);
                wordBookObj.editBookNameIndex(index);
                wordBookObj.currentEditBook = wordBookObj.wordBooks[index];

                wordBookView.displayTemplate();

                // 単語帳編集へ
                self.$root.addClass('hide');
                elementObj.$wordBookView.removeClass('hide');

                updateHeaderText('単語帳編集');
                updatePankuzu(wordBookObj.pankuzuTopName+' > 単語帳一覧編集 > 単語帳編集');
            });
            deleteBtn.click(function(){
                self.deleteIndex = deleteBtn.index(this);
                var bookName = setTextLength(wordBookObj.wordBooks[self.deleteIndex].name, 16);
                self.$wordbooksDeletePopup.find('.js-bookName').text(bookName);
                self.$wordbooksDeletePopup.removeClass('hide');
                self.$root.addClass('hide');
            });
            lessonBtn.click(function(){
                // 学習画面へ

                // 問題の選択
                var index = self.$root.find('.js-lessonBtn').index(this);

                if(wordBookObj.wordBooks[index].wordBook[0] == undefined){
                    return;// TODO : 単語を登録してください
                }

                wordBookObj.currentLessonBook = wordBookObj.wordBooks[index];
                var bookname = setTextLength(wordBookObj.currentLessonBook.name, 20);
                elementObj.$lessonView.find('.js-wordbookName').text(bookname);

                lessonView.startLesson();

                self.$root.addClass('hide');
                elementObj.$lessonView.removeClass('hide');

                updateHeaderText('学習');
                updatePankuzu('');
                
            });
            backBtn.click(function(){
                // 共通・戻る
                self.resetToMain();
                updateHeaderText(wordBookObj.pankuzuTopName);
                updatePankuzu(wordBookObj.pankuzuTopName);
            });
            popupCloseBtn.click(function(){
                self.$wordbooksDeletePopup.addClass('hide');
                self.$root.removeClass('hide');
            });
            popupDeleteBtn.click(function(){
                self.delete(self.deleteIndex);
                self.$wordbooksDeletePopup.addClass('hide');
                self.$root.removeClass('hide');
            });
        },
        displayErrorBookName: function(name) {
            var errorMsg = '';
            if (name == ''){
               errorMsg = wordBookObj.errorMessages[0].bookName; 
            }
            this.$root.find('.js-errorMsg').text(errorMsg);
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
            this.$root.find('.js-errorMsg').text('');
        }
    }

    //-------------------------------------------------------------------------
    // 単語帳編集
    //-------------------------------------------------------------------------
    var wordBookView = {
        $root: $('.js-wordBookView'),
        data: wordBookObj,
        $wordBookMain: elementObj.$wordBookView.find('.js-wordBookMain'),
        $wordBookNameUpdate: elementObj.$wordBookView.find('.js-wordBookNameUpdate'),
        $wordBookUpdate: elementObj.$wordBookView.find('.js-wordBookUpdate'),
        $wordBookAdd: elementObj.$wordBookView.find('.js-wordBookAdd'),
        $wordbookDeletePopup: $('.js-wordbookDeletePopup'),
        $deleteIndex: null,
        initialize: function() {

            this.$root.addClass('hide');

            this.$wordBookNameUpdate.addClass('hide');
            this.$wordBookUpdate.addClass('hide');
            this.$wordBookAdd.addClass('hide');
            this.$wordbookDeletePopup.addClass('hide');

            // this.handleEvent();
	    },
        handleEvent: function() {
            var mainAddBtn = this.$root.find('.js-mainAddBtn');
            var bookNameUpdateBtn = this.$wordBookNameUpdate.find('.js-updateBtn');
            var bookUpdateBtn = this.$wordBookUpdate.find('.js-updateBtn');
            var addBtn = this.$wordBookAdd.find('.js-addBtn');
            var mainBackBtn = this.$root.find('.js-mainBackBtn');
            var bookNameEditBtn = this.$root.find('.js-bookName .js-editBtn');
            var wordEditBtn = this.$root.find('.js-wordBookMain .js-list .js-editBtn');
            var wordDeleteBtn = this.$root.find('.js-wordBookMain .js-list .js-deleteBtn');
            var backBtn = this.$root.find('.js-backBtn');
            var popupCloseBtn = this.$wordbookDeletePopup.find('.js-closeBtn');
            var popupDeleteBtn = this.$wordbookDeletePopup.find('.js-deleteBtn');
            var self = this;
            mainAddBtn.click(function(){
                // 単語追加画面へ
                self.$wordBookMain.addClass('hide');
                self.$wordBookAdd.removeClass('hide');

                updateHeaderText('単語追加');
                updatePankuzu(wordBookObj.pankuzuTopName+' > 単語帳一覧編集  > 単語帳編集  > 単語追加');
                
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
                
                wordBooksView.displayMainTemplate();
                wordBooksView.displayEditTemplate();

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

                self.$root.find('.js-list > ul > li:eq('+wordBookObj.updateWordIndex+')').html(deleteBtn+' '+editBtn+' '+word +' : '+ meaing);

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
                self.displayTemplate();

                self.$wordBookAdd.find('.js-wordTxt').val('');
                self.$wordBookAdd.find('.js-meaningTxt').val('');

                self.resetToMain();
            });
            bookNameEditBtn.click(function(){
                //  単語帳名の編集
                self.editBookName();
            });
            wordEditBtn.click(function(){
                // 単語の編集
                var index = self.$root.find('.js-list .js-editBtn').index(this);
                self.editWord(index);
            });
            wordDeleteBtn.click(function(){
                // 単語の削除
                self.deleteIndex = self.$root.find('.js-list .js-deleteBtn').index(this);
                var text = setTextLength(wordBookObj.currentEditBook.wordBook[wordBookView.deleteIndex].word, 16);
                self.$wordbookDeletePopup.find('.js-word').text(text);
                self.$wordbookDeletePopup.removeClass('hide');
                self.$root.addClass('hide');
            });
            mainBackBtn.click(function(){
                // 戻る
                self.$root.addClass('hide');
                elementObj.$wordBooksView.removeClass('hide');

                updateHeaderText('単語帳一覧編集');
                updatePankuzu(wordBookObj.pankuzuTopName+' > 単語帳一覧編集');
            });
            backBtn.click(function(){
                // 共通・戻る
                self.resetToMain();
            });
            popupCloseBtn.click(function(){
                self.$wordbookDeletePopup.addClass('hide');
                self.$root.removeClass('hide');
            });
            popupDeleteBtn.click(function(){
                self.delete(self.deleteIndex);
                self.$wordbookDeletePopup.addClass('hide');
                self.$root.removeClass('hide');
            });
        },
        displayTemplate: function() {
            // テンプレートの出力
            // 単語一覧表示
            this.$root.each(function(){
                var $book = $(this);
                $book.find('.js-list ul li').remove();
                var wordBook = wordBookObj.currentEditBook.wordBook;
                // テンプレートを取得
                var template = $("#js-wordBookMain-template").text();
                // テンプレートを定義
                var compiled = _.map(wordBook, function(wordBook) {
                    return _.template(template, wordBook);
                })
                // テンプレート適用
                $("#js-showWordBookMain-template").html(compiled);
            });

            this.handleEvent();
        },
        editBookName: function() {
            //  単語帳名の編集
            this.$root.find('.js-updateNameTxt').val(wordBookObj.currentEditBook.name);
            this.$root.find('.js-wordBookMain').addClass('hide');
            this.$root.find('.js-wordBookNameUpdate').removeClass('hide');

            updateHeaderText('単語帳名の編集');
            updatePankuzu(wordBookObj.pankuzuTopName+' > 単語帳一覧編集  > 単語帳編集  > 単語帳名の編集');
        },
        editWord: function(index) {
            // 単語の編集
            // var index = this.$root.find('.js-list .js-editBtn').index(this);
            wordBookObj.editWordIndex(index);
            this.$root.find('.js-updateWordTxt').val(wordBookObj.currentEditBook.wordBook[wordBookObj.updateWordIndex].word);
            this.$root.find('.js-updateMeaningTxt').val(wordBookObj.currentEditBook.wordBook[wordBookObj.updateWordIndex].meaning);

            this.$root.find('.js-wordBookMain').addClass('hide');
            this.$root.find('.js-wordBookUpdate').removeClass('hide');

            updateHeaderText('単語の編集');
            updatePankuzu(wordBookObj.pankuzuTopName+' > 単語帳一覧編集  > 単語帳編集  > 単語の編集');
        },
        delete: function(index) {
            // 単語の削除
            wordBookObj.deleteWord(index);
            this.displayTemplate();
        },
        displayErrorBookName: function(name) {
            var errorMsg = '';
            if (name == ''){
               errorMsg = wordBookObj.errorMessages[0].bookName; 
            }
            this.$root.find('.js-wordBookNameUpdate .js-errorMsg').text(errorMsg);
        },
        displayErrorWord: function(el, word, meaning) {
            var errorMsg = '';
            if (word == ''){
                errorMsg += wordBookObj.errorMessages[0].word;
            }
            if (meaning == '') {
                errorMsg += wordBookObj.errorMessages[0].meaning;
            }
            this.$root.find(el).text(errorMsg);
        },
        resetToMain: function() {
            // 共通・単語帳編集画面へ
            this.$root.find('.js-wordBookMain').removeClass('hide');
            this.$root.find('.js-wordBookNameUpdate').addClass('hide');
            this.$root.find('.js-wordBookUpdate').addClass('hide');
            this.$root.find('.js-wordBookAdd').addClass('hide');
            
            this.resetErrorMsg();

            updateHeaderText('単語帳編集');
            updatePankuzu(wordBookObj.pankuzuTopName+' > 単語帳一覧編集 > 単語帳編集');
            
        },
        resetErrorMsg: function() {
            this.$root.find('.js-errorMsg').text('');
        }
    }

    //-------------------------------------------------------------------------
    // 学習
    //-------------------------------------------------------------------------
    var lessonView = {
        $root: $('.js-lessonView'),
        data: wordBookObj,
        randomFlag: true,
        reverseFlag: true,
        randomArray: [],
        initialize: function() {

            this.$root.addClass('hide');
            this.$root.find('.js-replayBtn').addClass('hide');

            this.handleEvent();
	    },
        handleEvent: function() {
            var answerBtn = this.$root.find('.js-answerBtn');
            var prevBtn = this.$root.find('.js-prevBtn');
            var nextBtn = this.$root.find('.js-nextBtn');
            var replayBtn = this.$root.find('.js-replayBtn');
            var backBtn = this.$root.find('.js-backBtn');
            var randomBtn = this.$root.find('.js-randomBtn');
            var reverseBtn = this.$root.find('.js-reverseBtn');
            var self = this;
            answerBtn.click(function(){
                // 答えを見る
                answerBtn.addClass('hide');
                self.$root.find('.js-meaningCardText').removeClass('hide');
            });
            prevBtn.click(function(){
                var disabled = self.checkClass(prevBtn);
                if (disabled != -1) return;
                // 戻る
                var index = wordBookObj.getLessonWordIndex();
                wordBookObj.setLessonWordIndex(index -= 1);
                self.updateCardNum();
                self.changeCard('prev');
                self.changeCardBtn();
            });
            nextBtn.click(function(){
                var disabled = self.checkClass(nextBtn);
                if (disabled != -1) return;
                // 進む
                var index = wordBookObj.getLessonWordIndex();
                wordBookObj.setLessonWordIndex(index += 1);
                self.updateCardNum();
                self.changeCard('next');
                self.changeCardBtn();
            });
            replayBtn.click(function(){
                // 最初から
                replayBtn.addClass('hide');
                self.startLesson();
            });
            backBtn.click(function(){
                self.$root.addClass('hide');
                elementObj.$wordBooksView.removeClass('hide');

                updatePankuzu('');
                updateHeaderText(wordBookObj.pankuzuTopName);
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
            this.updateCardNum();
            this.changeCardBtn();

            var startIndex;

            if(this.randomFlag){
                startIndex = 0;
            } else {
                startIndex = this.randomArray[0];
            }

            if(this.reverseFlag){
                this.$root.find('.js-wordCardText').text(wordBookObj.currentLessonBook.wordBook[startIndex].word);
                this.$root.find('.js-meaningCardText').text(wordBookObj.currentLessonBook.wordBook[startIndex].meaning).addClass('hide');
            } else {
                this.$root.find('.js-wordCardText').text(wordBookObj.currentLessonBook.wordBook[startIndex].meaning);
                this.$root.find('.js-meaningCardText').text(wordBookObj.currentLessonBook.wordBook[startIndex].word).addClass('hide');
            }

            this.$root.find('.js-answerBtn').removeClass('hide');
            this.$root.find('.js-meaningCardText').addClass('hide');
        },
        changeCard: function(btnType) {
            // カードの切り替え
            var currentIndex;

            if(lessonView.randomFlag){
                currentIndex = wordBookObj.getLessonWordIndex();
            } else {
                currentIndex = lessonView.randomArray[wordBookObj.getLessonWordIndex()];
            }

            if(lessonView.reverseFlag){
                elementObj.$lessonView.find('.js-wordCardText').text(wordBookObj.currentLessonBook.wordBook[currentIndex].word);
                elementObj.$lessonView.find('.js-meaningCardText').text(wordBookObj.currentLessonBook.wordBook[currentIndex].meaning);
            } else {
                elementObj.$lessonView.find('.js-wordCardText').text(wordBookObj.currentLessonBook.wordBook[currentIndex].meaning);
                elementObj.$lessonView.find('.js-meaningCardText').text(wordBookObj.currentLessonBook.wordBook[currentIndex].word);
            }

            if (btnType == 'prev'){
                elementObj.$lessonView.find('.js-answerBtn').addClass('hide');
                elementObj.$lessonView.find('.js-meaningCardText').removeClass('hide');
            } else if (btnType == 'next'){
                elementObj.$lessonView.find('.js-answerBtn').removeClass('hide');
                elementObj.$lessonView.find('.js-meaningCardText').addClass('hide');
            }
        },
        changeCardBtn: function() {
            // ボタンの切り替え
            if(wordBookObj.getLessonWordIndex() == 0) {
                elementObj.$lessonView.find('.js-prevBtn').addClass('disabled');
            } else {
                elementObj.$lessonView.find('.js-prevBtn').removeClass('disabled');
            }

            if(wordBookObj.getLessonWordIndex() == wordBookObj.currentLessonBook.wordBook.length-1) {
                elementObj.$lessonView.find('.js-nextBtn').addClass('disabled');
                elementObj.$lessonView.find('.js-replayBtn').removeClass('hide');
            } else {
                elementObj.$lessonView.find('.js-nextBtn').removeClass('disabled');
                elementObj.$lessonView.find('.js-replayBtn').addClass('hide');            
            }
        },
        updateCardNum: function() {
            elementObj.$lessonView.find('.js-currentNum').text(wordBookObj.getLessonWordIndex()+1);
            elementObj.$lessonView.find('.js-totalNum').text(wordBookObj.currentLessonBook.wordBook.length);
        },
        checkClass: function(el) {
            var checkClass = el.attr('class');
            var disabled = checkClass.indexOf('disabled');
            return disabled;
        }
    }

    //-------------------------------------------------------------------------
    // 共通
    //-------------------------------------------------------------------------

    // タイトル
    var updateHeaderText = function(text){
        elementObj.$headerText.text(text);
    }

    // パンくずリスト TODO : 
    var updatePankuzu = function(text){
        $('.js-pankuzu p').text(text);
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

    // テキストが長い場合...にする
    var setTextLength = function(str, num){      
        var text = str;
        if(num < str.length){
            text = str.slice(0, num)+'...';
        }
        return text;
    }

});

