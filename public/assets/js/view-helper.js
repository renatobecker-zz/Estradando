var handleFullHeightContent = function() {
    $('[data-full-height="true"]').each(function() {
        var targetOffset = $(this).offset();
        var targetTop = targetOffset.top;
        var targetWindowHeight = $(window).height();

        var finalHeight = targetWindowHeight - targetTop - 30;

        if (finalHeight <= 300) {
            // set your min height here;
            finalHeight = 400;
        }
        $(this).height(finalHeight);
    });
};


$(window).resize(function(){
    handleFullHeightContent();
});

$(document).ready(function() {
    handleFullHeightContent();
});
