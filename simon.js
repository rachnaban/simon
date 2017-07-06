$(document).ready(function() {
    var random = [];
    var lightedByComputer = [];
    var lightClass;
    var lightedByUser = [];
    var i;
    var j = 0;
    var level = 1;
    var on;
    var off;
    var strict;
    var loopInterval;
    var display = $("#level");
    var startButton = $('#start');
    var strictButton = $('#strict');
    var onButton = $('#switch');
    var playButton = $('.playBtn');
    var isGameStarted = false;


    playButton.on('click', function() {
        if (!isGameStarted) return;
        var $this = $(this);
        var thisId = $this.attr("id");
        var number = thisId.charAt(thisId.length - 1);
        $this.addClass('light' + number);
        var audio = $("#audio" + number)[0];
        audio.play();
        lightedByUser.push(number);
        setTimeout(function() {
            $this.removeClass('light' + number);

        }, 250);
        checkIfUserAndComputerMatch();
    });

    function startGame() {
        isGameStarted = true;
        console.log(random);
        //when level is higher, intervals are shorter(complex)
        if (level <= 10) {
            off = 400;
            on = 800;

        } else {
            off = 250;
            on = 500;
        }

        loopInterval = setInterval(function() {
            var randomNumber = random[j];
            lightClass = 'light' + randomNumber;
            $('#div' + randomNumber).addClass(lightClass);
            $('#audio' + randomNumber)[0].play();
            lightedByComputer.push(randomNumber);
            setTimeout(function() {
                $('#div' + randomNumber).removeClass(lightClass);
            }, off);
            j++;

            if (j >= level) {
                clearInterval(loopInterval);
            }

        }, on);

    }


    function checkIfUserAndComputerMatch() {

        if (lightedByComputer.length == lightedByUser.length) {

            if (lightedByComputer.join() == lightedByUser.join()) {

                if (level == 20) {

                    setTimeout(function() {
                        alert("You win!");
                        location.reload();
                    }, 1000);
                } else {
                    setTimeout(function() {
                        display.text(level + 1);
                        level++;
                        lightedByComputer = [];
                        lightedByUser = [];
                        j = 0;
                        startGame();

                    }, 1000);
                }
            } else {
                if (strict == 1) {

                    location.reload();

                } else {
                    setTimeout(function() {
                        display.text('!!');

                        lightedByComputer = [];
                        lightedByUser = [];
                        j = 0;
                        startGame();
                    }, 1000);
                }
            }
        }
    }

    onButton.on('click', '#power', function() {
        $(this).text("OFF").addClass('off');
        display.addClass('lightDisplay');
        display.text('--');

        for (i = 0; i < 20; i++) {
            random[i] = Math.ceil((Math.random() * 4));
        }

        strictButton.on('click', function() {
            strict = 1;
        });

        startButton.on('click', function() {
            display.text(level);
            startGame();
        });
    });

    onButton.on('click', '.off', function() {
        display.removeClass('lightDisplay');
        location.reload();
    });

});