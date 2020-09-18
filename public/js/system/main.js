$(document).ready(function ($) {
	"use strict";
	let socket = io();

	$(".langClick").click(function () {
		let val = this.getAttribute("name");
		Cookies.set('lang', val);
		location.reload();
	});
	$("#seciliBayrak").addClass("flag-icon-" + (Cookies.get('lang').toLowerCase() == "en" ? "us" : Cookies.get('lang').toLowerCase()) );
	//Saç Analiz
	socket.on("sacEkim_IletisimTalebi_Insert_Result", (data) => {
		if (data.status) {
			alert(contactSuccess);
		}
		else {
			alert(contactDbError);
		};
	});

	//Analiz
	let analizJSON = {
		gender: "",
		tip: "",
		yas: "",
		ilac: "",
		kronik: "",
		telefon: "",
		ad: "",
		eposta: "",
	};
	const stepManagement = (goTo, prevAndNext) => {
		if (goTo == 2 && prevAndNext == "next") {//1 to 2
			$("#step1").hide();
			$("#headerAnaliz1").show();
			$("#step2").show();
			if (analizJSON["gender"] == "Erkek") {
				$(".dokulmeErkek").show();
				$(".dokulmeKadin").hide();
			}
			else {
				$(".dokulmeErkek").hide();
				$(".dokulmeKadin").show();
			};
		}
		else if (goTo == 1 && prevAndNext == "prev") {
			$("#step2").hide();
			$("#headerAnaliz1").hide();
			$("#step1").show();
		}
		else if (goTo == 3 && prevAndNext == "next") {
			$("#step2").hide();
			$("#headerAnaliz1").hide();
			$("#headerAnaliz2").show();
			$("#prevButtons1").show();
			$("#step3").show();
		}
		else if (goTo == 2 && prevAndNext == "prev") {
			$("#step3").hide();
			$("#headerAnaliz1").show();
			$("#headerAnaliz2").hide();
			$("#prevButtons1").hide();
			$("#step2").show();
		}
		else if (goTo == 4 && prevAndNext == "next") {
			$("#step3").hide();
			$("#headerAnaliz2").hide();
			$("#headerAnaliz3").show();
			$("#prevButtons1").hide();
			$("#prevButtons2").show();
			$("#ilacEvet").hide();
			$("#ilacInputEvet").hide();
			$("#step4").show();
		}
		else if (goTo == 3 && prevAndNext == "prev") {
			$("#step4").hide();
			$("#headerAnaliz2").show();
			$("#headerAnaliz3").hide();
			$("#prevButtons1").show();
			$("#prevButtons2").hide();
			$("#step3").show();
		}
		else if (goTo == 5 && prevAndNext == "next") {
			$("#step4").hide();
			$("#headerAnaliz3").hide();
			$("#prevButtons2").hide();
			$("#prevButtons3").show();
			$("#headerAnaliz4").show();
			$("#step5").show();
		}
		else if (goTo == 5 && prevAndNext == "next") {
			$("#step4").hide();
			$("#headerAnaliz3").hide();
			$("#prevButtons2").hide();
			$("#prevButtons3").show();
			$("#headerAnaliz4").show();
			$("#step5").show();
		}
		else if (goTo == 4 && prevAndNext == "prev") {
			$("#step5").hide();
			$("#headerAnaliz4").hide();
			$("#prevButtons3").hide();
			$("#prevButtons2").show();
			$("#headerAnaliz3").show();
			$("#step4").show();
		}
		else if (goTo == 6 && prevAndNext == "next") {
			$("#step5").hide();
			$("#headerAnaliz4").hide();
			$("#prevButtons3").hide();
			$("#prevButtons4").show();
			$("#headerAnaliz5").show();
			$("#step6").show();
		}
		else if (goTo == 5 && prevAndNext == "prev") {
			$("#step6").hide();
			$("#headerAnaliz4").show();
			$("#prevButtons3").show();
			$("#prevButtons4").hide();
			$("#headerAnaliz5").hide();
			$("#step5").show();
		}
		else if (goTo == 7 && prevAndNext == "next") {
			$("#step6").hide();
			$("#prevButtons4").hide();
			$("#headerAnaliz5").hide();
			$("#headerAnaliz6").show();
			$("#step7").show();
		}
	};
	$("#hideShowAnaliz").click(() => {
		$("#analiz").hide();
		$(".analizHeader2").show();
		Cookies.set("cookieClose", "off");
	});
	$(".analizHeader2").click(() => {
		$(".analizHeader2").hide();
		$("#analiz").show();
		Cookies.set("cookieClose", "on");
	});
	$(".genderMale").click(() => {
		analizJSON.gender = "Erkek";
		stepManagement(2, "next");
	});
	$(".genderWoman").click(() => {
		analizJSON.gender = "Bayan";
		stepManagement(2, "next");
	});
	$(".prevBtn").click(function () {
		let elemName = $(this).attr("name");
		if (elemName == "goTo1") {
			stepManagement(1, "prev");
		}
		else if (elemName == "goTo4") {
			stepManagement(4, "prev");
		}
		else if (elemName == "goTo5") {
			stepManagement(5, "prev");
		}
	});
	$("#notSureBtn").click(() => {
		analizJSON.tip = "Emin Değil";
		stepManagement(3, "next");
	});
	$(".selectTip").click(function () {
		let tip = $(this).attr("src");
		analizJSON.tip = tip;
		stepManagement(3, "next");
	});
	$("#prevButtons1").click(() => {
		stepManagement(2, "prev");
	});
	$(".yasBtn").click(function () {
		analizJSON.yas = $(this).text();
		stepManagement(4, "next");
	});
	$("#prevButtons2").click(() => {
		stepManagement(3, "prev");
	});
	$("#ilacEvet").keyup(() => {
		$("#ilacEvet").css("box-shadow", "0px 0px 6px 1px #6c757d");
		$("#ilacEvet").css("border", "1px solid white");
	});
	$("#ilacEvetBtn").click(() => {
		$("#ilacEvet").show();
		$("#ilacInputEvet").show();
	});
	$("#ilacHayirBtn").click(() => {
		analizJSON.ilac = "Hayır";
		stepManagement(5, "next");
	});
	$("#ilacInputEvet").click(() => {
		let len = $("#ilacEvet").val().length;
		if (len > 0 && len <= 100) {
			analizJSON.ilac = $("#ilacEvet").val();
			stepManagement(5, "next");
		}
		else {
			$("#ilacEvet").css("border", "1px solid #C0392B");
		}
	});
	$(".yasBtn2").click(function () {
		analizJSON.kronik = $(this).text();
		stepManagement(6, "next");
	});
	$("#phoneInput").keyup(() => {
		$("#phoneInput").css("border", "1px solid #CACFD2");
	});
	$("#analizInputNameSurname").keyup(() => {
		$("#analizInputNameSurname").css("border", "1px solid #CACFD2");
	});
	$("#analizInputMail").keyup(() => {
		$("#analizInputMail").css("border", "1px solid #CACFD2");
	});
	$("#completeBtn").click(() => {
		let nameLen = $("#analizInputNameSurname").val().length;
		let mailLen = $("#analizInputMail").val().length;
		if ($("#phoneInput").val() < 7) {
			$("#phoneInput").css("border", "1px solid #C0392B");
		}
		else if (nameLen == 0 || nameLen > 100) {
			$("#analizInputNameSurname").css("border", "1px solid #C0392B");
		}
		else if (mailLen == 0 || mailLen > 100) {
			$("#analizInputMail").css("border", "1px solid #C0392B");
		}
		else {
			analizJSON.telefon = $("#phoneInput").val();
			analizJSON.ad = $("#analizInputNameSurname").val();
			analizJSON.eposta = $("#analizInputMail").val();
			stepManagement(7, "next");
			Cookies.set("analiz", true, { expires: 3600 * 24 });
			Cookies.set("cookieClose", true);
			socket.emit("sacEkim_SacAnalizTalebi_Insert", {
				json: analizJSON
			});;
		};
	});
	$("#closeBtn").click(() => {
		$("#analiz").hide();
		$(".analizHeader2").show();
		Cookies.set("cookieClose", "off");
	});
	$("#homeIndexHairAnalysisFree").click(() => {
		$("#analiz").show();
		$(".analizHeader2").hide();
	});
	let analizCookie = Cookies.get("analiz");
	let cookieClose = Cookies.get("cookieClose");
	if (analizCookie == "true") {
		$("#step1").hide();
		$("#headerAnaliz1").hide();
		$("#headerAnaliz6").show();
		$("#step7").show();
	};
	if (cookieClose == "off") {
		$("#analiz").hide();
		$(".analizHeader2").show();
	}
	else {
		if (cookieClose != undefined) {
			$("#analiz").show();
			$(".analizHeader2").hide();
		}
	};
	// END Analiz

	// İletişim
	$("#contactInfoBtn").click(() => {
		let ctrlContact = Cookies.get('contact');
		let name = $("#contactNameInput").val();
		let mail = $("#contactTelInput").val();
		if (name.length < 155 && name.length > 3) {
			if (mail.length < 255 && mail.length > 5) {
				if (!ctrlContact) {
					Cookies.set('contact', true, { expires: 3600 * 24 }); // Expires in 10 minutes
					socket.emit('sacEkim_IletisimTalebi_Insert', {
						name,
						mail,
					});
				}
				else {
					alert(contactLimitErr);
				}
			}
			else {
				$("#contactTelInput").focus();
			}
		}
		else {
			$("#contactNameInput").focus();
			//
		};
	});
	$(".contactInputs").keyup(function () {
		let len = $(this).val().length;
		if (len > 4) {
			$(this).css("border", "1px solid #CACFD2")
		}
	});
	// navigation
	var OnePageNav = function () {
		$(".navigators[href^='#']").on('click', function (e) {
			e.preventDefault();
			var hash = this.hash,
				navToggler = $('.navbar-toggler');
			$('html, body').animate({

				scrollTop: $(hash).offset().top
			}, 700, 'easeInOutExpo', function () {
				window.location.hash = hash;
			});

			if (navToggler.is(':visible')) {
				navToggler.click();
			}
		});
	};
	OnePageNav();
});





