jQuery(document).ready(function () {
    console.log("ready");
    $("#content").on("keypress", 'textarea', (function (e) {
        console.log("pressed")
        if (e.ctrlKey && (e.keyCode == 10 || e.keyCode == 13)) {
            console.log("presseds")
            console.log($(".btn:contains('gönder')").eq(0));
            $(".btn:contains('gönder')")[0].click()
            console.log("done")
        }
    }));
    var triggered = false;
    var counter = 0;
    $('.entrylist').on("DOMSubtreeModified", function () {
        console.log('changed');
        if (!triggered) {
            counter++;
            console.log("triggered")
            triggered = true;
            $('.entrylist').trigger("append")
        }
    });

    // mesaj,yorum gönderilince silme vb. gelmesi
    $(".entrylist").bind("append", function () {
        console.log("test");
        $('.entrylist > li').last().each(function (i) {
            var id = ($(this).attr("id")).substr(5);
            var yazar = ($(this).attr("yazar"));
            var cate = ($(this).attr("cate"));
            var sayi = 0;
            var ses = "";
            ses = "";
            $(this).children(".entryalt2").html(entryalt(id, yazar, yazar, "", sayi, cate));
        });
        triggered = false;
    });
    $(".yorumlist").bind("append", function () {
        console.log("test");
        $('.yorumlist > li').last().each(function (i) {
            var id = ($(this).attr("id")).substr(5);
            var yazar = ($(this).attr("yazar"));
            var ses = "";
            ses = "";
            $(this).children(".yorumalt2").html(yorumalt(id, yazar, yazar, ""));
        });
        triggered = false;
    });
})