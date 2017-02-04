
$(function(){
    
    var wordBookObj = {

        wordBooks: [{
                    name: "fruit",
                    wordBook: [{"word": "apple", "meaning": "りんご"}]
                    }]
    }

    wordBookObj.wordBooks.push({"name": "sports", wordBook: []});
    console.log(wordBookObj.wordBooks);//？？？pushしていないのに　word: '１１１', meaning: '２２２'が入る
    wordBookObj.wordBooks[1].wordBook.push({ word: '１１１', meaning: '２２２' });
    console.log(wordBookObj.wordBooks);
});
