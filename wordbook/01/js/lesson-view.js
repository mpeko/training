$(function(){

    var inputLessonObj = {
        $el: elementObj.$lessonView,
        data: wordBookObj,
        initialize: function() {
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

    inputLessonObj.initialize();
});