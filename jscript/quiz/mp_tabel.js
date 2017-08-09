var runde = 0;
var spm_taeller = 0;
var playing = false;
var player;
var playtime;
var xmlData;

var hojde;
var bredde;
var videoId;
var popudwidth;
var popud_left;
var score = 0;

var timestamp_Array = new Array();

function getXML(xmlLink) {
		
	$.ajax({

		type : "GET",
		url : xmlLink,
		dataType : "xml",
		success : function(xml) {
			xmlData = xml;
			var tal = 1;
			var data = $(xmlData);
			poseQuestion();
		},
		error : function() {
			alert("error loading xml");
		}
	});
}

// 4. The API will call this function when the video player is ready.

function poseQuestion() {
	//////alert("kør den auf!");
	init(runde, spm_taeller);

}

function init(tal, taeller) {
	

	if(spm_taeller == 0) {
		$("#overlay").fadeToggle();
	}
	$('.popud').animate({
		left : -400,
	}, 0, function() {
		$('.popud').animate({
			left : 0,
		}, 550, function() {
			// Animation complete.
		});
	});
	var data = $(xmlData);

	var akt_runde = data.find('runde').eq(tal);

	var spm = akt_runde.find('spm').eq(taeller);

	var spm_length = akt_runde.find('spm').length;

	var tekst = spm.attr('tekst');

	var bol = spm.eq(tal).attr('korrekt');

	var svar_length = spm.find('svar').length;

	var svar = spm.find('svar');

	var options_text = "";

	//var popud_height = 130 + (svar_length * 30);
	//alert (popud_height);

	//$(".popud").css("height", popud_height);

	for(var i = 0; i < svar_length; i++) {
		options_text = options_text + "<img src='img/i_valgt.png' id ='" + i + "'> <span class='imgspan'>" + svar.eq(i).attr("value") + "</span></br>";
	}

	$(".popud").html("<h3>" + tekst + "</h3><form>" + options_text + "</form> <br> <h4> Spørgsmål " + (spm_taeller + 1) + " af " + spm_length + "<br/>Score: " + score + "</h4>");

	$("img").hover(function() {
		$(this).attr("src", "img/valgt.png");
	}, function() {
		$(this).attr("src", "img/i_valgt.png");
	});

	$("img").click(function() {
		var valgt = $(this).attr("id");

		if(valgt == bol) {
			score++;
		}
		spm_taeller++;

		if(spm_taeller < spm_length) {
			init(runde, spm_taeller);
		} else {
			$(".popud").html("<h3>Quizzen slut! </br>Du fik " + score + " rigtige ud af " + spm_taeller + " spørgsmål");
			//</h3> <br> <h4> Spørgsmål " + (spm_taeller + 1) + " af " + spm_length + "<br/>Score: " + score + "</h4>");

		}
	});
}

//var xmlStreng = $('#xmlStreng').text();