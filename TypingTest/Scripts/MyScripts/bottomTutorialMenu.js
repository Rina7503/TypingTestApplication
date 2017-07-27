function setMenu(currentPage, prevTitle, nextTitle) {
    var prevHref;
    if (currentPage == 0 || currentPage == 1) {
        prevHref = "/Tutorial/ShowTutorial";
    }
    else {
        prevHref = "/Tutorial/part" + (currentPage - 1);
    }

    var nextHref;
    if (currentPage == 9) {
        nextHref = "/Tutorial/ShowTutorial";
    }
    else {
        nextHref = "/Tutorial/part" + (currentPage + 1);
    }


    $("#back").attr("href", prevHref);

    prevTitle = prevTitle.replace(/&#39;/g, '"');
    nextTitle = nextTitle.replace(/&#39;/g, '"');

    document.getElementById("back").innerText = "Back to: " + prevTitle;

    $("#next").attr("href", nextHref);
    document.getElementById("next").innerText = "Forward to: " + nextTitle;

    if (currentPage == 0) {
        $("#prevLink").css(
            {
                "visibility": "hidden",
                "width": "0"
            }
       );
    }
    else if (currentPage == 9) {
        $("#nextLink").css(
            {
                "visibility": "hidden",
                "width": "0"
            }
        );
    }
}