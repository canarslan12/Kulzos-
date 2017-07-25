var css = document.createElement("style");
css.id = "pl";
(document.head || document.documentElement).appendChild(css);
if (!localStorage.fontsize) {
    localStorage.fontsize = 15
}
if (!localStorage.ver) {
    localStorage.ver = 001;
    localStorage.ayarlar = '{"toTop":1,"okundu":1,"bildirim":1}'
    //var win = window.open("https://kulzos.com/hesap/", '_blank');
}
var ayarlar = {};
try {
    ayarlar = JSON.parse(localStorage.ayarlar);
} catch (err) {
    ayarlar = {};
}
var engelli_basliklar = {};
try {
    engelli_basliklar = JSON.parse(localStorage.engelli_basliklar);
} catch (err) {
    engelli_basliklar = {};
}

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}

if (ayarlar['toTop']) css.innerHTML += "#back-to-top{display:none!important}";
css.innerHTML += ".entrylist li{font-size:" + localStorage.fontsize + "px!important}";

function notifyMe(header, body, link) {
    if (!Notification) {
        return;
    }
    if (Notification.permission !== "granted")
        Notification.requestPermission();
    else {
        var notification = new Notification(header, {
            icon: 'https://kulzos.com/img/tema/90ky55m76c689mkywjzw.png',
            body: body
        });
        notification.onclick = function () {
            window.open("https://kulzos.com" + link);
        };
    }
}

function entryalt(id, yazar, ses, sag, sayi, cate) {
    var entryalt = "";

    if (ses == yazar) {
        entryalt += "<i onclick=\"modalkutu('entry sil', 'entrysil', '" + id + "', 1, '" + sag + "')\" title=\"sil\" class=\"fa fa-trash-o\">&nbsp;</i>";
        entryalt += "<i onclick=\"modalkutu('düzenle', 'entryler', '" + id + "', 1, '" + sag + "')\" title=\"düzenle\" class=\"fa fa-pencil\">&nbsp;</i>";
    }

    if (ses != yazar) {
        entryalt += "<div  class=\"voting-field\"><i onclick=\"artioy(" + id + ",'" + sag + "'," + sayi + ",'" + cate + "')\" title=\"artı oy ver\" class=\"fa fa-thumbs-o-up\">&nbsp;</i>";
        entryalt += "<i onclick=\"ilikoy(" + id + ",'" + sag + "'," + sayi + ",'" + cate + "')\" title=\"kararsız oy ver\" class=\"fa fa-adjust\">&nbsp;</i>";
        entryalt += "<i onclick=\"eksioy(" + id + ",'" + sag + "'," + sayi + ",'" + cate + "')\" title=\"eksi oy ver\" class=\"fa fa-thumbs-o-down\">&nbsp;</i>";
        entryalt += "<i onclick=\"favoriekle(" + id + ",'" + sag + "'," + sayi + ",'" + cate + "')\" title=\"favorilere ekle\" class=\"fa fa-heart-o\">&nbsp;</i></div>";
        entryalt += "<i onclick=\"mesajgonder('" + yazar + "'," + id + ",'" + sag + "')\" title=\"mesaj gönder\" class=\"fa fa-envelope-o\">&nbsp;</i>";
    }
    entryalt += "<i onclick=\"oydurumu(" + id + ",'" + sag + "'," + sayi + ",'" + cate + "')\" title=\"oy durumu\" class=\"fa fa-pie-chart\">&nbsp;</i>";
    entryalt += "<i style=\"margin-right:5px;\" onclick=\"yorumlar('" + yazar + "'," + id + ",'" + sag + "')\" title=\"yorumlar\" class=\"fa fa-comments-o\"></i><span onclick=\"yorumlar('" + yazar + "'," + id + ",'" + sag + "')\" class=\"ent-comment\">" + sayi + "</span>";
    entryalt += "<i onclick=\"modalkutu('düzenle', 'kategorisiz', '" + id + "', 1, '" + sag + "')\" title=\'" + cate + "'\" class=\"fa fa-tags e-cat\"></i>";
    entryalt += "<div class=\"dropdown inline\"><a class=\"dropdown-toggle grey\" data-toggle=\"dropdown\"><i class='fa fa-share-alt'></i></a><ul class=\"dropdown-menu baslikaltmenu ortala\" style=\"margin-top: 10px; left: -133px; width: 170px;\"><li style=\" padding-bottom: 0px; \"><span class=\"dropdown-menu-title tara sagok\">paylaş</span></li><li style=\" padding-bottom: 0px; \"><a target=\"_blank\" href=\"http://www.facebook.com/sharer.php?u=https://www.kulzos.com/" + sag + "entry/" + id + "/\"><i title=\"facebookta paylaş\" class=\"fa fa-facebook-square\">&nbsp;</i>facebook</a></li><li style=\" padding-bottom: 0px; \"><a target=\"_blank\" href=\"http://twitter.com/share?text= &url=https://www.kulzos.com/" + sag + "entry/" + id + "/\"><i title=\"twitterda paylaş\" class=\"fa fa-twitter-square\">&nbsp;</i>twitter</a></li></ul></div>";

    if (ses != yazar) {
        entryalt += "<i onclick=\"modalkutu('şikayet et', 'entrysikayet', '" + id + "', '1', '" + sag + "')\" title=\"şikayet et\" class=\"fa fa-exclamation-circle\">&nbsp;</i>";
    }
    return entryalt;
}

function yorumalt(id, yazar, ses, sag) {
    var yorumalt = "";

    if (ses == yazar) {
        yorumalt += "<i onclick=\"modalkutu('yorum sil', 'yorumsil', '" + id + "', 1, '" + sag + "')\" title=\"sil\" class=\"fa fa-trash-o\">&nbsp;</i>";
        yorumalt += "<i onclick=\"modalkutu('düzenle', 'yorumlar', '" + id + "', 1, '" + sag + "')\" title=\"düzenle\" class=\"fa fa-pencil\">&nbsp;</i>";
    }
    if (ses != yazar) {
        yorumalt += "<i onclick=\"modalkutu('şikayet et', 'yorumsikayet', '" + id + "', '1', '" + sag + "')\" title=\"şikayet et\" class=\"fa fa-exclamation-circle\">&nbsp;</i>";
    }
    return yorumalt;
}

console.log("Kulzos++ injected")