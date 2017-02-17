
$(function(){

    var testWordBooks = [];

    $.ajax({
        url: 'data.json',
        dataType: 'json',
        success: function(data){
            var dataLength = data.length;
            for (var i = 0; i < dataLength; i++) {

                var wordBooksLength = data[0].wordBooks.length;
                for (var j = 0; j < wordBooksLength; j++) {
                    testWordBooks.push(data[0].wordBooks[j]);
                }
            }
        }
    });

    console.log('----------');
    console.log(testWordBooks);
    console.log(testWordBooks.length);
    console.log(testWordBooks[0]);
    console.log('----------');
    console.log(wordBookObj.wordBooks);
    console.log(wordBookObj.wordBooks.length);
    console.log(wordBookObj.wordBooks[0]);

});

