var css = document.createElement("style");
css.id="pl";
(document.head||document.documentElement).appendChild(css);
if (!localStorage.fontsize) {
	localStorage.fontsize=15
}
if (!localStorage.ver) {
	localStorage.ver = 001;
	localStorage.ayarlar = '{"toTop":1,"okundu":1,"bildirim":1}'
	//var win = window.open("https://kulzos.com/hesap/", '_blank');
}
var ayarlar = {};
try{
	ayarlar = JSON.parse(localStorage.ayarlar);
}catch(err){
	ayarlar = {};
}
var engelli_basliklar = {};
try{
	engelli_basliklar = JSON.parse(localStorage.engelli_basliklar);
}catch(err){
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
if(ayarlar['toTop']) css.innerHTML+="#back-to-top{display:none!important}";
css.innerHTML+=".entrylist li{font-size:"+localStorage.fontsize+"px!important}";

function notifyMe(header,body,link) {
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
		  window.open("https://kulzos.com"+link);      
		};
  }
}
//History.Adapter.bind(window,'statechange',function(){
console.log("Kulzos++ injected")