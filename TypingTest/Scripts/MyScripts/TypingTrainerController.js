function TypingTrainerController() {
    var self = this;
    var origTextArray = ""; 

    var wordsCounter = 0;
    var symbCount = 0;
    var symbCountPerSecound = 0;
    var mistakesCount = 0; 
    var timeSessionPlan = 0; 
    var timeSessionFact;
    var maxSpeed = 0; 
    var listSpeed = new Array(); 


    var isTimerStarted = false;
    var timerLeftMinutes = 0;
    var timerLeftSecounds = 0;

    var currentTextIndex = 0;
    var currentTimeIndex = 0;
    var currentTextName = "";


    var printController = null;
    var errorMessageHelper = null;


    function subscribeEvents(e) {
        var stop = document.getElementById('stop');
        stop.addEventListener("click", stopTest, false);
        document.getElementById('reload').addEventListener("click", reloadTest, false);
        document.getElementById('Texts').addEventListener("change", textBoxChanged, false);
        document.getElementById('Time').addEventListener("change", timeBoxChanged, false);
    }

    function textBoxChanged() {
        if (printController.isFieldEmpty()) {
            loadText();
        }
        else {
            errorMessageHelper.showMessage("Your data will be lost!", true, function () { reloadTest(); }, function () { continueTest(); });
        }
    }

    function timeBoxChanged() {
        if (printController.isFieldEmpty()) {
            setTimer();
        }
        else {
            errorMessageHelper.showMessage("Your data will have been lost!", true, function () { reloadTest(); }, function () { continueTest(); });
        }
    }

    function loadText() {
        var selectedTextIndex = document.getElementById("Texts").selectedIndex;
        switch (selectedTextIndex) {
            case 0: {
                document.getElementById("textOriginal").innerHTML = "";
                currentTextName = "";
            }
                break;
            case 1: {
                $('#textOriginal').load('./Content/Texts/Jack_London_Martin_Iden.html');
                currentTextName = "Jack London - Martin Iden";
            }
                break;
            case 2: {
                $('#textOriginal').load('./Content/Texts/Astronauts.html');
                currentTextName = "Astronauts";
            }
                break;
            case 3: {
                $('#textOriginal').load('./Content/Texts/Zebras.html');
                currentTextName = "Zebras";
            }
                break;
            case 4: {
                $('#textOriginal').load('./Content/Texts/short.html');
                currentTextName = "short";
            }
                break;
            default:
                break;
        }
    }

    function setTimer() {
        var timeIndex = document.getElementById("Time").selectedIndex;
        var timerElement = document.getElementById("timer");
        if (timeIndex == 0) {
            timerElement.innerHTML = "00:00";
        }
        else if (timeIndex == 1) {
            timerElement.innerHTML = "01:00";
        }
        else if (timeIndex == 2) {
            timerElement.innerHTML = "02:00";
        }
        else if (timeIndex == 3) {
            timerElement.innerHTML = "03:00";
        }
        timerLeftMinutes = timeIndex;
        timeSessionPlan = timeIndex;
    }

    function DivideOrigTextByWords() {
        if (wordsCounter == 1) {
            if (origTextArray.length == 0) {
                origTextArray = $("#textOriginal").text().split(" ");
            }
        }
    }

    function initialize() {
        printController = new PrintController();
        printController.symbolPrinting.add(printControllerSymbolPrinting);
        printController.wordPrinted.add(printControllerWordPrinted);

        errorMessageHelper = new ErrorMessageHelper();
        errorMessageHelper.errorMessageShowing.add(function () { timerPause(); });
        errorMessageHelper.errorMessageClosed.add(function () { timerGo(); });
    }

    function timerPause() {
        if (isTimerStarted) {
            clearInterval(MyTimer);
            isTimerStarted = false;
        }
    }

    function continueTest() {
        timerGo();
        var text = document.getElementById('Texts');
        var time = document.getElementById('Time');
        if (text.selectedIndex != currentTextIndex) {
            text.selectedIndex = currentTextIndex;
        }
        if (time.selectedIndex != currentTimeIndex) {
            time.selectedIndex = currentTimeIndex;
        }
    }

    function reloadTest() {
        location.reload();
    }

    function printControllerWordPrinted(objArgs) {
        wordsCounter = objArgs.counter;
        DivideOrigTextByWords();

        if (origTextArray.length > 1 && wordsCounter == origTextArray.length) {
            errorMessageHelper.showMessage("Congratulations! You have completed the text input!", false, function () { stopTest(); });
        }
        if (objArgs.currentWord != origTextArray[wordsCounter - 1]) {
            objArgs.isMistake = true;
            mistakesCount++;
            document.getElementById('mistakes').innerHTML = mistakesCount;
        }
    }

    function stopTest() {
        isTimerStarted = false;
        clearInterval(MyTimer);
        var resultTestObject = prepareResultObject();
        sendData(resultTestObject);
    }

    function printControllerSymbolPrinting(tempArgs) {
        currentTextIndex = document.getElementById('Texts').selectedIndex;
        currentTimeIndex = document.getElementById('Time').selectedIndex;

        if (!checkKeyboardLanguage(tempArgs)) {
            tempArgs.isCancelled = true;
            errorMessageHelper.showMessage("Please, change the keyboard layout!", false);
        } else {
            if (!checkTestParams()) {
                tempArgs.isCancelled = true;
                errorMessageHelper.showMessage("Please, select the text and/or the time period!", false);
            } else {
                tempArgs.isCancelled = false;
                symbCount++;
                symbCountPerSecound++;
                timerGo();
            }
        }
    }

    function checkKeyboardLanguage(objArgs) {
        if (objArgs.currentArgs.key.match(/([а-яА-Я]+)/)) {
            return false;
        }
        return true;
    }

    function checkTestParams() {
        var text = document.getElementById('Texts');
        var time = document.getElementById('Time');
        if (text.selectedIndex == 0 || time.selectedIndex == 0) {
            return false;
        }
        return true;
    }

    function timerGo() {
        if (isTimerStarted === true) {
            return;
        }
        isTimerStarted = true;
        var currentSpeed = 0;
        var seconds = timerLeftSecounds;
        var minutes = timerLeftMinutes;
        var increment = 0;
        MyTimer = setInterval(function () {
            --seconds;
            if (seconds == -1) {
                --minutes;
                seconds = 59;
            }
            timerLeftMinutes = minutes;
            timerLeftSecounds = seconds;
            document.getElementById("timer").innerHTML = (minutes < 10 ? ("0" + minutes) : minutes) + ":" + (seconds < 10 ? ("0" + seconds) : seconds);

            if (minutes == 0 && seconds == 0) {
                clearInterval(MyTimer);
                timeSessionFact = timeSessionPlan;

                errorMessageHelper.showMessage("Time is up!", false, function () { stopTest(); });
            }
            currentSpeed = symbCountPerSecound;
            if (currentSpeed == NaN || currentSpeed == Infinity) {
                document.getElementById("currentSpeed").innerHTML = 0;
            }
            else {
                document.getElementById("currentSpeed").innerHTML = currentSpeed;
                listSpeed[increment] = currentSpeed;
            }
            if (maxSpeed < currentSpeed) { maxSpeed = currentSpeed; }

            symbCountPerSecound = 0;
            increment++;
        }, 1000);
    }

    function setDefaultSettings() {
        if (document.getElementById('Texts').selectedIndex == 0) {
            document.getElementById('Texts').selectedIndex = 1;
            loadText();
            document.getElementById('Time').selectedIndex = 1;
            setTimer();
        }
    }

    function prepareResultObject() {
        var testObject = new Object();
        testObject.textTitle = currentTextName;
        if (timeSessionFact) {
            if (timeSessionFact == 1) {
                testObject.factTime = timeSessionFact + " minute";
            }
            else if (timeSessionFact == 2 || timeSessionFact == 3) {
                testObject.factTime = timeSessionFact + " minutes";
            }
        }
        else {
            if (60 - timerLeftSecounds != 60) {
                testObject.factTime = ((timeSessionPlan - 1 - timerLeftMinutes) > 0 ? (timeSessionPlan - 1 - timerLeftMinutes) : 0) + " minutes, " + (60 - timerLeftSecounds) + " secounds";
            }
            else { testObject.factTime = ((timeSessionPlan - timerLeftMinutes) > 0 ? (timeSessionPlan - timerLeftMinutes) : 0) + " minutes, " + "0 secounds"; }
        }
        testObject.numberPrintedSymbols = symbCount;
        testObject.numberPrintedWords = wordsCounter;
        testObject.typingSpeedMax = maxSpeed;
        var speedSum = 0;
        for (i = 0; i < listSpeed.length; i++) {
            speedSum += listSpeed[i];
        }
        testObject.typingAverageSpeed = Math.round(speedSum / listSpeed.length * 60);
        testObject.mistakesCount = mistakesCount;
        testObject.mistakesPersent = (mistakesCount / wordsCounter * 100).toFixed(2);
        if (testObject.mistakesPersent == "NaN") {
            testObject.mistakesPersent = 0;
        }

        return testObject;
    }

    subscribeEvents();
    setDefaultSettings();
    initialize();
}