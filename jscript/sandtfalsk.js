//alert("hej");
var i = 0;
var xmlData;

$.ajax({

	type : "GET",
	url : "sandt.xml",
	dataType : "xml",
	success : function(xml) {
		//alert("loaded");
		xmlData = xml;
		var tal = Math.round(Math.random() * 16);
		init(tal);

	},
	error : function() {
		//alert("error loading xml");
	}
});

function init(tal) {

	//alert("hej" + xmlData);
	var data = $(xmlData);
	var tekst = data.find('spm').eq(tal).attr('tekst');
	var svar = data.find('spm').eq(tal).attr('svar');
	var feedback_sandt = data.find('spm').eq(tal).attr('feedback_sandt').split('(Kilde:')[0];
	var feedback_falsk = data.find('spm').eq(tal).attr('feedback_falsk').split('(Kilde:')[0];
	var kilde = data.find('spm').eq(tal).attr('feedback_sandt').split('(Kilde:')[1];

	var kildehtml = "<br/><br/><em>(Kilde: " + kilde + "</em>"
	//alert(lines);

	$("#spm").html("'" + tekst + "' <br/><hr>");
	$('#spm').animate({
		opacity : 0,
	}, 0, function() {
		$('#spm').animate({
			opacity : 1,
		}, 500, function() {
		});
		//alert($('body').css('height'));
	});

	$(".knap").click(function() {
		brugerClick(this.id);

		$(".knap").off();
		$("#knapper").css("opacity", "0.5");
		$(".knap").css("cursor", "no-drop");

		//$("#knapper").html("<hr>Du svarede at udsagnet var " + this.id + "<hr>");
		//$(this).css

	});
	function brugerClick(valg) {
		$('#feedback').animate({
			opacity : 0,
		}, 0, function() {
			$('#feedback').animate({
				opacity : 1,
			}, 500, function() {
			});
		});
		if(valg == "sandt") {
			//alert(feedback_sandt);
			if(svar == "true") {
				$("#feedback").html("<hr><p style='color:#4b865c'>Dit svar er korrekt: </p> <b>" + feedback_sandt + "</b>" + kildehtml);
							} else {
				$("#feedback").html("<hr><p style='color:#ef5b5b'>Dit svar er forkert: </p> <b>" + feedback_sandt + "</b>" + kildehtml);
			}
		} else {

			if(svar == "false") {
				$("#feedback").html("<hr><p style='color:#4b865c'>Dit svar er korrekt: </p><b>" + feedback_falsk + "</b>" + kildehtml);
			} else {
				$("#feedback").html("<hr><p style='color:#ef5b5b'>Dit svar er forkert: </p><b>" + feedback_falsk + "</b>" + kildehtml);
			}

		}
	}


	$(".knap").hover(function() {

		//$(this).src = 'img/valgt.png';
		//$(this).html("src","img/valgt.png");
		$(this).attr("src", "img/valgt.png");
	}, function() {
		$(this).attr("src", "img/i_valgt.png");
	});
}