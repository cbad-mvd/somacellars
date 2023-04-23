/*
 * add/remove local nav on scroll
 */
var win = $(window);

win.scroll(function (event) {
    if (win.scrollTop() > 50) {
        $("#main-header").removelass("nav--goin-out");
        $("#main-header").addClass("MainHdr--down");
        $("#local-nav").addClass("nav--comin-in");
    }
    else {
        $("#local-nav").removeClass("nav--comin-in");
        $("#main-header").removeClass("MainHdr--down");
        $("#local-nav").addClass("nav--goin-out");
    }
});

function scrollInit() {
    $('html, body').stop().animate({
        scrollTop: 0
    }, 1000);
}


function scrollNav() {

    $('.js-scroll-link').click(function () {

        var target = $(this).attr('href');

        var offset = (target === "#top") ? 0 : 50;
        //console.log("scrollTop: "+($(target).offset().top)+" scrollLeft: "+($(target).offset().left));

        $('html, body').stop().animate({
            scrollTop: $(target).offset().top - offset
        }, 1000);

        return false;
    });
    $('.scrollTop a').scrollTop();
    //scrollInit();

}
scrollNav();
