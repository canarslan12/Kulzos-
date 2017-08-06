var css = document.createElement("style");
css.id = "pl";
(document.head || document.documentElement).appendChild(css);
if (!localStorage["fontSize"]) {
    localStorage["fontSize"] = 15;
}
var settingsListText = [
    ["fontSize", "yazı boyutu ne olsun (site için varsayılan 14)", 15],
    ["read", "okunan yorumlar koyu gözüksün (ms cinsinden - 600 önerilir)", 0]//<a href='/' title='açıklama'>*</a>
];
var settingsListCheck = [
    ["baslikEngel", "başlık engelleme tuşu gözüksün", 1],
    ["toTop", "sayfanın en üstüne gitme tuşu yok olsun", 1],
    //["notification", "mesaj ve takip bildirim sistemi", 1],
    ["saveEntry", "anlık yorum kaydetme (yorum sonsuza kadar kaydedilir, şimdilik taslaklara erişim yok)", 0],
    ["showBugun", "üst panelde diger kalksın, bugün vb. yanyana gözüksün", 0]
];

if (!localStorage["versiyon"]) {
    localStorage["versiyon"] = 1;
    setDefaultSettings();
}

/** Clearing old version's data */
if (!localStorage["ver"]) {
    localStorage.removeItem("ver");
    localStorage.removeItem("fontsize");
    localStorage.removeItem("ayarlar");
}

if (localStorage["toTop"] === "1") css.innerHTML += "#back-to-top{display:none!important}";
css.innerHTML += ".entrylist li{font-size:" + localStorage.fontSize + "px!important}";
if (localStorage["baslikEngel"] === "1") {
    css.innerHTML += ".left ul li a{padding: 7px 0 7px 0!important}";
    css.innerHTML += ".left ul li{padding: 0!important}";
    css.innerHTML += ".baslikbilgi{top: -17px!important}";
    css.innerHTML += ".left{z-index:10;user-select: none}";
}

/*
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
*/
function entryalt(id, yazar, sag, sayi, cate) {
    var entryalt = "";

    entryalt += "<i onclick=\"modalkutu('entry sil', 'entrysil', '" + id + "', 1, '" + sag + "')\" title=\"sil\" class=\"fa fa-trash-o\">&nbsp;</i>";
    entryalt += "<i onclick=\"modalkutu('düzenle', 'entryler', '" + id + "', 1, '" + sag + "')\" title=\"düzenle\" class=\"fa fa-pencil\">&nbsp;</i>";

    entryalt += "<i onclick=\"oydurumu(" + id + ",'" + sag + "'," + sayi + ",'" + cate + "')\" title=\"oy durumu\" class=\"fa fa-pie-chart\">&nbsp;</i>";
    entryalt += "<i style=\"margin-right:5px;\" onclick=\"yorumlar('" + yazar + "'," + id + ",'" + sag + "')\" title=\"yorumlar\" class=\"fa fa-comments-o\"></i><span onclick=\"yorumlar('" + yazar + "'," + id + ",'" + sag + "')\" class=\"ent-comment\">" + sayi + "</span>";
    entryalt += "<i onclick=\"modalkutu('düzenle', 'kategorisiz', '" + id + "', 1, '" + sag + "')\" title=\'" + cate + "'\" class=\"fa fa-tags e-cat\"></i>";
    entryalt += "<div class=\"dropdown inline\"><a class=\"dropdown-toggle grey\" data-toggle=\"dropdown\"><i class='fa fa-share-alt'></i></a><ul class=\"dropdown-menu baslikaltmenu ortala\" style=\"margin-top: 10px; left: -133px; width: 170px;\"><li style=\" padding-bottom: 0; \"><span class=\"dropdown-menu-title tara sagok\">paylaş</span></li><li style=\" padding-bottom: 0\"><a target=\"_blank\" href=\"http://www.facebook.com/sharer.php?u=https://www.kulzos.com/" + sag + "entry/" + id + "/\"><i title=\"facebookta paylaş\" class=\"fa fa-facebook-square\">&nbsp;</i>facebook</a></li><li style=\" padding-bottom: 0\"><a target=\"_blank\" href=\"http://twitter.com/share?text= &url=https://www.kulzos.com/" + sag + "entry/" + id + "/\"><i title=\"twitterda paylaş\" class=\"fa fa-twitter-square\">&nbsp;</i>twitter</a></li></ul></div>";
    return entryalt;
}

function yorumalt(id) {
    var yorumalt = "";
    yorumalt += "<i onclick=\"modalkutu('yorum sil', 'yorumsil', '" + id + "', 1, '')\" title=\"sil\" class=\"fa fa-trash-o\">&nbsp;</i>";
    yorumalt += "<i onclick=\"modalkutu('düzenle', 'yorumlar', '" + id + "', 1, '')\" title=\"düzenle\" class=\"fa fa-pencil\">&nbsp;</i>";
    return yorumalt;
}

function setDefaultSettings() {
    for (var i = 0; i < settingsListText.length; i++) {
        localStorage[settingsListText[i][0]] = settingsListText[i][2];
    }
    for (var i = 0; i < settingsListCheck.length; i++) {
        localStorage[settingsListCheck[i][0]] = settingsListCheck[i][2];
    }
}

console.log("Kulzos++ injected");