/*

*/
      
var wordBookObj = {
    wordBooks: [{
                name: "fruit",
                wordBook: [{"word": "apple", "meaning": "りんご"}]
    }],
    errorMessages:[{
                bookName: '単語帳名を入力してください。',
                word: '単語を入力してください。',
                meaning: '意味を入力してください。'
    }],
    currentEditBook : undefined,            // 編集する単語帳
    updateBookNameIndex : 0,                // 編集する単語帳名のindex
    updateWordIndex : 0,                    // 編集する単語のindex
    currentQuestionBook : undefined,        // 出題単語帳
    questionWordIndex : 0,                  // 出題されている単語のindex
    // 単語帳（単語帳名）追加
    addBookName: function(text){
        this.wordBooks.push({"name": text, wordBook: []});
    },
    // 編集する単語帳名のindex
    editBookNameIndex: function(index){
        this.updateBookNameIndex = index;
    },
    // 単語帳名更新
    updateBookName: function(text){
       this.currentEditBook.name = text;
    },
    // 単語追加
    addWord: function(text1, text2){
       this.currentEditBook.wordBook.push({ word: text1, meaning: text2 });
    },
    // 編集する単語のindex
    editWordIndex: function(index){
        this.updateWordIndex = index;
    },
    // 単語更新
    updateWord: function(text1, text2){
        this.currentEditBook.wordBook[this.updateWordIndex].word = text1;
        this.currentEditBook.wordBook[this.updateWordIndex].meaning = text2;
    },
    // 問題単語index set
    setQuestionWordIndex: function(index){
        this.questionWordIndex = index;
    },
    // 問題単語index get
    getQuestionWordIndex: function(){
        return this.questionWordIndex;
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
    }
}

wordBookObj.currentEditBook = wordBookObj.wordBooks[0];
wordBookObj.currentQuestionBook = wordBookObj.wordBooks[0];