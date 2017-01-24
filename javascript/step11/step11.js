/*
JSトレーニング11 【ページ読み込み時にデフォルトで単語を表示する】
*/

$(function(){
    $(document).ready(function () {
        $.getJSON("data.json", function(data){
            for(var i in data){
                for(var j in data[i].wordlist){
                    $("#output").append("<li>" + data[i].wordlist[j].word + " " + data[i].wordlist[j].meaning + "</li>");
                }
            }
        });
    }); 
});