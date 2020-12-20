$(document).ready(function () {
    $(".nav_items").click(function () {
      window.location = $(this).find("a").attr("href");
    });
});