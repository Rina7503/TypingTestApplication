function ErrorMessageHelper() {
    var self = this;
    var _okCallbackHandler = null;
    var _cancelCallbackHandler = null;
    this.errorMessageClosed = $.Callbacks();
    this.errorMessageShowing = $.Callbacks();


    function subscribeEvents() {
        document.getElementById('okButton').addEventListener("click", okButtonClick, false);
        document.getElementById('cancelButton').addEventListener("click", cancelButtonClick, false);
    };

    function okButtonClick() {
        closeErrorMsg();
        self.errorMessageClosed.fire("ok");
        if (_okCallbackHandler) {
            _okCallbackHandler();
        }
    }

    function cancelButtonClick() {
        closeErrorMsg();
        self.errorMessageClosed.fire("cancel");
        if (_cancelCallbackHandler) {
            _cancelCallbackHandler();
        }
    }

    this.showMessage = function (errorMessage, showYesNoButton, okCallbackHandler, cancelCallbackHandler) {
        _okCallbackHandler = okCallbackHandler;
        _cancelCallbackHandler = cancelCallbackHandler;
        document.getElementById('modalNotice').innerHTML = errorMessage;
        showYesNoButton ? showAdvancedErrorMsg() : showNormalErrorMsg();
        this.errorMessageShowing.fire();
    }

    function showAdvancedErrorMsg() {
        $('#modalNotice').css('margin-bottom', '22px');
        $("#okButton")
                .attr("class", "modal_close_back");
        $("#cancelButton")
                .attr("class", "continue_reload")
                .animate({ opacity: 1 }, 200);

        $('#textInputContainer').attr("contenteditable", false);
        $('#overlay').fadeIn(200),
           $('#modal')
                   .css('display', 'block')
                   .animate({ opacity: 1 }, 200);
    }

    function showNormalErrorMsg() {
        $('#modalNotice').css('margin-bottom', '15 px');
        $("#okButton")
                .attr('class', 'modal_close_ok');
        $("#cancelButton").attr("class", "continue_unvisible");

        $('#textInputContainer').attr("contenteditable", false);
        $('#overlay').fadeIn(200),
           $('#modal')
                   .css('display', 'block')
                   .animate({ opacity: 1 }, 200);
    }

    function closeErrorMsg() {
        if ($('#textInputContainer').attr("contenteditable") == "false") {
            $('#textInputContainer').attr("contenteditable", true);
        }
        $('#modal').animate({ opacity: 0 }, 200);
        $('#modal').css('display', 'none');
        $('#overlay').fadeOut(200);
    }


    subscribeEvents();
}