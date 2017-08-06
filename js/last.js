var triggered = false;
var counter = 0;
var draging = null;
var cop = 0;
jQuery(document).ready(function () {
    console.log("ready");
    /** Automatic login */
    /*if ($("#userbar .btn[value=giriş]")) {
        $(".dropdown-menu").eq(1).css("display", "block")
        setTimeout(function () {
            $("#userbar .btn[value=giriş]")[0].click()
        }, 1000)
    }*/
    /** Ayarlar Linki */
    $(".userbar-right").append("<li id=ppayar><a href='/hesap/kulzos++'><i class='fa fa-plus'></i>Kulzos++ Ayarları</a></li>");
    $(".hesapkutu").width(270);

    /** showBugun */
    if (localStorage["showBugun"] === "1") {
        $("#filters").find(".dropdown-menu a").each(function () {
            $(this).appendTo("#filters")
        }).find(".dropdown-toggle").remove()
    }

    /** Submiting Text With Ctrl + Enter */
    $("#content").on("keypress", 'textarea', (function (e) {
        if (e.ctrlKey && (e.keyCode === 10 || e.keyCode === 13)) {
            switch ($(this)[0].id) {
                case "mesajmetin":
                case "entry":
                case "yorum":
                    $(this).parent().find(".btn").last()[0].click();
                    break;
                case "entry2":
                case "yorum2":
                    $(this).parent().parent().parent().find(".btn").last()[0].click();
                    break;
            }
        }
    }));

    /** Show Footer Panel When Enry Changed */
    if (localStorage["baslikEngel"] === "1") {
        $(".baslikbilgiust").append(" <a class=\"fa fa-trash-o\" style=\"font-size: 26px;\" id='cop'></a>");

        $("#container").on('dragstart', "a", function (event) {
            if (event.target.parentElement.parentElement.className === "basliklar")
                draging = event.target.text;
            else
                draging = null
        });
        $("#cop").on("dragover", function (event) {
            if (draging) {
                event.preventDefault();
                event.stopPropagation();
                $(this).addClass('fa-trash').removeClass('fa-trash-o');
            }
        }).on("dragleave", function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).addClass('fa-trash-o').removeClass('fa-trash');
        }).on("drop", function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (draging) {
                $(this).addClass('fa-trash-o').removeClass('fa-trash');
                if (cop > 0)
                    unBlockTitle(draging);
                else
                    blockTitle(draging);
            }
        }).on("click", function () {
            cop = 1;
            triggered = true;
            var addition = "";
            for (var key in localStorage) {
                if (key[0] === "|" && key[1] === "b")
                    addition += '<li><a href="#">' + key.slice(7) + '</a></li>'
            }
            $(".basliklar").html(addition);
            triggered = false;
        });

        function blockTitle(title) {
            localStorage["|block_" + title] = 1;
            $(".basliklar a[data='" + title + "']").parent().remove();
        }

        function unBlockTitle(title) {
            localStorage.removeItem("|block_" + title);
            triggered = true;
            $(".basliklar a:contains('" + title + "')").parent().remove();
            triggered = false;
        }

        function removeBlockedTitles() {
            $(".basliklar a").each(function () {
                if (localStorage["|block_" + $(this).attr('data')] === "1")
                    $(this).parent().remove();
            });
            triggered = false;
        }

        removeBlockedTitles()
    }

    $(".basliklar").on("DOMSubtreeModified", function () {
        if (!triggered) {
            counter++;
            triggered = true;
            removeBlockedTitles();
            cop--;
        }
    });

    /** Show Footer Panel When Enry or Comment Changed */
    $("#content").on("DOMSubtreeModified", ".entrylist", function () {
        if (!triggered) {
            counter++;
            triggered = true;
            $('.entrylist').trigger("append");
            triggered = false;
        }
    }).on("append", ".entrylist", function () {
        var last = $('.entrylist > li').last();
        if (!$(last).attr("sayi")) {
            var id = ($(last).attr("id")).substr(5);
            var yazar = ($(last).attr("yazar"));
            var cate = ($(last).attr("cate"));
            $(last).find(".entryalt2").html(entryalt(id, yazar, "", 0, cate));
        }
    }).on("DOMSubtreeModified", ".yorumlist", function () {
        //console.log('changed');
        if (!triggered) {
            counter++;
            //console.log("triggered")
            triggered = true;
            $('.yorumlist').trigger("append");
            triggered = false;
        }
    }).on("append", ".yorumlist", function () {
        var last = $('.yorumlist').children('li').last();
        if ($(last).find(".yorumalt1").text() === "birkaç saniye önce") {
            var id = ($(last).attr("id")).substr(5);
            var yazar = ($(last).attr("yazar"));
            $(last).find(".yorumalt2").html(yorumalt(id));
        }
    });

    /** saving and getting Entry */
    if (localStorage["saveEntry"] === "1") {
        function getKey(id) {
            if (id === "e")
                return '_saveEntry_' + bid.value;
            else if (id === "y")
                return '_saveYorum_' + eid.value;
            else if (id === "m")
                return '_saveMesaj_' + mesajnick.value;
        }

        $("#content").on("click", 'textarea', (function () {
            if ($(this).val().length === 0) {
                var key = getKey($(this)[0].id[0]);
                $(this).val(localStorage[key]);
            }
        })).on("keypress", 'textarea', (function () {
            var key = getKey($(this)[0].id[0]);
            if ($(this).val().length > 3)
                localStorage[key] = $(this).val();
            else
                localStorage.removeItem(key);
        }));
    }

    /** saving and getting read entries */
    if (localStorage["read"] !== "0") {
        var time_id;
        var that;
        $("#content").on("append", ".entrylist", function () {
            makeDarker()
        }).on("mouseover", ".entrylist > li, .yorumlist > li", function () {//TODO performance update
            if (time_id) {
                clearTimeout(time_id);
            }
            that = this;
            time_id = setTimeout(function () {
                var id = $(that).attr('id');
                if (!id)
                    return;
                localStorage["|read_" + id] = 1;
                $(that).css('background-color', 'rgb(245,245,245)')
            }, localStorage["read"]);
        }).on("dblclick", ".entrylist > li, .yorumlist > li", function () {
            if (time_id) {
                clearTimeout(time_id);
            }
            $(this).css('background-color', 'white');
            localStorage.removeItem("|read_" + $(this).attr('id'));
        }).on("mouseout", ".entrylist > li, .yorumlist > li", function () {
            if (time_id) {
                clearTimeout(time_id);
            }
        });

        function makeDarker() {
            $(".entrylist, .yorumlist").children("li").each(function () {
                if (localStorage["|read_" + $(this).attr('id')])
                    $(this).css('background-color', 'rgb(245,245,245)')
            })
        }

        makeDarker()
    }

    /** getting title of left panel */
    $("#right-page").find(".most_liked li a").each(function (index) {
        var eid = $(this).attr("eid");
        if (localStorage["|title_" + eid]) {
            $(this).text(localStorage["|title_" + eid])
        }
        else {
            $(this).parent().load("/index.php .cufon > a", {e1: "entry", e2: eid}, function () {
                localStorage["|title_" + eid] = $(this).children(0).text()
            });
        }
    })
});