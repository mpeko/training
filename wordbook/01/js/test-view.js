$(function(){

    var inputTestObj = {
        $el: elementObj.$testView,
        data: wordBookObj,
        initialize: function() {
            this.$el.find('.js-result').addClass('hide');

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

    inputTestObj.initialize();
});