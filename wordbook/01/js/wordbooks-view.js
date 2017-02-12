/*
    単語帳 メイン画面
*/

var lessonBtn = '<input type="button" value="練習" class="js-lessonBtn">';
var testBtn = '<input type="button" value="テスト" class="js-testBtn">';
var editBtn = '<input type="button" value="編集" class="js-editBtn">';

$(function(){

    var inputWordBooksObj = {
        $el: elementObj.$wordBooksView,
        data: wordBookObj,
        initialize: function() {

            this.$el.find('.js-wordBooksAdd').addClass('hide');
            elementObj.$wordBookView.addClass('hide');
            elementObj.$lessonView.addClass('hide');
            elementObj.$testView.addClass('hide');

            var wordBooks = this.data.wordBooks;
            var list = _.template("<ul>"+"<% _.each(wordBooks, function(item) { %>"+" <li><%= lessonBtn %> <%= testBtn %> <%= editBtn %> <%= item.name %>  </li>"+"<% }); %>"+"</ul>")({wordBooks: wordBooks});

            this.$el.find(".js-list").append(list);

            this.onEditBtn();
            this.onLessonBtn();
            this.onTestBtn();
            
	    },
        onEditBtn: function() {
            var editBtn = this.$el.find('.js-editBtn');
            var self = this;

            // 編集ボタン
            editBtn.click(function(){
                console.log('編集');

                $('header .title').text('編集');

                self.$el.addClass('hide');
                elementObj.$wordBookView.removeClass('hide');
            });
        },
        onLessonBtn: function() {
            var lessonBtn = this.$el.find('.js-lessonBtn');
            var self = this;

            // 練習ボタン
            lessonBtn.click(function(){
                console.log('練習');

                $('header .title').text('練習');

                self.$el.addClass('hide');
                elementObj.$lessonView.removeClass('hide');

            });
        },
        onTestBtn: function() {
            var testBtn = this.$el.find('.js-testBtn');
            var self = this;

            // テストボタン
            testBtn.click(function(){
                console.log('テスト');

                $('header .title').text('テスト');

                self.$el.addClass('hide');
                elementObj.$testView.removeClass('hide');

            });
        }
    }

    inputWordBooksObj.initialize();
});