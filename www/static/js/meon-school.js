var school = new Object();

school.answer = null;
school.alertTimer = null;
school.answerCount = 0;
school.answerCorrect = 0;

$(document).ready(function(){
    $('form.question').submit(school.submit);
    school.initFocus();
    school.giveNewQuestion();
});

school.submit = function (e) {
    e.preventDefault();

    school.answerCount++;

    $('.good-answer').hide();
    $('.false-answer').hide();
    clearTimeout(school.alertTimer);

    if (trim(school.input().val()) == school.answer) {
        $('.good-answer').show();
        school.giveNewQuestion();        
        school.initFocus();
        school.answerCorrect++;
    }
    else {
        $('#question-el').html(school.questionHtml);
        $('.false-answer').show();
    }

    school.alertTimer = setTimeout(function() {
        $('.alert').fadeOut();
        school.initFocus()
    },2000);

    school.showScore();
}

school.initFocus = function () {
    school.input().select().focus();
}

school.input = function () {
    return $('form.question input').first();
}

school.giveNewQuestion = function () {
    while (1) {
        var question = school.new_question();
        if (school.answer != question.answer) {
            school.questionHtml = question.html;
            school.answer = question.answer;
            $('#question-el').html(school.questionHtml);
            break;
        }
    }
}

school.showScore = function () {
    if (school.answerCount < 1) return;

    $('#score').html(
        school.answerCorrect
        +'/'
        +school.answerCount
        +' '
        +'('+(Math.floor(school.answerCorrect*100/(school.answerCount)))+'%)'
    );
}

trim = function(s){return s.replace(/^\s+|\s+$/g, '');};
