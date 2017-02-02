/*
    ボタン
*/

$(function(){

    var inputTopBtnObj = {
        $el: elementObj.$topBtns,
        initialize: function() {
            this.onWordBooksBtn();
	    },
        onWordBooksBtn: function() {
            var wordBooksBtn = this.$el.find('.js-wordBooksBtn');
            wordBooksBtn.click(function(){
                // 単語帳一覧表示
                $(this).addClass('hide');
                elementObj.$wordBooks.removeClass('hide');
            });
        }
    }

    inputTopBtnObj.initialize();
});