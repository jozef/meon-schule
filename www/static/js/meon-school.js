var school = new Object();

trim = function(s){return s.replace(/^\s+|\s+$/g, '');};
epoch = function () { return Math.floor((new Date).getTime()/1000); }

school.answer = null;
school.alertTimer = null;
school.answerCount = 0;
school.answerCorrect = 0;
school.startEpoch = epoch();

school.smiley_index = 3;
school.smileys = [
    '/static/img/smileys/loving.png',
    '/static/img/smileys/loving.png',
    '/static/img/smileys/happy.png',
    '/static/img/smileys/happy.png',
    '/static/img/smileys/winking.png',
    '/static/img/smileys/surprised.png',
    '/static/img/smileys/alarmed.png',
    '/static/img/smileys/exploded.png'
];

$(document).ready(function(){
    $('form.question').submit(school.submit);
    school.initFocus();
    school.giveNewQuestion();
    school.updateTimer();
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
        if (school.smiley_index > 0) {
            school.smiley_index--;
        }
    }
    else {
        $('#question-el').html(school.questionHtml);
        $('.false-answer').show();
        if (school.smiley_index < school.smileys.length-1) {
            school.smiley_index++;
        }
    }

    school.alertTimer = setTimeout(function() {
        $('.alert').fadeOut();
        school.initFocus()
    },2000);

    school.showScore();
    school.showSmiley();
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

school.updateTimer = function () {
    var seconds = epoch() - school.startEpoch;
    $('#timer').text(format_seconds(seconds));
    setTimeout(school.updateTimer, 1000);
}

format_seconds = function (total_sec) {
    var seconds = total_sec % 60;
    var minutes = Math.floor((total_sec / 60)) % 60;
    var hours = Math.floor((total_sec / 60 / 60));
    return format_2decimal(hours)+':'+format_2decimal(minutes)+':'+format_2decimal(seconds);
}

format_2decimal = function (d) {
    if (d < 10) { d = '0'+d };
    return d;
}

school.showSmiley = function () {
    $('.smiley img').attr('src', school.smileys[school.smiley_index]);
}
