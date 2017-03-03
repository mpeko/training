//-------------------------------------------------------------------------
// ランダムな配列
//-------------------------------------------------------------------------
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

//-------------------------------------------------------------------------
// テキストが長い場合...にする
//-------------------------------------------------------------------------
var setTextLength = function(str, num){      
    var text = str;
    if(num < str.length){
        text = str.slice(0, num)+'...';
    }
    return text;
}