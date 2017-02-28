   var wordBookObj = {
    wordBooks: [],
    errorMessages:[{
                bookName: '単語帳名を入力してください。',
                word: '単語を入力してください。',
                meaning: '意味を入力してください。'
    }],
    currentEditBook : undefined,            // 編集する単語帳
    updateBookNameIndex : 0,                // 編集する単語帳名のindex
    updateWordIndex : 0,                    // 編集する単語のindex
    currentLessonBook : undefined,        // 出題単語帳
    lessonWordIndex : 0,                  // 出題されている単語のindex
    // 単語帳（単語帳名）追加
    addBookName: function(text){
        this.wordBooks.push({"name": text, wordBook: []});
        this.setLocal();
    },
    // 編集する単語帳名のindex
    editBookNameIndex: function(index){
        this.updateBookNameIndex = index;
    },
    // 単語帳の削除
    deleteBook: function(index){

    console.log(index);
    console.log(this.wordBooks);
       this.wordBooks.splice(index,1);
       this.setLocal();
    },
    // 単語の削除
    deleteWord: function(index){
       this.currentEditBook.wordBook.splice(index,1);
    },
    // 単語帳名更新
    updateBookName: function(text){
       this.currentEditBook.name = text;
       this.setLocal();
    },
    // 単語追加
    addWord: function(text1, text2){
       this.currentEditBook.wordBook.push({ word: text1, meaning: text2 });
       this.setLocal();
    },
    // 編集する単語のindex
    editWordIndex: function(index){
        this.updateWordIndex = index;
    },
    // 単語更新
    updateWord: function(text1, text2){
        this.currentEditBook.wordBook[this.updateWordIndex].word = text1;
        this.currentEditBook.wordBook[this.updateWordIndex].meaning = text2;
        this.setLocal();
    },
    // 学習単語index set
    setLessonWordIndex: function(index){
        this.lessonWordIndex = index;
    },
    // 学習単語index get
    getLessonWordIndex: function(){
        return this.lessonWordIndex;
    },
    validWordBooks: function(bookName){
        if(bookName == ''){
            return false;
        } else {
            return true;
        }
    },
    validWordBook: function(word, meaning){
        var flag = true;

        if (word == '' || meaning == '') {
            flag = false;
        } else {
            flag = true;
        }
        return flag;
    },
    setLocal: function(){
        localStorage.setItem('wordbook', JSON.stringify(this.wordBooks));
    },
    getLocal: function(){
        if (localStorage.getItem('wordbook') != null){
            this.wordBooks = JSON.parse(localStorage.getItem('wordbook'));
        }
    }
}

wordBookObj.currentEditBook = wordBookObj.wordBooks[0];
wordBookObj.currentLessonBook = wordBookObj.wordBooks[0];