function PrintController() {
    var self = this;
    var symbolsCount = 0;
    var currentWord = "";
    var wordsCounter = 0;
    var startTag = "<p id=\"userText\">";
    var endTag = "</p>";
    var currentTextFieldValue = ""; //formatted user text

    this.wordPrinted = $.Callbacks();
    this.symbolPrinting = $.Callbacks();

    this.isFieldEmpty = function () {
        return currentTextFieldValue == "" && currentWord == "";
    }

    function subscribeEvents() {
        var textPrintTag = document.getElementById('textInputContainer');
        if (textPrintTag.addEventListener) {
            textPrintTag.addEventListener("keypress", function (e) { FieldKeyPress(e); }, false);
            textPrintTag.addEventListener("click", function (e) { FieldClick(e); }, false);
        }
    }

    function FieldClick(evt) {
        var outputField = document.getElementById("textOutputContainer");
        var startText = document.getElementById("startText");

        if (startText) {
            outputField.removeChild(startText);
        }
        if ($("#mock_cursor").css("visibility", "hidden")) {
            $("#mock_cursor").css("visibility", "visible");
        }
    }

    function FieldKeyPress(e) {
        if (e.key.length <= 1) {

            var tempArgs = { currentArgs: e, isCancelled: false };
            self.symbolPrinting.fire(tempArgs);

            if (!tempArgs.isCancelled) {
                symbolsCount++;
                if (e.code == "Space") {
                    if (currentWord != "") {
                        wordsCounter++;
                        var param = { counter: wordsCounter, currentWord: currentWord, isMistake: false };
                        self.wordPrinted.fire(param);
                        paintText(param.isMistake); 
                        document.getElementById("textOutputContainer").innerHTML = startTag + currentTextFieldValue + endTag;
                    }
                    currentWord = "";
                }
                else {
                    currentWord = currentWord + e.key;
                    document.getElementById("textOutputContainer").innerHTML = startTag + currentTextFieldValue + currentWord + endTag;
                }
            }
            //replace the cursor to the end of the content
            var cursor = "<div id='mock_cursor'> </div>";
            $("#mock_cursor").remove();
            if (($("#userText")).length == 0) {
                document.getElementById("textOutputContainer").innerHTML = startTag + endTag;
            }
            $(cursor).insertAfter($("#userText"));
        }
    }

    function paintText(isMistake) {
        if (isMistake) { 
            currentTextFieldValue = currentTextFieldValue + "<span class=\"mistake\">" + currentWord + "&nbsp;" + "</span>";
        }
        else { 
            currentTextFieldValue = currentTextFieldValue + currentWord + "&nbsp;";
        }
    }

    subscribeEvents();
}