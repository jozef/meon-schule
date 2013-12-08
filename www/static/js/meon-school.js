var school = new Object();

trim = function(s){return s.replace(/^\s+|\s+$/g, '');};
epoch = function () { return Math.floor((new Date).getTime()/1000); }

school.answer = null;
school.alertTimer = null;
school.answerCount = 0;
school.answerCorrect = 0;
school.startEpoch = epoch();

school.smiley_index = 3;
school.smiley_timeout = null;
school.smiley_timer = null;
school.smileys = [
    '/static/img/smileys/loving.png',
    '/static/img/smileys/loving.png',
    '/static/img/smileys/happy.png',
    '/static/img/smileys/happy.png',
    '/static/img/smileys/winking.png',
    '/static/img/smileys/surprised.png',
    '/static/img/smileys/alarmed.png',
    '/static/img/smileys/unhappy.png',
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
        school.smileyMoodUp();
    }
    else {
        $('#question-el').html(school.questionHtml);
        $('.false-answer').show();
        school.smileyMoodDown();
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
            school.smileyMoodTimer();

            break;
        }
    }
}

school.smileyMoodTimer = function () {
    clearTimeout(school.smiley_timer);
    if (school.smiley_timeout) {
        school.smiley_timer = setTimeout(function() {
            school.smileyMoodDown();
            school.smileyMoodTimer();
        }, school.smiley_timeout);
    }
}

school.smileyMoodUp = function () {
    if (school.smiley_index > 0) {
        school.smiley_index--;
    }
    school.showSmiley();
    school.smileyMoodTimer();
}

school.smileyMoodDown = function () {
    if (school.smiley_index < school.smileys.length-1) {
        school.smiley_index++;
    }
    school.showSmiley();
    school.smileyMoodTimer();
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

school.randomFromTo = function (from,to) {
    return Math.floor(Math.random()*(to-from+1))+from;
}

school.num2deu_cardinal = function ($positive) {
    // thanks to PetaMem - Lingua-DEU-Num2Word → http://search.cpan.org/perldoc?Lingua%3A%3ADEU%3A%3ANum2Word
    var $tokens1 = ['null', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf'];
    var $tokens2 = ['zwanzig', 'dreissig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig', 'hundert'];

    if ($positive >= 0 && $positive < 13) return $tokens1[$positive]; // 0 .. 12
    if ($positive == 16) return 'sechzehn';                  // 16 exception
    if ($positive == 17) return 'siebzehn';                  // 17 exception
    if ($positive > 12 && $positive < 20) return $tokens1[$positive-10] + 'zehn'; // 13 .. 19

    var $out = '';     // string for return value construction
    var $one_idx;      // index for tokens1 array
    var $remain;       // remainder

    if ($positive > 19 && $positive < 101) {              // 20 .. 100
        $one_idx = Math.floor($positive / 10);
        $remain  = $positive % 10;

        if ($remain) $out  = $tokens1[$remain]+'und';
        $out += $tokens2[$one_idx - 2];
    }
    else if ($positive > 100 && $positive < 1000) {       // 101 .. 999
        $one_idx = Math.floor($positive / 100);
        $remain  = $positive % 100;

        $out  = $tokens1[$one_idx]+'hundert';
        $out += $remain ? school.num2deu_cardinal($remain) : '';
    }
    else if ($positive > 999 && $positive < 1000000) {  // 1000 .. 999_999
        $one_idx = Math.floor($positive / 1000);
        $remain  = $positive % 1000;

        $out  = school.num2deu_cardinal($one_idx)+'tausend';
        $out += $remain ? school.num2deu_cardinal($remain) : '';
    }
    else if (   $positive > 999999
           && $positive < 1000000000) {                 // 1_000_000 .. 999_999_999
        $one_idx = Math.floor($positive / 1000000);
        $remain  = $positive % 1000000;
        var $one  = $one_idx == 1 ? 'e' : '';

        $out  = school.num2deu_cardinal($one_idx) + $one + ' million';
        if ($one_idx > 1) $out += 'en';
        $out += $remain ? ' ' + school.num2deu_cardinal($remain) : '';
    }

    return $out;
}
