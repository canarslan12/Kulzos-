jQuery(document).ready(function () {
	console.log("ready");
	$("#content").on("keypress",'textarea',(function (e) {
		console.log("pressed")
	  if (e.ctrlKey && (e.keyCode == 10 || e.keyCode == 13)) {
		console.log("presseds")
		console.log($(".btn:contains('gönder')").eq(0));
		$(".btn:contains('gönder')")[0].click()
		console.log("done")
	  }
	}));
})