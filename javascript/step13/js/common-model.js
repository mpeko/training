/*

*/
      
var wordBookObj = {
    wordBooks: [{
                name: "fruit",
                wordBook: [{"word": "apple", "meaning": "りんご"}]
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
    }
}

wordBookObj.currentEditBook = wordBookObj.wordBooks[0];
wordBookObj.currentQuestionBook = wordBookObj.wordBooks[0];

var questionObj = {
    // 問題単語index set
    setQuestionWordIndex: function(index){
        this.questionWordIndex = index;
    },
    // 問題単語index get
    getQuestionWordIndex: function(){
        return this.questionWordIndex;
    }
}


var validWordBooks = function(str){
    
    if(str == ''){
        return false;
    } else {
        return true;
    }
}

var validWordBook = function(str1, str2){

    var arr = [];

    (str1 == '') ? arr.push(false) : arr.push(true);
    (str2 == '') ? arr.push(false) : arr.push(true);

    return arr;
}

