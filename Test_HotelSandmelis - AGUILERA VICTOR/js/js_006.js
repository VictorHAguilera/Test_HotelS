/* MARKETPLACE_BUSCADOR_v3 JS.JS BEGIN */

$(".filtersku i").click(function (e) {
	$(".filtersku").remove();
	$(".filterby").remove();
	$(".skufilercontainer input").val("");
});

if (!tagPxsolEngine) {
	var tagPxsolEngine = setTag();
}

var locationChoosenClick = false;



var lng = $(".neo_marketplace_buscador_v3 #dataconfig").attr("lng");
var DatePickerStart = $(".neo_marketplace_buscador_v3 #dataconfig").attr("DatePickerStart");
DatePickerStart = DatePickerStart * 1;

$(".ModuloWrap_marketplace_buscador_v3").click(function () {
	$(this).removeClass("isolate");
});

var required_txt_date = "Please select a date";
var required_txt_search = "Please select a destination";
if (LngTk == "es") {
	required_txt_date = "Por favor seleccione una Fecha"
	required_txt_search = "Por favor seleccione una destino";
}
if (LngTk == "pt") {
	required_txt_date = "Selecione uma data"
	required_txt_search = "Seleccione um destino";
}

$(".neo_marketplace_buscador_v3 #pxmk_searchform").validate({
	rules: {
		Search: {
			required: true
		},
		Start: {
			required: true
		},
		End: {
			required: true
		}
	},
	messages: {
		Search: {
			required: required_txt_search
		},
		Start: {
			required: required_txt_date
		},
		End: {
			required: required_txt_date
		}
	}
});





function SetPartyGroup() {
	var PartyTypeVal = $(".neo_marketplace_buscador_v3 #PartyType").val();
	if (PartyTypeVal === "single") {
		$(".neo_marketplace_buscador_v3 #GroupsForm").val("1:1,0,0");
	}
	if (PartyTypeVal === "double") {
		$(".neo_marketplace_buscador_v3 #GroupsForm").val("1:2,0,0");
	}
	if (PartyTypeVal === "multiple" || PartyTypeVal == "familiar") {
		$(".neo_marketplace_buscador_v3 #MultiplePartySelect").css('display', 'flex');
		CalculatePartyGroup();
	} else {
		$(".neo_marketplace_buscador_v3 #MultiplePartySelect").hide();
	}
}


$(".neo_marketplace_buscador_v3 .CalculateParty").change(function () {
	CalculatePartyGroup();
});

var InitialContent = $(".neo_marketplace_buscador_v3 .RoomsSelectContainer[roomnumber='1']").html();
var MaxRooms = Number($(".neo_marketplace_buscador_v3 #MaxRooms").val());

$(".neo_marketplace_buscador_v3 .px-mk-addnewroom").off();
$(".neo_marketplace_buscador_v3 .px-mk-addnewroom").click(function () {
	$(".neo_marketplace_buscador_v3 .px-mk-removeroom").show();
	var CurrentRooms = $(".neo_marketplace_buscador_v3 .RoomsSelectContainer").length;
	if (CurrentRooms < MaxRooms) {
		var LastRoomNumber = $(".neo_marketplace_buscador_v3 .RoomsSelectContainer").last().attr("roomnumber");
		var NewRoomNumber = Number(LastRoomNumber) + 1;
		var NewContent = '<div class="RoomsSelectContainer" roomnumber="' + NewRoomNumber + '">' + InitialContent + '</div>';
		$(NewContent).insertAfter($(".neo_marketplace_buscador_v3 .RoomsSelectContainer").last());

		$(".neo_marketplace_buscador_v3 .RoomsSelectContainer[roomnumber='" + NewRoomNumber + "']").find('#RoomNumber').text(NewRoomNumber);
		$(".neo_marketplace_buscador_v3 .RoomsSelectContainer[roomnumber='" + NewRoomNumber + "']").find('[roomnumber]').attr('roomnumber', NewRoomNumber);
		
		if (Number(CurrentRooms + 1) === Number(MaxRooms)) {
			$(".neo_marketplace_buscador_v3 .px-mk-addnewroom").hide();
		}
	}
	CalculatePartyGroup();
});

$(".neo_marketplace_buscador_v3 #PartyType").change(function () {
	SetPartyGroup();
});

SetPartyGroup();

console.log('Init rmRoom');
$(".neo_marketplace_buscador_v3 .px-mk-removeroom-btn").off();
$(".neo_marketplace_buscador_v3 .px-mk-removeroom-btn").click(function () {
	var MaxRooms = $(".neo_marketplace_buscador_v3 #MaxRooms").val();
	var CurrentRooms = $(".neo_marketplace_buscador_v3 .RoomsSelectContainer").length;

	//console.log(CurrentRooms+" < "+MaxRooms);

	$(".neo_marketplace_buscador_v3 .RoomsSelectContainer").last().remove();
	if (Number(CurrentRooms - 1) < Number(MaxRooms)) {
		$(".neo_marketplace_buscador_v3 .px-mk-addnewroom").show();
	}
	if (Number(CurrentRooms - 1) === 1) {
		$(".neo_marketplace_buscador_v3 .px-mk-removeroom").hide();
	}
	CalculatePartyGroup();
});


$(".neo_marketplace_buscador_v3 .SelectorInitial").click(function () {
	$(".neo_marketplace_buscador_v3 .PartyTypeSimulatorSelect").show();
});

$('body').click(function(e) {
	if (!$(e.target).is('.neo_marketplace_buscador_v3 .SelectorInitial') && !$(e.target).parents('.SelectorInitial').length && !$(e.target).parents('.PartyTypeSimulatorSelect').length) {
		$(".neo_marketplace_buscador_v3 .PartyTypeSimulatorSelect").hide();
	}
})

$(".neo_marketplace_buscador_v3 .PartyTypeSimulatorSelect .Selector").click(function () {
	var PartyType = $(this).attr("rel");
	$(".neo_marketplace_buscador_v3 #PartyType").val(PartyType);
	SetPartyGroup();
	$(".neo_marketplace_buscador_v3 .SelectorInitial").hide();
	$(".neo_marketplace_buscador_v3 .SelectorInitial[rel='" + PartyType + "']").css('display', 'flex');
	$(".neo_marketplace_buscador_v3 .PartyTypeSimulatorSelect").hide();
});




function ChildrensSelect(elem) {
	var RoomNumber = $(elem).attr("roomnumber");
	var ChildrensQty = $(elem).val();
	if (ChildrensQty > 0) {
		$(".neo_marketplace_buscador_v3 .ChildrensAgesSelectContainer[roomnumber='" + RoomNumber + "']").html('');
		$(".neo_marketplace_buscador_v3 .ChildrensAges[roomnumber='" + RoomNumber + "']").show();
		var ChildrensAgesContent = '<select class="ChildrensAgesSelect" onchange="CalculatePartyGroup(this)" roomnumber="' + RoomNumber + '">';
		var MaxAgeChildrenNumber = $(".neo_marketplace_buscador_v3 #MaxAgeChildrenNumber").val();
		//ChildrensAgesContent += '<option value="">-</option>';
		for (var i = 0; i <= MaxAgeChildrenNumber; i++) {
			ChildrensAgesContent += '<option value="' + i + '" ' + ( i === 12 ? "selected" : '' ) + ' >' + i + '</option>';
		}
		ChildrensAgesContent += '</select>';
		for (var j = 1; j <= ChildrensQty; j++) {
			$(".neo_marketplace_buscador_v3 .ChildrensAgesSelectContainer[roomnumber='" + RoomNumber + "']").append(ChildrensAgesContent);
		}
	} else {
		$(".neo_marketplace_buscador_v3 .ChildrensAges[roomnumber='" + RoomNumber + "']").hide();
	}
	CalculatePartyGroup();
}

function CheckChildrens() {
	var ValidChildrens = 1;
	$(".neo_marketplace_buscador_v3 .NotValidChildrens").hide();
	$(".neo_marketplace_buscador_v3 .ChildrensSelect").each(function () {
		var HasChilds = $(this).val();
		var RoomNumber = $(this).attr("roomnumber");
		if (HasChilds !== "0") {
			$(".neo_marketplace_buscador_v3 .ChildrensAgesSelect[roomnumber='" + RoomNumber + "']").each(function () {
				if ($(this).val() === "") {
					ValidChildrens = 0;
					$(this).addClass("notvalid");
				}
			});
		}
	});
	if (ValidChildrens === 0) {
		$(".neo_marketplace_buscador_v3 .NotValidChildrens").show();
	}
	return ValidChildrens;
}


function CalculatePartyGroup(elem) {

	$(elem).removeClass("notvalid");
	var RoomsQty = $(".neo_marketplace_buscador_v3 .RoomsSelectContainer").length;
	var PartyGroup = "";
	var RoomsQtyLoop = 1;
	$(".neo_marketplace_buscador_v3 .RoomsSelectContainer").each(function () {
		PartyGroup += RoomsQtyLoop;
		if (RoomsQtyLoop <= RoomsQty) {
			RoomsQtyLoop = RoomsQtyLoop + 1;
		}
		var RoomNumber = $(this).attr("roomnumber");
		var Adults = $(".neo_marketplace_buscador_v3 .AdultsSelect[roomnumber='" + RoomNumber + "']").val();

		if ($(".neo_marketplace_buscador_v3 #Combinations").length > 0) {
			var JsonCombinations = $(".neo_marketplace_buscador_v3 #Combinations").text();
			JsonCombinations = JSON.parse(JsonCombinations);
			$.each(JsonCombinations, function (i, item) {
				if (JsonCombinations[i].Adults === Adults) {
					console.log("MAXCHILDS=" + JsonCombinations[i].Childs);
					var DefaultChilds = $(".neo_marketplace_buscador_v3 .ChildrensSelect[roomnumber='" + RoomNumber + "']").val();
					console.log("DEFAULTCHILDS=" + DefaultChilds);
					$(".neo_marketplace_buscador_v3 .ChildrensSelect[roomnumber='" + RoomNumber + "']").html('');
					for (var c = 0; c <= JsonCombinations[i].Childs; c++) {
						if (c === 0) {
							var itext = "-";
						} else {
							var itext = c;
						}
						$(".neo_marketplace_buscador_v3 .ChildrensSelect[roomnumber='" + RoomNumber + "']").append('<option value="' + c + '">' + itext + '</option>')
					}
					$(".neo_marketplace_buscador_v3 .ChildrensSelect[roomnumber='" + RoomNumber + "']").val(DefaultChilds);
				}
			});
		}


		PartyGroup += ":" + Adults + ",";
		var Childrens = $(".neo_marketplace_buscador_v3 .ChildrensSelect[roomnumber='" + RoomNumber + "']").val();
		var BabiesQty = 0;
		var MaxAgeBabies = $(".neo_marketplace_buscador_v3 #MaxAgeBabiesNumber").val();
		var ChildrenPartyGroup = "";

		if (Number(Childrens) !== 0) {

			$(".neo_marketplace_buscador_v3 .ChildrensAgesSelect[roomnumber='" + RoomNumber + "']").each(function () {
				var ChildrensAgeValue = $(this).val();
				console.log(ChildrensAgeValue);
				console.log("MaxAgeBabies=" + MaxAgeBabies);
				if (Number(ChildrensAgeValue) <= Number(MaxAgeBabies)) {
					BabiesQty += 1;
				} else {
					ChildrenPartyGroup += ChildrensAgeValue + ".";

				}
			});
			if (ChildrenPartyGroup.indexOf(".") !== -1) {
				ChildrenPartyGroup = ChildrenPartyGroup.substr(0, ChildrenPartyGroup.length - 1);
			}
		} else {
			ChildrenPartyGroup = "0";
		}
		if (ChildrenPartyGroup === "") {
			ChildrenPartyGroup = "0";
		}
		console.log(ChildrenPartyGroup);
		PartyGroup += ChildrenPartyGroup + "," + BabiesQty + ";";
	});
	PartyGroup = PartyGroup.substring(0, PartyGroup.length - 1);
	PartyGroup = PartyGroup.replace("0.0", "0");
	console.log("PARTYGROUP=" + PartyGroup);
	$(".neo_marketplace_buscador_v3 #GroupsForm").val(PartyGroup);
}

$("body").on("click", function (e) {
	if (!$(e.target).parents("#MultiplePartySelect").length && !$(e.target).parents('[rel="multiple"]').length && !$(e.target).is('[rel="multiple"]')) {
		$(".neo_marketplace_buscador_v3 #MultiplePartySelect").hide();
	}
})

if ($(".neo_marketplace_buscador_v3 #fechaingreso").length) {

	function GetFormattedDate(dia) {
		var todayTime = new Date();
		if (dia !== null) {
			var manana = todayTime.setDate(todayTime.getDate() + dia);
		}
		var month = todayTime.getMonth() + 1;
		var day = todayTime.getDate();
		var year = todayTime.getFullYear();
		if (dia !== null) {
			return day + "/" + month + "/" + year;
		} else {
			return manana + "/" + month + "/" + year;
		}
	}


	function dateafter(entrada, salida) {
		var fechaegreso = $(entrada).val();
		var newdate = fechaegreso.split("/").reverse().join("-");
		var dt = $.datepicker.parseDate('yy-mm-dd', newdate);
		dt.setDate(dt.getDate() + 1);
		var dtNew = $.datepicker.formatDate('yy-mm-dd', dt);
		dtNew = dtNew.split("-").reverse().join("/");
		$(salida).datepicker('setDate',dtNew);
		VerNoches(1);
	}

	var NochesError_txt = "Please select a check-out date";
	if (lng == "es") {
		NochesError_txt = "Por favor seleccione una fecha de salida";
	}
	if (lng == "pt") {
		NochesError_txt = "Por favor seleccione uma data de partida";
	}

	function VerNoches(Noches) {
		if (Noches <= 0) {
			console.log(Noches);
			$(".neo_marketplace_buscador_v3 #NochesError").html(NochesError_txt);
			$(".neo_marketplace_buscador_v3 #NochesError").show();
			$(".neo_marketplace_buscador_v3 #Nights").val(Noches);
			$(".neo_marketplace_buscador_v3 #NochesText").html('<b>' + Noches + '</b>');
		} else {
			console.log(Noches);
			$(".neo_marketplace_buscador_v3 #NochesError").html("");
			$(".neo_marketplace_buscador_v3 #NochesError").hide();
			$(".neo_marketplace_buscador_v3 #Nights").val(Noches);
			$(".neo_marketplace_buscador_v3 #NochesText").html('<b>' + Noches + '</b>');
		}
	}

	var Noches = '';
	var Tiempo = '';




	$(".neo_marketplace_buscador_v3 #fechaingreso_icon,.fechas_ancho_entrada").click(function () {
		$(".neo_marketplace_buscador_v3 #fechaingreso").datepicker("show")
		document.activeElement.blur();
		$(".PartyTypeSimulatorSelect").hide();

	});
	$(".neo_marketplace_buscador_v3 #fechaegreso_icon,.fechas_ancho_salida").click(function () {
		$(".neo_marketplace_buscador_v3 #fechaegreso").datepicker("show")
		document.activeElement.blur();
		$(".PartyTypeSimulatorSelect").hide();
	});

	$(".neo_marketplace_buscador_v3 #fechaingreso,.fechas_ancho_entrada").click(function () {
		document.activeElement.blur();
		$(".PartyTypeSimulatorSelect").hide();
	});

	$(".neo_marketplace_buscador_v3 #fechaegreso,.fechas_ancho_salida").click(function () {
		document.activeElement.blur();
		$(".PartyTypeSimulatorSelect").hide();
	});

	dateSelecionada1 = $(".neo_marketplace_buscador_v3 #fechaingreso").datepicker('getDate');
	dateSelecionada2 = $(".neo_marketplace_buscador_v3 #fechaegreso").datepicker('getDate');


	if (LngTk === 'es') {
		( function( factory ) {
			if ( typeof define === "function" && define.amd ) {
		
				// AMD. Register as an anonymous module.
				define( [ "../widgets/datepicker" ], factory );
			} else {
		
				// Browser globals
				factory( jQuery.datepicker );
			}
		}( function( datepicker ) {
		
		datepicker.regional.es = {
			closeText: "Cerrar",
			prevText: "&#x3C;Ant",
			nextText: "Sig&#x3E;",
			currentText: "Hoy",
			monthNames: [ "enero","febrero","marzo","abril","mayo","junio",
			"julio","agosto","septiembre","octubre","noviembre","diciembre" ],
			monthNamesShort: [ "ene","feb","mar","abr","may","jun",
			"jul","ago","sep","oct","nov","dic" ],
			dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
			dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
			dayNamesMin: [ "D","L","M","X","J","V","S" ],
			weekHeader: "Sm",
			dateFormat: "dd/mm/yy",
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: "" };
		datepicker.setDefaults( datepicker.regional.es );
		
		return datepicker.regional.es;
		
		} ) );
	}

	if (LngTk === 'pt') {
		( function( factory ) {
			if ( typeof define === "function" && define.amd ) {
		
				// AMD. Register as an anonymous module.
				define( [ "../widgets/datepicker" ], factory );
			} else {
		
				// Browser globals
				factory( jQuery.datepicker );
			}
		}( function( datepicker ) {
		
		datepicker.regional[ LngTk ] = {
			closeText: "Fechar",
			prevText: "&#x3C;Anterior",
			nextText: "Próximo&#x3E;",
			currentText: "Hoje",
			monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
			"Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
			monthNamesShort: [ "Jan","Fev","Mar","Abr","Mai","Jun",
			"Jul","Ago","Set","Out","Nov","Dez" ],
			dayNames: [
				"Domingo",
				"Segunda-feira",
				"Terça-feira",
				"Quarta-feira",
				"Quinta-feira",
				"Sexta-feira",
				"Sábado"
			],
			dayNamesShort: [ "Dom","Seg","Ter","Qua","Qui","Sex","Sáb" ],
			dayNamesMin: [ "Dom","Seg","Ter","Qua","Qui","Sex","Sáb" ],
			weekHeader: "Sm",
			dateFormat: "dd/mm/yy",
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: "" };
		datepicker.setDefaults( datepicker.regional[ "pt-BR" ] );
		
		return datepicker.regional[ "pt-BR" ];
		
		} ) );
	}
	
	$.datepicker.setDefaults($.datepicker.regional[LngTk]);

	function RunClosedOnArrival(disableddates) {

		disableddates = disableddates.split(",");

		$(".neo_marketplace_buscador_v3 #fechaingreso").datepicker({
			dateFormat: 'dd/mm/yy',
			showAnim: '',
			onSelect: function () {
				$(this).datepicker('hide');
				dateSelecionada1 = $(this).datepicker('getDate');
				$(".neo_marketplace_buscador_v3 #fechaegreso").val('');
				dateSelecionada1.setDate(dateSelecionada1.getDate() + 1);
				$(".neo_marketplace_buscador_v3 #fechaegreso").datepicker('option', 'minDate', dateSelecionada1);
				VerNoches(0);
				dateafter($(this), ".neo_marketplace_buscador_v3 #fechaegreso");
				setTimeout(() => {
					$('.neo_marketplace_buscador_v3 #fechaegreso').datepicker('show');
				}, 100);


			},
			beforeShowDay: function (date) {
				var sdate = $.datepicker.formatDate('yy-mm-dd', date);
				if ($.inArray(String(sdate), disableddates) !== -1) {
					return [false];
				}
				return [true];
			}


		});


		RunMinDate();

	}



	function RunClosedOnDepartures(disableddates) {

		disableddates = disableddates.split(",");

		$(".neo_marketplace_buscador_v3 #fechaegreso").datepicker({
			dateFormat: 'dd/mm/yy',
			showAnim: '',
			onSelect: function () {
				dateSelecionada1 = $(".neo_marketplace_buscador_v3 #fechaingreso").datepicker('getDate');
				dateSelecionada2 = $(".neo_marketplace_buscador_v3 #fechaegreso").datepicker('getDate');
				one_day = 1000 * 60 * 60 * 24;
				Noches = Math.ceil((dateSelecionada2.getTime() - dateSelecionada1.getTime()) / (one_day));
				VerNoches(Noches);
				$(".neo_marketplace_buscador_v3 #fechaegreso").valid();
			},
			beforeShowDay: function (date) {
				var sdate = $.datepicker.formatDate('yy-mm-dd', date);

				var today = new Date();
				var smallerdate = new Date(sdate);


				if ($.inArray(String(sdate), disableddates) !== -1) {
					return [false];
				}
				return [true];
			}

		});

		RunMinDate();

	}

	function RunMinDate() {

		var today = new Date();
		var tomorrow = new Date();

		today.setDate(today.getDate() + DatePickerStart);
		tomorrow.setDate(tomorrow.getDate() + DatePickerStart + 1);

		$(".neo_marketplace_buscador_v3 #fechaingreso").datepicker('option', 'minDate', new Date(new Date().getFullYear(), today.getMonth(), today.getDate()));
		$(".neo_marketplace_buscador_v3 #fechaegreso").datepicker('option', 'minDate', new Date(new Date().getFullYear(), tomorrow.getMonth(), tomorrow.getDate()));

		if (dateSelecionada1 != null && dateSelecionada2 != null) {
			one_day = 1000 * 60 * 60 * 24;
			Tiempo = Math.ceil(dateSelecionada2.getTime() - dateSelecionada1.getTime());
			Noches = Math.round(Tiempo / one_day);
			VerNoches(Noches);
		};


		var fullDate = new Date()
		console.log(fullDate);
		var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);

	}

	$(".neo_marketplace_buscador_v3 #Nights").val("1");


}

$(".neo_marketplace_buscador_v3 #LocationSearch").on("keydown", function (e) {
	var locDropdown = $(".px-mk-locationdropdown");
	var itemClass = "px-mk-locationitem";
	var suggestionHoverClass = "suggestion_hover";
	if (e.key == "ArrowDown") {
		e.preventDefault();

		if ($("." + suggestionHoverClass).length > 0) {
			if ($(locDropdown).find("." + suggestionHoverClass).nextAll(":visible:first").length > 0) {
				var currentHover = $(locDropdown).find("." + suggestionHoverClass);
				$(currentHover).nextAll(":visible:first").addClass(suggestionHoverClass);
				$(currentHover).removeClass(suggestionHoverClass).focus();
				var suggCont = $(locDropdown);
				var suggGoTo = $(currentHover).nextAll(":visible:first");
				if (suggGoTo.offset().top + suggGoTo.innerHeight() > suggCont.offset().top + suggCont.innerHeight()) {
					suggCont.scrollTop(
						suggCont.scrollTop() + suggGoTo.innerHeight()
					);
				}
			} else {
				$("." + suggestionHoverClass).removeClass(suggestionHoverClass);
				$(locDropdown).find("." + itemClass + ":visible:first").addClass(suggestionHoverClass);
				var suggCont = $(locDropdown);
				suggCont.scrollTop(0);
			}
		} else {
			$(locDropdown).find("." + itemClass + ":visible:first").addClass(suggestionHoverClass);
			var currentHover = $(locDropdown).find("." + suggestionHoverClass);
			var suggCont = $(locDropdown);
			var suggGoTo = $(currentHover).nextAll(":visible:first");
			suggCont.scrollTop(0);
		}
	} else if (e.key == "ArrowUp") {
		e.preventDefault();

		if ($("." + suggestionHoverClass).length > 0) {
			if ($(locDropdown).find("." + suggestionHoverClass).prevAll(":visible:first").length > 0) {
				var currentHover = $(locDropdown).find("." + suggestionHoverClass);
				$(currentHover).prevAll(":visible:first").addClass(suggestionHoverClass);
				$(currentHover).removeClass(suggestionHoverClass).focus();

				var suggCont = $(locDropdown);
				var suggGoTo = $(currentHover).prevAll(":visible:first");
				if (suggGoTo.offset().top < suggCont.offset().top) {
					suggCont.scrollTop(
						suggGoTo.offset().top - suggCont.offset().top + suggCont.scrollTop()
					);
				}
			} else {
				$("." + suggestionHoverClass).removeClass(suggestionHoverClass);
				$(locDropdown).find("." + itemClass + ":visible:last").addClass(suggestionHoverClass);
				var currentHover = $(locDropdown).find("." + suggestionHoverClass);

				var suggCont = $(locDropdown);
				var suggGoTo = $(currentHover).prevAll(":visible:first");

				suggCont.scrollTop(
					suggGoTo.offset().top - suggCont.offset().top + suggCont.scrollTop()
				);
			}
		} else {
			$(locDropdown).find("." + itemClass + ":visible:last").addClass(suggestionHoverClass);
			var currentHover = $(locDropdown).find("." + suggestionHoverClass);
			var suggCont = $(locDropdown);
			var suggGoTo = $(currentHover).prevAll(":visible:first");
			suggCont.scrollTop(
				suggGoTo.offset().top - suggCont.offset().top + suggCont.scrollTop()
			);

		}
	} else if (e.key == "Enter") {
		e.preventDefault();
		if (!$("." + itemClass + ":visible:not(.px-mk-everylocation)").length) {
			chooseLocation($(".px-mk-everylocation"));
		} else {
			var itemHighlighted = $(locDropdown).find("." + suggestionHoverClass);
			$("." + suggestionHoverClass).removeClass(suggestionHoverClass);
			chooseLocation(itemHighlighted);
		}
	}
});

$(".neo_marketplace_buscador_v3 #LocationSearch").on("click focus", function () {
	$(this).select();
	$(this).select();
})

$('.neo_marketplace_buscador_v3 #LocationSearch').on('blur', function(e) {
	setTimeout(function() {
		if (!locationChoosenClick && $('#LocationSearch').val() === '') {
			chooseLocation($('.neo_marketplace_buscador_v3 .px-mk-locationitem:visible')[0]);
		} else {
			locationChoosenClick = false;
		}
	}, 200);
})

$(".neo_marketplace_buscador_v3 #LocationSearch").on("focus", function (e) {
	var locDropdown = $(".px-mk-locationdropdown");
	$(locDropdown).addClass("activeAC");
});

$(".neo_marketplace_buscador_v3 #LocationSearch").on("input paste focus", function (e) {
	var defSearch = false;
	if ($.inArray($(this).val(), ['Buscar en todas las ubicaciones', 'Search in all locations', 'Pesquisar em todos os locais']) !== -1 && $(this).val()) { 
		defSearch = true;
	};

	console.log(e.keyCode);
	var locDropdown = $(".px-mk-locationdropdown");
	var searchTerm = $(this).val().toLowerCase();
	var resultados = 0;
	$(locDropdown).children().each(function () {
		if (($(this).text().toLowerCase().indexOf(searchTerm) !== -1) || defSearch) {
			$(this).show();
			resultados++;
		} else {
			$(this).hide();
		}
		if ($(this).is(".px-mk-everylocation")) $(this).show();
	})
	if (resultados > 0) {
		$(locDropdown).addClass("activeAC");
	} else {
		$(locDropdown).removeClass("activeAC");
	}

	if (window.outerWidth < 650) {
		setTimeout(function() {
			$(window).scrollTop($('#LocationSearch').offset().top - 10);
		}, 100);
	}

});

$(document).on("click", function (e) {
	if (!$(e.target).parents(".px-mk-locationdropdown").length && !$(e.target).is("#LocationSearch")) {
		$(".px-mk-locationdropdown").removeClass("activeAC");
		$(".suggestion_hover").removeClass("suggestion_hover");
	}
})

function chooseLocation(item) {
	var locDropdown = $(".px-mk-locationdropdown");
	var locationID = $(item).attr("location-id");
	var locationName = $.trim($(item).find(".px-mk-locationtxt").text());
	$(".neo_marketplace_buscador_v3 #LocationSearch").val(locationName);
	$(".neo_marketplace_buscador_v3 #LocationID").val(locationID);
	$(".neo_marketplace_buscador_v3 #Location").val(locationName);
	if (!locationID) {
		$(".neo_marketplace_buscador_v3 #Location").val('');
	}
	$(locDropdown).removeClass("activeAC");
	locationChoosenClick = true;

}


$(".neo_marketplace_buscador_v3 .px-mk-locationitem").click(function () {
	chooseLocation(this);
})

function loadProducts() {
	$(".px-mk-generalerror").hide();
	var endPoint = $(".neo_marketplace_buscador_v3 #pxmk_searchform").attr("px-endpoint");
	var ReturnUrl = $(".neo_marketplace_buscador_v3 #MultiListID option:selected").attr("px-listurl");
	var ListID = $(".neo_marketplace_buscador_v3 #MultiListID").val();
	$(".neo_marketplace_buscador_v3 #ReturnUrl").val(ReturnUrl);
	$('.neo_marketplace_buscador_v3 #MultiProductID').addClass("px-mk-disabled-temp");
	if (ListID !== '') {
		$.ajax(endPoint + "/list/info?id=" + ListID).done(function (res) {
			var listData = JSON.parse(res);
			var ownLP = $(".neo_marketplace_buscador_v3 #MultiProductID").attr("ownlp") === 'true' ? true : false;
			$(".neo_marketplace_buscador_v3 #MultiProductID").children().not("[disabled]").not("[value='everyproduct']").remove();
			$(".neo_marketplace_buscador_v3 #ProductID").val("");
			$(".neo_marketplace_buscador_v3 #MultiProductID").val("");
			$(listData.Products).each(function (i, product) {
				$('.neo_marketplace_buscador_v3 #MultiProductID').append($('<option>', {
					value: product.ProductID,
					text: product.Product.replace("&amp;", "&"),
					"px-producturl": ownLP ? 'https://secure.pxsol.com/lp.html' : product.Url,
					ownpos: product.OwnPos ? product.OwnPos : $(".neo_marketplace_buscador_v3 #MainPos").val()
				}));
			});
			$('.neo_marketplace_buscador_v3 #MultiProductID').removeClass("px-mk-disabled-temp");
			$('.px-mk-productid').removeClass("px-mk-productidhidden");
		}).fail(function (jqXHR, textstatus) {
			console.log("Error: ", textstatus);
			console.log(jqXHR);
			$(".px-mk-generalerror").show();
		})
	} else {
		$('.neo_marketplace_buscador_v3 #MultiProductID').removeClass("px-mk-disabled-temp");
		$('.px-mk-productid').addClass("px-mk-productidhidden");
	}

}


if ($(".neo_marketplace_buscador_v3 #MultiListID").length > 0) {
	$(".neo_marketplace_buscador_v3 #MultiListID").change(function (e) {
		var ListID = $(".neo_marketplace_buscador_v3 #MultiListID").val();
		$(".neo_marketplace_buscador_v3 #ListID").val(ListID);
		loadProducts();
	});
}

// if ($(".neo_marketplace_buscador_v3 #CountryListID").length > 0) {
// 	$(".neo_marketplace_buscador_v3 #CountryListID").change(function (e) {
// 		$('.neo_marketplace_buscador_v3 #ListID').val($('.neo_marketplace_buscador_v3 #CountryListID').children("[value='" + $('.neo_marketplace_buscador_v3 #CountryListID').val() + "']").attr("px-listid"));
// 		var endPoint = $(".neo_marketplace_buscador_v3 #pxmk_searchform").attr("px-endpoint");
// 		var ReturnUrl = $(this).val();
// 		var countryToSearch = $(this).children("[value='" + $(this).val() + "']").attr("px-listname");
// 		$(".neo_marketplace_buscador_v3 #ReturnUrl").val(ReturnUrl);
// 		$('.neo_marketplace_buscador_v3 #SubListID').addClass("px-mk-disabled-temp");

// 		$.ajax(endPoint + "/list/list?pos=" + $(".neo_marketplace_buscador_v3 #Pos").val()).done(function (res) {
// 			var listData = JSON.parse(res);
// 			$(".neo_marketplace_buscador_v3 #SubListID").children().not("[disabled]").not("[value='everyproduct']").remove();
// 			$(".neo_marketplace_buscador_v3 #SubListID").val("");
// 			$(listData.List).each(function (i, list) {
// 				if (countryToSearch != "todo" && list.Country == countryToSearch) {
// 					$('.neo_marketplace_buscador_v3 #SubListID').append($('<option>', {
// 						value: list.ID,
// 						text: list.Name,
// 						"px-listurl": list.Url
// 					}));
// 				} else if (countryToSearch == "todo" && list.Country !== '') {
// 					$('.neo_marketplace_buscador_v3 #SubListID').append($('<option>', {
// 						value: list.ID,
// 						text: list.Name,
// 						"px-listurl": list.Url
// 					}));
// 				}
// 			});
// 			$('.neo_marketplace_buscador_v3 #SubListID').removeClass("px-mk-disabled-temp");
// 			$('.px-mk-productid').removeClass("px-mk-productidhidden");
// 		});
// 	});
// }
// if ($(".neo_marketplace_buscador_v3 #SubListID").length > 0) {
// 	$(document).on('change', '#SubListID', function () {
// 		if ($(this).val() == 'everyproduct') {
// 			$(".neo_marketplace_buscador_v3 #ReturnUrl").val($(".neo_marketplace_buscador_v3 #CountryListID").val());
// 			$('.neo_marketplace_buscador_v3 #ListID').val($('.neo_marketplace_buscador_v3 #CountryListID').children("[value='" + $('.neo_marketplace_buscador_v3 #CountryListID').val() + "']").attr("px-listid"));
// 		} else {
// 			// var currentLoc = window.location.protocol + "//" + window.location.host + "/lp.html";
// 			// $('#ReturnUrl').val(currentLoc);
// 			$(".neo_marketplace_buscador_v3 #ReturnUrl").val($('.neo_marketplace_buscador_v3 #FromUrl').val().replace(/\/$/, "") + $(".neo_marketplace_buscador_v3 #SubListID option[value='" + $(this).val() + "']").attr("px-listurl"));
// 			$('.neo_marketplace_buscador_v3 #ListID').val($(this).val());
// 		}
// 	})
// }

if ($(".neo_marketplace_buscador_v3 #MultiProductID").length > 0) {
	$(".neo_marketplace_buscador_v3 #MultiProductID").change(function () {
		var ownLP = $(this).attr("ownlp") === 'true' ? true : false;
		var selectedProduct = $(".neo_marketplace_buscador_v3 #MultiProductID option[value='" + $(this).val() + "']");
		if ($(this).val() == 'everyproduct') {
			$(".neo_marketplace_buscador_v3 #ReturnUrl").val($(".neo_marketplace_buscador_v3 #MultiListID").find(":selected").attr("px-listurl"));
			$('.neo_marketplace_buscador_v3 #ProductID').val("");
			if ($('.neo_marketplace_buscador_v3 #MultiListID')) {
				var multiListID = $('.neo_marketplace_buscador_v3 #MultiListID').val();
				$('.neo_marketplace_buscador_v3 #ListID').val(multiListID);
			}
		} else {
			var currentLoc = window.location.protocol + "//" + window.location.host + "/lp.html";
			//$('.neo_marketplace_buscador_v3 #ReturnUrl').val(currentLoc); 
			$(".neo_marketplace_buscador_v3 #ReturnUrl").val(selectedProduct.attr("px-producturl"));
			$('.neo_marketplace_buscador_v3 #ProductID').val($(this).val());
			$(".neo_marketplace_buscador_v3 #ListID").val("");
		}
		if (ownLP) {
			var ownPos = selectedProduct.attr("ownpos");
			$(".neo_marketplace_buscador_v3 #Pos").val(ownPos)
		}
	})
}

$(".neo_marketplace_buscador_v3 #mktbuscador_changesearch, .mktbuscador_changesearch").click(function () {
	$(".px-mk-buscador-container").removeClass("px-mk-hidesearchform");
	$(this).parents('.px-mk-searchinfo').hide();
});




$(document).ready(function () {
	var buscando = false;



	$(".neo_marketplace_buscador_v3 #MultiListID, #LocationSearch").prop("disabled", false);

	if (!buscando) {
		var btntxt = $('.neo_marketplace_buscador_v3 #PxMkAcion_Search').attr("btntxt") ? $('.neo_marketplace_buscador_v3 #PxMkAcion_Search').attr("btntxt") : "Ver Tarifas";
		$('.neo_marketplace_buscador_v3 #PxMkAcion_Search span').html(btntxt);
		$(".neo_marketplace_buscador_v3 #PxMkAcion_Search .px-mk-searchicon").removeClass('nodisplay');
		$(".neo_marketplace_buscador_v3 #PxMkAcion_Search .px-mk-searchloader").addClass('nodisplay');
	}

	/*	
	if ($(".neo_marketplace_buscador_v3 #ListID").length > 0 && $('#ListID').val()) {
		var ReturnUrl = $(this).val();
		$(".neo_marketplace_buscador_v3 #ReturnUrl").val(ReturnUrl);

	}
	*/

	if ($('.neo_marketplace_buscador_v3 #MultiProductID').val()) {
		$('.px-mk-productid').removeClass("px-mk-productidhidden");
	}

	if ($('.neo_marketplace_buscador_v3 #MultiListID').val()) {
		var multiListID = $('.neo_marketplace_buscador_v3 #MultiListID').val();
		$('.px-mk-productid').removeClass("px-mk-productidhidden");
		$('.neo_marketplace_buscador_v3 #ListID').val(multiListID);
	}

	var urldispo = $(".neo_marketplace_buscador_v3 #dataconfig").attr("urldispo");

	RunClosedOnArrival(",");
	RunClosedOnDepartures(",");
	if (window.autoOpenDatepicker) {
		if ($('.marketplace_buscador_v3 #fechainicio').is(':visible')) {
			$('.neo_marketplace_buscador_v3 #fechaingreso').datepicker('show');
		}
	}

	
	// if (urldispo !== "") {

	// 	var data = urldispo;
	// 	url = '/availability/arrival_departures';
	// 	console.log(url);

	// 	// ApiGet(url, data, undefined, function (Json) {

	// 	// 	var disableddates = "";
	// 	// 	var disableddatesdeparture = "";
	// 	// 	if (Json.List.length > 0) {
	// 	// 		var List = Json.List;
	// 	// 		$.each(List, function (i, item) {
	// 	// 			var List2 = List[i].List;
	// 	// 			var Cantidad = List2.length;
	// 	// 			var ClosedOnArrival = 0;
	// 	// 			var ClosedOnDepartures = 0;
	// 	// 			if (List2.length > 0) {
	// 	// 				$.each(List2, function (j, item) {
	// 	// 					if (List2[j].ClosedOnArrival === 1) {
	// 	// 						ClosedOnArrival += 1;
	// 	// 					}
	// 	// 					if (List2[j].ClosedOnDeparture === 1) {
	// 	// 						ClosedOnDepartures += 1;
	// 	// 					}
	// 	// 				});
	// 	// 				if (ClosedOnArrival == Cantidad) {
	// 	// 					disableddates += List[i].Date + ",";
	// 	// 				}
	// 	// 				if (ClosedOnDepartures == Cantidad) {
	// 	// 					disableddatesdeparture += List[i].Date + ",";
	// 	// 				}
	// 	// 			}
	// 	// 		});
	// 	// 	}
	// 	// 	if (disableddates !== "") {
	// 	// 		disableddates = disableddates.substr(0, disableddates.length - 1);
	// 	// 	}
	// 	// 	if (disableddatesdeparture !== "") {
	// 	// 		disableddatesdeparture = disableddatesdeparture.substr(0, disableddatesdeparture.length - 1);
	// 	// 	}


	// 	// 	RunClosedOnArrival(disableddates);
	// 	// 	RunClosedOnDepartures(disableddatesdeparture);

	// 	// });

	// 	RunClosedOnArrival(",");
	// 	RunClosedOnDepartures(",");

	// } else {
	// 	RunClosedOnArrival(",");
	// 	RunClosedOnDepartures(",");
	// }

});


		$(".neo_marketplace_buscador_v3 #PxMkAcion_Search").click(function () {
			$(".neo_marketplace_buscador_v3 .px-mk-generalerror").show();
			if ($(".neo_marketplace_buscador_v3 #MinNights").val() !== 0 && $(".neo_marketplace_buscador_v3 #Nights").val() >= $(".neo_marketplace_buscador_v3 #MinNights").val()) {
				$(".neo_marketplace_buscador_v3 #MinNightsError").hide();
				if ($(".neo_marketplace_buscador_v3 #pxmk_searchform").valid() && CheckChildrens() === 1) {
					var loadingbtntxt = $('.neo_marketplace_buscador_v3 #PxMkAcion_Search').attr("loadingbtntxt") ? $('.neo_marketplace_buscador_v3 #PxMkAcion_Search').attr("loadingbtntxt") : "Buscando";
					$('.neo_marketplace_buscador_v3 #PxMkAcion_Search span').html(loadingbtntxt);
					$(".neo_marketplace_buscador_v3 #PxMkAcion_Search .px-mk-searchicon").addClass('nodisplay');
					$(".neo_marketplace_buscador_v3 #PxMkAcion_Search .px-mk-searchloader").removeClass('nodisplay');
					if ($(".neo_neo_marketplace_list_meta, #mktRoot").length) {
						SubmitForm('.neo_marketplace_buscador_v3 #pxmk_searchform');
					}
					$(".neo_marketplace_buscador_v3 #pxmk_searchform").submit();
					buscando = true;
				} else {
					FnLoadingOFF();
				}
			} else {
				FnLoadingOFF();
				$(".neo_marketplace_buscador_v3 #MinNightsError").show();
			}
		
		
		});

function SubmitForm(elem) {
	$(elem).off("submit");
	$(elem).on("submit", function (e) {
		e.preventDefault();
		var formdata = $(this).serializeArray();
		var serFormData = {};
		$(formdata).each(function (index, obj) {
			serFormData[obj.name] = obj.value;
		});

		var FormEl = elem;
		$(this)
			.find("[name=NextUrl]")
			.val("");
		$(this)
			.find("[name=CheckOutUrl]")
			.val("");
		var ajaxAction = $(this).attr('ajax-action');
		$(this).attr('action', ajaxAction);
		$(this).find("#Lng") .val(LngTk);
		$(this).find("#Tag").val(tagPxsolEngine);
		$(this).find("#Email").val(Email);
		$(this).find("#Currency").val(CurrencyTk);
		$(this).find("#ReturnUrl").val("NoReturn");
		ApiPost(e, $(this), function (Json) {
			if (Json.Response == 1) {
				if (
					$(FormEl).attr("action") == "budget/del_pug" ||
					$(FormEl).attr("action") == "budget/delgroup"
				) {
					ReloadModulo(".container_cargarmodulo");
				} else {
					var urlParams = new URLSearchParams(window.location.search);
					var cartOriginPar = urlParams.get("origin") ? "&origin=" + urlParams.get("origin") : "";

					var budgetCurrency = Json.Currency
						? Json.Currency
						: serFormData.Currency;
					var ReturnUrlQuery =
						"?pos=" +
						Json.Pos +
						"&lng=" +
						Json.Lng +
						"&cur=" +
						budgetCurrency +
						"&SearchID=" +
						Json.SearchID +
						"&tag=" +
						tagPxsolEngine;
					if ($(FormEl).attr("action") == "search/insert") {
						var ListIDString =
							Json.ListID !== "" ? "&ListID=" + Json.ListID : "";
						var LocationString =
							Json.Location !== "" ? "&Location=" + Json.Location : "";
						ReturnUrlQuery +=
							ListIDString +
							LocationString +
							"&search=OK&Email=" +
							Json.Email;
						var ReturnUrl =
							"/neo_marketplace_lp/cart_body.php" + ReturnUrlQuery + cartOriginPar;
					}

					var loaderText = $("#loaderTextDefault").length
						? $("#loaderTextDefault").text() + "..."
						: "Cargando...";
					history.pushState(
						{
							queryString: ReturnUrlQuery
						},
						"",
						ReturnUrlQuery
					);
					CargarModulo(ReturnUrl, loaderText, ".container_cargarmodulo");
					
				}
			}
		});
	});
	//$(elem).submit();
}

function alterPartyGroup(element) {
	try {
	  if (element) {
		if ($(element).is('.neo_button_partyselector')) {
		  let maxAdults = Number($('.PartyTypeSimulator').attr('maxadult'));
		  let maxChilds = Number($('.PartyTypeSimulator').attr('maxchild'));
		  let partyType = $(element).attr('party-type');
		  let valObj = $(`.neo_partyselector_quantity[party-type='${partyType}']`);
		  let currentVal = Number(valObj.attr('val'));
		  if ($(element).attr('action-type') === 'minus') currentVal--;
		  if ($(element).attr('action-type') === 'plus') currentVal++;
		  if (partyType === 'adults') currentVal = Math.max(1,currentVal);
		  if (partyType === 'adults') currentVal = Math.min(maxAdults,currentVal);
		  if (partyType === 'children') currentVal = Math.min(maxChilds,currentVal);
		  if (partyType === 'children') currentVal = Math.max(0,currentVal);
		  if (partyType === 'rooms') currentVal = Math.max(1,currentVal);
		  if (partyType === 'rooms') currentVal = Math.min(20,currentVal);
		  valObj.attr('val', currentVal);
		  valObj.text(currentVal);
		}
	  }
	  let roomsQty = Number($(".neo_partyselector_quantity[party-type='rooms']").attr('val'));
	  let adultsQty = Number($(".neo_partyselector_quantity[party-type='adults']").attr('val'));
	  let childrenQty = Number($(".neo_partyselector_quantity[party-type='children']").attr('val'));
	  let childrensGf = "";
	  if (childrenQty) {
		$('.ChildrenAgesContainer').show();
		if ($(`.ChildrensAgeSelect`).length < childrenQty) {
		  $(`.ChildrensAgeSelect`).last().clone().appendTo('.ChildrensAgesSelectContainer');
		} else if ($(`.ChildrensAgeSelect`).length > childrenQty) {
		  $(`.ChildrensAgeSelect`).last().remove();
		}
		$(`.ChildrensAgeSelect`).each(function(index, el) {
		  $(this).attr('child-id',index);
		})
		for (let i = 0; i < childrenQty; i++) {
		  let childAge = $(`.ChildrensAgeSelect[child-id=${i}]`).val();
		  if (!childAge) childAge = "12";
		  childrensGf += childAge + ".";  
		}
		childrensGf = childrensGf.slice(0, -1);
	  } else {
		$('.ChildrenAgesContainer').hide();
	  }
	  if (!childrensGf) childrensGf = "0";
	  let partyGroup = `${roomsQty}:${adultsQty},${childrensGf},0`;
	  $("#GroupsForm").val(partyGroup);
  
	  $('.txtAdults .numberAdults').text(adultsQty);
	  $('.txtChildren .numberChildren').text(childrenQty);
	  $('.txtRooms .numberRooms').text(roomsQty);
	  adultsQty>1?$(".txtAdults .txtAdultsTxt").text($(".txtAdults .txtAdultsTxt").attr("plural")):$(".txtAdults .txtAdultsTxt").text($(".txtAdults .txtAdultsTxt").attr("singular"));
	  childrenQty>1?$(".txtChildren .txtChildrenTxt").text($(".txtChildren .txtChildrenTxt").attr("plural")):$(".txtChildren .txtChildrenTxt").text($(".txtChildren .txtChildrenTxt").attr("singular"));
	  roomsQty>1?$(".txtRooms .txtRoomsTxt").text($(".txtRooms .txtRoomsTxt").attr("plural")):$(".txtRooms .txtRoomsTxt").text($(".txtRooms .txtRoomsTxt").attr("singular"));
	  childrenQty?$(".txtChildren").css('display','inline'):$(".txtChildren").hide();
  
	} catch (error) {
		console.error('alterPartyGroup Error: ',error);
	}
  }
  
  alterPartyGroup();

/* MARKETPLACE_BUSCADOR_V3 JS.JS END */