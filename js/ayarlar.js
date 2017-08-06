jQuery(document).ready(function () {
    console.log("ayarlar.js");

    /** Constructing Setting Page */
    var addition = "";
    addition += "<div class=\"clear\"></div>";
    addition += "<h2 class=\"cufon\" style=\"margin-top: 30px;\"><a>kulzos++ ayarları</a></h2>";
    addition += "<div style='font-size: " + localStorage.fontSize + "px'>";

    addition += "<a onclick='$(\".ppSettingsCheck\").click()'>tümüne tıkla</a> - <a id='setDefault'>varsayılan ayarlar</a><form>";

    for (var i = 0; i < settingsListText.length; i++) {
        addition += '<p>' + settingsListText[i][1] + ': <input type="textbox" class="ppSettingsText" value="' + localStorage[settingsListText[i][0]] + '"></p>';
    }
    for (var i = 0; i < settingsListCheck.length; i++) {
        addition += '<p><input type="checkbox" class="ppSettingsCheck"';
        if (localStorage[[settingsListCheck[i][0]]])
            addition += " checked";
        addition += '>' + settingsListCheck[i][1] + '</p>';
    }
    addition += "<input type=\"button\" id=\"ayarla\" value=\"kaydet\"></form><hr>";
    addition += "<input type=\"button\" id=\"engelTemizle\" value=\"engelli başlıkları temizle\">";
    addition += "<input type=\"button\" id=\"okunanTemizle\" value=\"okunanları temizle\">";
    addition += "<input type=\"button\" id=\"saveTemizle\" value=\"kaydedilenleri temizle\">";
    addition += "</div>";

    $(".baslikalt").append(addition);

    /** Constructing Setting Page */
    $("#setDefault").click(function () {
        /** Default settings */
        for (var i = 0; i < settingsListText.length; i++) {
            $(".ppSettingsText").eq(i).val(settingsListText[i][2]);
        }
        for (var i = 0; i < settingsListCheck.length; i++) {
            $(".ppSettingsCheck")[i].checked = settingsListCheck[i][2];
        }
    });

    /** Saving settings */
    $("#ayarla").click(function () {
        for (var i = 0; i < settingsListText.length; i++) {
            localStorage[settingsListText[i][0]] = $(".ppSettingsText").eq(i).val();
        }
        for (var i = 0; i < settingsListCheck.length; i++) {
            if ($(".ppSettingsCheck")[i].checked) {
                localStorage[settingsListCheck[i][0]] = 1;
            } else {
                localStorage.removeItem(settingsListCheck[i][0]);
            }
        }
        document.location.reload()
    });

    $("#engelTemizle").click(function () {
        for (var key in localStorage) {
            if (key[0] === "|" && key[1] === "b")
                delete localStorage[key];
        }
    });

    $("#okunanTemizle").click(function () {
        for (var key in localStorage) {
            if (key[0] === "|" && key[1] === "r")
                delete localStorage[key];
        }
    });

    $("#saveTemizle").click(function () {
        for (var key in localStorage) {
            if (key[0] === "|" && key[1] === "s")
                delete localStorage[key];
        }
    });
    /** titleTemizle */
    for (var key in localStorage) {
        if (key[0] === "|" && key[1] === "t")
            delete localStorage[key];
    }
});