$(function(){

    var inputWordBookObj = {
        $el: elementObj.$wordBookView,
        data: wordBookObj,
        initialize: function() {

            this.$el.find('.js-wordBookNameEdit').addClass('hide');
            this.$el.find('.js-wordBookEdit').addClass('hide');
            this.$el.find('.js-wordBookAdd').addClass('hide');

            this.onBackBtn();
	    },
        onBackBtn: function() {
            var backBtn = this.$el.find('.js-backBtn');
            var self = this;
            backBtn.click(function(){
                self.$el.addClass('hide');
                elementObj.$wordBooksView.removeClass('hide');
            });
        }
    }

    inputWordBookObj.initialize();
});