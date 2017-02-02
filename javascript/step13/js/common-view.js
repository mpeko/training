/*
    共通
*/

var validation;

var elementObj;

$(function(){

    elementObj = {
        $questions: $('.js-questions'),         // 問題
        $topBtns: $('.js-topBtns'),             // ボタン 
        $wordBooks: $('.js-wordBooks'),         // 単語帳
        $wordBook: $('.js-wordBook')            // 単語
    }

    // バリデーション
    validation = function(str){
        var errorMsg = '';
        $('.js-errorMsg').remove();

        if(str == 'book'){
            if($('.js-bookNameTxt').val() == ''){
                errorMsg += '単語帳名を入力してください。';
            }
        }
        
        if(str == 'word'){
            if($('.js-wordTxt').val() == ''){
                errorMsg += '単語を入力してください。';
            }

            if($('.js-meaningTxt').val() == ''){
                errorMsg += '意味を入力してください。';
            }
        }

        if(errorMsg) {
            errorMsg = '<p class="js-errorMsg">'+ errorMsg +'</p>'

            if(str == 'book'){
                $(".js-wordBooks .js-addGroup").append(errorMsg);
            }

            if(str == 'word'){
                 $(".js-wordBook .js-addGroup").append(errorMsg);
            }

            return false;
        } else {
            return true;
        }
    }
    
});