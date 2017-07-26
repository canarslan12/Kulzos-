var triggered = false;
var counter = 0;
jQuery(document).ready(function () {
    console.log("ready");
    $("#content").on("keypress", 'textarea', (function (e) {
        if (e.ctrlKey && (e.keyCode == 10 || e.keyCode == 13)) {
            $(".btn:contains('kaydet')")[0].click()
            $(".btn:contains('gönder')")[0].click()
        }
    }));
    $("#content").on("DOMSubtreeModified", ".entrylist", function () {
        //console.log('changed');
        if (!triggered) {
            counter++;
            //console.log("triggered")
            triggered = true;
            $('.entrylist').trigger("append")
        }
    });
    $("#content").on("DOMSubtreeModified", ".yorumlist", function () {
        //console.log('changed');
        if (!triggered) {
            counter++;
            //console.log("triggered")
            triggered = true;
            $('.yorumlist').trigger("append")
        }
    });

    // mesaj,yorum gönderilince silme vb. gelmesi
    $("#content").on("append", ".entrylist", function () {
        //console.log("test");
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
    $("#content").on("append", ".yorumlist", function () {
        //TODO yorum listte silme çalışmıyor
        //console.log("test");
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