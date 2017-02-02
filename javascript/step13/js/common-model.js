/*

*/
      
var wordBookObj = {
    wordBooks: [{
                name: "fruit",
                wordBook: [{"word": "apple", "meaning": "りんご"}]
            }],
    updateBookNameIndex : 0,                // 編集する単語帳名のindex
    updateWordIndex : 0,                    // 編集する単語のindex
    questionIndex : 0,
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
        this.wordBooks[this.updateBookNameIndex].name = text;
    },
    // 単語追加
    addWord: function(text1, text2){
        this.wordBooks[this.updateBookNameIndex].wordBook.push({ word: text1, meaning: text2 });
    },
    // 編集する単語のindex
    editWordIndex: function(index){
        this.updateWordIndex = index;
    },
    // 単語更新
    updateWord: function(text1, text2){
        this.wordBooks[this.updateBookNameIndex].wordBook[this.updateWordIndex].word = text1;
        this.wordBooks[this.updateBookNameIndex].wordBook[this.updateWordIndex].meaning = text2;
    }
}

var questionObj = {
    // 問題index set
    setQuestionIndex: function(index){
        this.questionIndex = index;
    },
    // 問題index get
    getQuestionIndex: function(){
        return this.questionIndex;
    },
    // 問題単語index set
    setQuestionWordIndex: function(index){
        this.questionWordIndex = index;
    },
    // 問題単語index get
    getQuestionWordIndex: function(){
        return this.questionWordIndex;
    }
}