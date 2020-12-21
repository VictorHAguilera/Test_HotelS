/* JavaScript Document */

$(".deployidioma, .deploymoneda").off();

$(".deployidioma").click(function (e) {
	$(".idiomasshow").toggle();
	$(".monedasshow").hide();
});

$(".deploymoneda").click(function (e) {
	$(".monedasshow").toggle();
	$(".idiomasshow").hide();
});

$(document).mouseup(function (e) {

	var container = $(".selectidiomaymoneda");

	if (!container.is(e.target) // if the target of the click isn't the container...
		&&
		container.has(e.target).length === 0) // ... nor a descendant of the container
	{
		$("#monedasshow").hide();
		$("#idiomasshow").hide();
	}

});

if ($('.rollover').length > 0) {

	$('a.rollover').cluetip({
		tracking: true
	});

}

$('div.html, div.jquery').next().css('display', 'none').end().click(function () {
	$(this).next().toggle('fast');
});

$('a.false').click(function () {
	return false;
});


$(document).ready(function (e) {
	$(".nav_top ul").hide();
	console.log(window.location.href);
	if (window.location.href.indexOf('/turismo/') !== -1 && window.location.href.indexOf('cur=') === -1) {
		var defaultCur = $("#ModuloIdioma_DefaultCurrency").val();
		console.log(defaultCur);
		if (defaultCur) {
			changeCurrency(defaultCur);
			refreshCurrencyChanger();
			console.log('defaultcur');
		}
	}
});

$(".nav_top li").mouseenter(function (e) {
	$(this).children("ul").show();
});

$(".nav_top li").mouseleave(function (e) {
	$(this).children("ul").hide();
});


$(".nav_top li").click(function (e) {

	$(this).children("ul").toggle();
});

$(".openmodal").click(function () {
	var iframeurl = $(this).attr("rel");
	$("#IframeRD").attr("src", iframeurl);
	$("#ContainerRD").fadeIn(500);
})

$("#CloseRDContainer i").click(function () {
	$("#ContainerRD").hide();
})

$("#cruz_rd").click(function () {
	$("#rdirecto").hide();
	setCookie("rdirecto", "1", "1");
})

var ReservaDirectoCookie = getCookie()

if (getCookie("rdirecto") === "1") {
	$("#rdirecto").hide();
}

$('#IframeRD').load(function () {
	$("#Loader").hide(500);
	$("#IframeRD").fadeIn(500);
});



// Inicializacion de ReservaDirecto //

Json_User = getCookie("Json_User");

if ($(".neo_rd_trigger")) {

	$(".neo_rd_trigger").each(function () {
		$(this).click(function () {
			if ($(this).hasClass("rd_logout")) {
				console.log("Logging out...");
				Json_User = null;
				setCookie("Json_User", null, 0);
			}
		});
		if (Json_User) {
			if (Json_User && Json_User.valid == 1) {
				console.log("Usuario Logueado");
				var ifUrl = "https://app.reservadirecto.com/core/loginout.php?pos=" + $(this).attr("pos") + "&returnurl=" + encodeURI(window.location.href);
				$(this).attr("rel", ifUrl);
				$(this).find("span").hide();
				$(this).find(".neo_rd_trigger_logintxt").show();
				$(this).addClass("rd_logout");
			} else {
				console.log("Usuario NO Logueado");
				$(this).find("span").hide();
				$(this).find(".neo_rd_trigger_logouttxt").show();
				var ifUrl = "https://app.reservadirecto.com/?pos=" + $(this).attr("pos") + "&returnurl=" + encodeURI(window.location.href);
				$(this).attr("rel", ifUrl);
				$(this).removeClass("rd_logout");
			}
		}
	})

}

// Currency Modulo Idiomas //

function refreshCurrencyChanger() {

	/* Esconde o muestra, según corresponda, las monedas disponibles y las activas, evaluando en base al CurrencyTk activo */

	if ($(".monedaitem").length && CurrencyTk) {
		$(".monedaitem").each(function () {
			if ($(this).attr("cur") != CurrencyTk) {
				$(this).removeClass("hidden");
			} else {
				$(this).addClass("hidden");
			}
		})
	}

	if ($(".monedaactual").length && CurrencyTk) {
		$(".monedaactual").each(function () {
			if ($(this).attr("cur") == CurrencyTk) {
				$(this).removeClass("hidden");
			} else {
				$(this).addClass("hidden");
			}
		})
	}

}

refreshCurrencyChanger();

if ($(".changeCurrency").length) {
	$(".changeCurrency").click(function () {
		var curToAssign = $(this).attr("cur");
		changeCurrency(curToAssign);
		refreshCurrencyChanger();
		if ($(".neo_cart_pug_grid").length) window.location.reload();

		if ($(".neo_modules_cart_hotel_v2").length) {
			var loaderText = $("#loaderText").length ? $("#loaderText").text() + "..." : "Cargando...";
			var urlParams = new URLSearchParams(window.location.search);
			var EmailTk = Email ? Email : "NN";
			var missingPar = urlParams.get("Missing") ? "&Missing=" + urlParams.get("Missing") : "";
			var userPar = urlParams.get("UserID") ? "&UserID=" + urlParams.get("UserID") : "";
			var userTkPar = urlParams.get("Token") ? "&Token=" + urlParams.get("Token") : "";
			var tagPar = urlParams.get("tag") ? urlParams.get("tag") : "NN";
			var pidPar = urlParams.get("Pid") ? "&Pid=" + urlParams.get("Pid") : "";
			var ListIDPar = urlParams.get("ListID") ? "&ListID=" + urlParams.get("ListID") : "";
			tagPar = tagPar == "NN" ? urlParams.get("Tag") : tagPar;
			tagPar = tagPar ? tagPar : "NN";
			tagPar = "&tag=" + tagPar;

			var urlCart = '/neo_modules/cart_hotel_v2/module.php?pos=' + Json_Pos.Pos + "&Sku=1&SearchID=" + urlParams.get("SearchID") + missingPar + userPar + userTkPar + tagPar + pidPar + ListIDPar + "&cur=" + CurrencyTk + "&lng=" + LngTk + "&Email=" + EmailTk + "&search=OK";

			console.log("URL CART INITIAL LOAD: " + urlCart);
			CargarModulo(urlCart, loaderText, ".container_cargarmodulo");
		}
		if ($(this).is(".refreshCurrency") && $(".neo_modules_cart_hotel_v2").length === 0) {
			var urlParams = new URLSearchParams(window.location.search);
			urlParams.delete("cur");
			urlParams.set("cur", CurrencyTk);
			var newLocation = decodeURIComponent(urlParams.toString());
			window.location = window.location.origin + window.location.pathname + "?" + newLocation;
		}
		$(".monedasshow").toggle();
		$(".idiomasshow").hide();
	})
}

function refreshLngChanger() {
	$(".idiomalink").each(function() {
		var thisLng = $(this).attr('lng');
		var newHref = `/${thisLng}`;
		var newPathname = window.location.pathname.replace(`/${LngTk}`, '');
		newHref += newPathname;
		newHref = newHref.split('?')[0] + window.location.search;
		$(this).attr("href", newHref);
	})
}

refreshLngChanger();

