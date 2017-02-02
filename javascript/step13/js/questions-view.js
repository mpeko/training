/*
    問題
*/

var changeQuestion;     // 問題の切り替え
var changeQuestionBtn;  //戻る/進む ボタンの切り替え

$(function(){

     var inputQuestionsObj = {
        $el: elementObj.$questions,
        data: wordBookObj,
        initialize: function() {
            this.$el.find('.js-wordCard').text(wordBookObj.currentQuestionBook.wordBook[0].word);
            this.$el.find('.js-meaningCard').text(wordBookObj.currentQuestionBook.wordBook[0].meaning).addClass('hide');
            this.$el.find('.js-questionBtnGroup').addClass('hide');

            this.onAnswerBtn();
            this.onPrevBtn();
            this.onNextBtn();
	    },
        onAnswerBtn: function() {
            var addBtn = this.$el.find('.js-answerBtn');
            var self = this;
            addBtn.click(function(){
                // 答えを見る
                self.$el.find('.js-meaningCard').removeClass('hide');
            });
        },
        onPrevBtn: function() {
            var prevBtn = this.$el.find('.js-prevBtn');
            var self = this;
            prevBtn.click(function(){
                // 戻る
                var index = questionObj.getQuestionWordIndex();
                questionObj.setQuestionWordIndex(index -= 1);
                changeQuestion();
                changeQuestionBtn();
            });
        },
        onNextBtn: function() {
            var nextBtn = this.$el.find('.js-nextBtn');
            var self = this;
            nextBtn.click(function(){
                // 進む
                var index = questionObj.getQuestionWordIndex();
                questionObj.setQuestionWordIndex(index += 1);
                changeQuestion();
                changeQuestionBtn();
            });
        }
    }

    // 問題の切り替え
    changeQuestion = function(){
        elementObj.$questions.find('.js-wordCard').text(wordBookObj.currentQuestionBook.wordBook[questionObj.getQuestionWordIndex()].word);
        elementObj.$questions.find('.js-meaningCard').text(wordBookObj.currentQuestionBook.wordBook[questionObj.getQuestionWordIndex()].meaning);
    }

    // 戻る/進む ボタンの切り替え
    changeQuestionBtn = function(){
        if(questionObj.getQuestionWordIndex() == 0) {
            elementObj.$questions.find('.js-prevBtn').addClass('hide');
        } else {
            elementObj.$questions.find('.js-prevBtn').removeClass('hide');
        }

        if(questionObj.getQuestionWordIndex() == wordBookObj.currentQuestionBook.wordBook.length-1) {
            elementObj.$questions.find('.js-nextBtn').addClass('hide');
        } else {
            elementObj.$questions.find('.js-nextBtn').removeClass('hide');
        }
    }

    inputQuestionsObj.initialize();
});