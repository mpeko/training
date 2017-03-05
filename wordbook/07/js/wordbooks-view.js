
$(function(){

    var touch = ('ontouchstart' in document) ? 'touchstart' : 'click';

    // -------------------------------------------------------------------------
    // スタートView
    // -------------------------------------------------------------------------
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
        $wordBooksMain: $('.js-wordBooksView').find('.js-wordBooksMain'),
        $wordBooksEdit: $('.js-wordBooksView').find('.js-wordBooksEdit'),
        $wordBooksAdd: $('.js-wordBooksView').find('.js-wordBooksAdd'),
        $wordbooksDeletePopup: $('.js-wordbooksDeletePopup'),
        deleteIndex: null,
        initialize: function() {

            var self = this;

            $.ajax({
                url: 'data.json',
                dataType: 'json',
            }).done(function(result){
                var resultLength = result.length;
                for (var i = 0; i < resultLength; i++) {
                    var wordBooksLength = result[0].wordBooks.length;
                    for (var j = 0; j < wordBooksLength; j++) {
                        wordBookObj.wordBooks.push(result[0].wordBooks[j]);
                    }
                }

                wordBookObj.getLocal();

                self.$wordBooksEdit.addClass('hide');
                self.$wordBooksAdd.addClass('hide');
                self.$wordbooksDeletePopup.addClass('hide');

                self.displayMainTemplate();
                self.displayEditTemplate();
                
                self.handleEvent();
            });
            updateHeaderText('単語帳一覧');
	    },
        handleEvent: function() {
            var $wordBooksAddBtn = this.$root.find('.js-wordBooksAddBtn');
            var $addBtn = this.$root.find('.js-addBtn');
            var $editModeBtn = this.$root.find('.js-editModeBtn');
            var $backBtn = this.$root.find('.js-backBtn');
            var $popupCloseBtn = this.$wordbooksDeletePopup.find('.js-closeBtn');
            var $popupDeleteBtn = this.$wordbooksDeletePopup.find('.js-deleteBtn');
            var self = this;
            
            $wordBooksAddBtn.on(touch,function(){

                self.resetErrorMsg();
                
                self.$wordBooksMain.addClass('hide');
                self.$wordBooksAdd.removeClass('hide');

                updateHeaderText('単語帳追加');
                updatePankuzu('単語帳一覧 > 単語帳追加');
            });
            $addBtn.on(touch,function(){
                self.create();
            });
            $editModeBtn.on(touch,function(){

                // 単語帳一覧編集へ
                self.$wordBooksMain.addClass('hide');
                self.$wordBooksEdit.removeClass('hide');

                updateHeaderText('単語帳一覧編集');
                updatePankuzu('単語帳一覧 > 単語帳一覧編集');
            });
            $backBtn.on(touch,function(){
                // 共通・戻る
                self.resetToMain();
                updateHeaderText('単語帳一覧');
                updatePankuzu('単語帳一覧');
            });
            $popupCloseBtn.on(touch,function(){
                self.$wordbooksDeletePopup.addClass('hide');
                self.$root.removeClass('hide');
            });
            $popupDeleteBtn.on(touch,function(){
                self.delete(self.deleteIndex);
                self.$wordbooksDeletePopup.addClass('hide');
                self.$root.removeClass('hide');
            });
        },
        displayMainTemplate: function() {
            // 単語帳一覧 
            this.$wordBooksMain.find('ul li').remove();
            var wordBooks = this.data.wordBooks;

            // テンプレートを取得
            var template = $("#js-wordBooksMain-template").text();

            // テンプレートを定義
            // var compiled = _.map(wordBooks, function(wordBooks) {
                // return _.template(template, wordBooks);
            // })
            // テンプレート適用
            // $("#js-showWordBooksMain-template").html(compiled);
            var self = this;
            $(wordBooks).each(function(){
                var wordBook = this;
                var txt = _.template(template, wordBook);
                var $elm = $(txt).appendTo("#js-showWordBooksMain-template");
                var $lessonBtn = $elm.find('.js-lessonBtn');
                var index = $('.js-lessonBtn').length-1;
                $lessonBtn.on(touch,function(){
                    // 学習画面へ
                    // 問題の選択
                    if(wordBookObj.wordBooks[index].wordBook[0] == undefined){
                        return;// TODO : 単語を登録してください
                    }

                    lessonView.show(index);
                    self.$root.addClass('hide');
                });
            })
        },
        displayEditTemplate: function() {
            // 単語帳一覧 編集
            this.$wordBooksEdit.find('ul li').remove();
            var wordBooks = this.data.wordBooks;
            // テンプレートを取得
            var template = $("#js-wordBooksEdit-template").text();
            // テンプレートを定義
            // var compiled = _.map(wordBooks, function(wordBooks) {
            //     return _.template(template, wordBooks);
            // })
            // テンプレート適用
            // $("#js-showWordBooksEdit-template").html(compiled);

            var self = this;
            $(wordBooks).each(function(){
                var wordBook = this;
                var txt = _.template(template, wordBook);
                var $elm = $(txt).appendTo("#js-showWordBooksEdit-template");
                var $editBtn = $elm.find('.js-editBtn');
                var $deleteBtn = $elm.find('.js-deleteBtn');
                var index = $('.js-wordBooksEdit').find('.js-editBtn').length-1;
                $editBtn.on(touch,function(){
                    // 選択した単語帳編集一覧へ
                    $('.js-wordBookView').find($('.js-name')).text(wordBookObj.wordBooks[index].name);
                    wordBookObj.editBookNameIndex(index);
                    wordBookObj.currentEditBook = wordBookObj.wordBooks[index];

                    wordBookView.displayTemplate();

                    // 単語帳編集へ
                    self.$root.addClass('hide');
                    $('.js-wordBookView').removeClass('hide');

                    updateHeaderText('単語帳編集');
                    updatePankuzu('単語帳一覧 > 単語帳一覧編集 > 単語帳編集');
                });
                $deleteBtn.on(touch,function(){
                    self.deleteIndex = index;
                    var bookName = setTextLength(wordBookObj.wordBooks[self.deleteIndex].name, 16);
                    self.$wordbooksDeletePopup.find('.js-bookName').text(bookName);
                    self.$wordbooksDeletePopup.removeClass('hide');
                    self.$root.addClass('hide');
                });
            })
        },
        create: function() {
            // 単語帳の追加処理

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

            updatePankuzu('単語帳一覧');
            updateHeaderText('単語帳一覧');
        },
        update: function() {
            // モデルの更新
        },
        delete: function(index) {
            // 単語帳の削除処理

            this.data.deleteBook(index);

            this.displayMainTemplate();
            this.displayEditTemplate();

            updatePankuzu('');
            updateHeaderText('単語帳一覧');
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
            this.resetErrorMsg();
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
        $wordBookMain: $('.js-wordBookView').find('.js-wordBookMain'),
        $wordBookNameUpdate: $('.js-wordBookView').find('.js-wordBookNameUpdate'),
        $wordBookUpdate: $('.js-wordBookView').find('.js-wordBookUpdate'),
        $wordBookAdd: $('.js-wordBookView').find('.js-wordBookAdd'),
        $wordbookDeletePopup: $('.js-wordbookDeletePopup'),
        $deleteIndex: null,
        initialize: function() {

            this.$root.addClass('hide');

            this.$wordBookNameUpdate.addClass('hide');
            this.$wordBookUpdate.addClass('hide');
            this.$wordBookAdd.addClass('hide');
            this.$wordbookDeletePopup.addClass('hide');

            this.handleEvent();
	    },
        handleEvent: function() {
            var $mainAddBtn = this.$root.find('.js-mainAddBtn');
            var $bookNameUpdateBtn = this.$wordBookNameUpdate.find('.js-updateBtn');
            var $bookUpdateBtn = this.$wordBookUpdate.find('.js-updateBtn');
            var $mainBackBtn = this.$root.find('.js-mainBackBtn');
            var $backBtn = this.$root.find('.js-backBtn');
            var $addBtn = this.$wordBookAdd.find('.js-addBtn');
            var $bookNameEditBtn = this.$root.find('.js-bookName .js-editBtn');
            var $popupCloseBtn = this.$wordbookDeletePopup.find('.js-closeBtn');
            var $popupDeleteBtn = this.$wordbookDeletePopup.find('.js-deleteBtn');
            var self = this;
            $mainAddBtn.on(touch,function(){
                // 単語追加画面へ
                self.resetErrorMsg();
                self.$wordBookMain.addClass('hide');
                self.$wordBookAdd.removeClass('hide');

                updateHeaderText('単語追加');
                updatePankuzu('単語帳一覧 > 単語帳一覧編集  > 単語帳編集  > 単語追加');
                
            });
            $bookNameUpdateBtn.on(touch,function(){

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
            $bookUpdateBtn.on(touch,function(){

                // 単語更新
                var word = self.$wordBookUpdate.find('.js-updateWordTxt').val();
                var meaing = self.$wordBookUpdate.find('.js-updateMeaningTxt').val();

                self.displayErrorWord('.js-wordBookUpdate .js-errorMsg', word, meaing);
                var check = wordBookObj.validWordBook(word, meaing);
                if (!check) return;

                wordBookObj.updateWord(word, meaing);

                self.displayTemplate();

                self.$wordBookUpdate.find('.js-updateWordTxt').val('');
                self.$wordBookUpdate.find('.js-updateMeaningTxt').val('');
                
                self.resetToMain();
            });
            $mainBackBtn.on(touch,function(){
                // 戻る
                self.$root.addClass('hide');
                $('.js-wordBooksView').removeClass('hide');

                updateHeaderText('単語帳一覧編集');
                updatePankuzu('単語帳一覧 > 単語帳一覧編集');
            });
            $backBtn.on(touch,function(){
                // 共通・戻る
                self.resetToMain();
            });
            $addBtn.on(touch,function(){
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
            $bookNameEditBtn.on(touch,function(){
                //  単語帳名の編集
                self.editBookName();
            });
            $popupCloseBtn.on(touch,function(){
                self.$wordbookDeletePopup.addClass('hide');
                self.$root.removeClass('hide');
            });
            $popupDeleteBtn.on(touch,function(){
                self.delete(self.deleteIndex);
                self.$wordbookDeletePopup.addClass('hide');
                self.$root.removeClass('hide');
            });
        },
        displayTemplate: function() {
            // テンプレートの出力
            // 単語一覧表示
            this.$wordBookMain.find('.js-list ul li').remove();
            var wordBook = wordBookObj.currentEditBook.wordBook;
            // テンプレートを取得
            var template = $("#js-wordBookMain-template").text();
            // テンプレートを定義
            // var compiled = _.map(wordBook, function(wordBook) {
            //     return _.template(template, wordBook);
            // })
            // // テンプレート適用
            // $("#js-showWordBookMain-template").html(compiled);

            var self = this;
            $(wordBook).each(function(){
                var word = this;
                var txt = _.template(template, word);
                var $elm = $(txt).appendTo("#js-showWordBookMain-template");
                var $wordEditBtn = $elm.find('.js-editBtn');
                var $wordDeleteBtn = $elm.find('.js-deleteBtn');
                var index = $('#js-showWordBookMain-template').find('.js-editBtn').length-1;
                $wordEditBtn.on(touch,function(){
                    // 単語の編集
                    self.editWord(index);
                });
                $wordDeleteBtn.on(touch,function(){
                    // 単語の削除
                    self.deleteIndex = index;
                    var text = setTextLength(wordBookObj.currentEditBook.wordBook[wordBookView.deleteIndex].word, 16);
                    self.$wordbookDeletePopup.find('.js-word').text(text);
                    self.$wordbookDeletePopup.removeClass('hide');
                    self.$root.addClass('hide');
                });
            })
        },
        editBookName: function() {
            //  単語帳名の編集
            this.$root.find('.js-updateNameTxt').val(wordBookObj.currentEditBook.name);
            this.$root.find('.js-wordBookMain').addClass('hide');
            this.$root.find('.js-wordBookNameUpdate').removeClass('hide');

            updateHeaderText('単語帳名の編集');
            updatePankuzu('単語帳一覧 > 単語帳一覧編集  > 単語帳編集  > 単語帳名の編集');
        },
        editWord: function(index) {
            // 単語の編集
            wordBookObj.editWordIndex(index);
            this.$root.find('.js-updateWordTxt').val(wordBookObj.currentEditBook.wordBook[wordBookObj.updateWordIndex].word);
            this.$root.find('.js-updateMeaningTxt').val(wordBookObj.currentEditBook.wordBook[wordBookObj.updateWordIndex].meaning);

            this.$root.find('.js-wordBookMain').addClass('hide');
            this.$root.find('.js-wordBookUpdate').removeClass('hide');

            updateHeaderText('単語の編集');
            updatePankuzu('単語帳一覧 > 単語帳一覧編集  > 単語帳編集  > 単語の編集');
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
            updatePankuzu('単語帳一覧 > 単語帳一覧編集 > 単語帳編集');
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
            var $answerBtn = this.$root.find('.js-answerBtn');
            // var $answerBtn = this.$root.find('.js-answerBtn').each(function(){}) 
            var $prevBtn = this.$root.find('.js-prevBtn');
            var $nextBtn = this.$root.find('.js-nextBtn');
            var $replayBtn = this.$root.find('.js-replayBtn');
            var $backBtn = this.$root.find('.js-backBtn');
            var $randomBtn = this.$root.find('.js-randomBtn');
            var $reverseBtn = this.$root.find('.js-reverseBtn');
            var self = this;
            $answerBtn.on(touch,function(){
                // 答えを見る
                $answerBtn.addClass('hide');
                self.$root.find('.js-meaningCardText').removeClass('hide');
            });
            $prevBtn.on(touch,function(){
                var disabled = self.checkClass($prevBtn);
                if (disabled != -1) return;
                // 戻る
                var index = wordBookObj.getLessonWordIndex();
                wordBookObj.setLessonWordIndex(index -= 1);
                self.updateCardNum();
                self.changeCard('prev');
                self.changeCardBtn();
            });
            $nextBtn.on(touch,function(){
                var disabled = self.checkClass($nextBtn);
                if (disabled != -1) return;
                // 進む
                var index = wordBookObj.getLessonWordIndex();
                wordBookObj.setLessonWordIndex(index += 1);
                self.updateCardNum();
                self.changeCard('next');
                self.changeCardBtn();
            });
            $replayBtn.on(touch,function(){
                // 最初から
                $replayBtn.addClass('hide');
                self.startLesson();
            });
            $backBtn.on(touch,function(){
                self.$root.addClass('hide');
                $('.js-wordBooksView').removeClass('hide');

                updatePankuzu('');
                updateHeaderText('単語帳一覧');
            });
            $randomBtn.on(touch,function(){
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
            $reverseBtn.on(touch,function(){
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
        show: function(index){
            wordBookObj.currentLessonBook = wordBookObj.wordBooks[index];
            var bookname = setTextLength(wordBookObj.currentLessonBook.name, 20);
            this.$root.find('.js-wordbookName').text(bookname);
            this.$root.removeClass('hide');
            updateHeaderText('学習');
            updatePankuzu('');
            this.startLesson();
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

            if(this.randomFlag){
                currentIndex = wordBookObj.getLessonWordIndex();
            } else {
                currentIndex = lessonView.randomArray[wordBookObj.getLessonWordIndex()];
            }

            if(this.reverseFlag){
                this.$root.find('.js-wordCardText').text(wordBookObj.currentLessonBook.wordBook[currentIndex].word);
                this.$root.find('.js-meaningCardText').text(wordBookObj.currentLessonBook.wordBook[currentIndex].meaning);
            } else {
                this.$root.find('.js-wordCardText').text(wordBookObj.currentLessonBook.wordBook[currentIndex].meaning);
                this.$root.find('.js-meaningCardText').text(wordBookObj.currentLessonBook.wordBook[currentIndex].word);
            }

            if (btnType == 'prev'){
                this.$root.find('.js-answerBtn').addClass('hide');
                this.$root.find('.js-meaningCardText').removeClass('hide');
            } else if (btnType == 'next'){
                this.$root.find('.js-answerBtn').removeClass('hide');
                this.$root.find('.js-meaningCardText').addClass('hide');
            }
        },
        changeCardBtn: function() {
            // ボタンの切り替え
            if(wordBookObj.getLessonWordIndex() == 0) {
                this.$root.find('.js-prevBtn').addClass('disabled');
            } else {
                this.$root.find('.js-prevBtn').removeClass('disabled');
            }

            if(wordBookObj.getLessonWordIndex() == wordBookObj.currentLessonBook.wordBook.length-1) {
                this.$root.find('.js-nextBtn').addClass('disabled');
                this.$root.find('.js-replayBtn').removeClass('hide');
            } else {
                this.$root.find('.js-nextBtn').removeClass('disabled');
                this.$root.find('.js-replayBtn').addClass('hide');            
            }
        },
        updateCardNum: function() {
            this.$root.find('.js-currentNum').text(wordBookObj.getLessonWordIndex()+1);
            this.$root.find('.js-totalNum').text(wordBookObj.currentLessonBook.wordBook.length);
        },
        checkClass: function(el) {
            var checkClass = el.attr('class');
            var disabled = checkClass.indexOf('disabled');
            return disabled;
        }
    }

    //-------------------------------------------------------------------------
    // タイトル
    //-------------------------------------------------------------------------
    var updateHeaderText = function(text){
        $('#header .title').text(text);
    }

    //-------------------------------------------------------------------------
    // パンくずリスト TODO : 
    //-------------------------------------------------------------------------
    var updatePankuzu = function(text){
        $('.js-pankuzu p').text(text);
    }

    startView.initialize();
    wordBooksView.initialize();
    wordBookView.initialize();
    lessonView.initialize();
});

