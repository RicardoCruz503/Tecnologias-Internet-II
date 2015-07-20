$(document).ready(function () {
    window.setTimeout(function () {
        $(".alert-success").slideUp(300, function () {
            $(this).remove();
        });
    }, 1);
});