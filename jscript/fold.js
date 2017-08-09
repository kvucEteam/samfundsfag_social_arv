$(window).load(function(){
var orig_height = new Array();

formater_begreber(0, 100);

$(".begreb").click(function(index) {

    var index = $(this).index();
    var valgt = index;
    formater_begreber(valgt, 100);

});

function formater_begreber(valgt, time) {

    $(".begreb").each(function(index) {
        var begreb = $(this);
        var content = begreb.find(".content");
        //alert (content);

        // find højde og stop ind i array:
        begreb_h = begreb.height();
        orig_height.push(begreb_h);
        //alert (orig_height);      
        if (valgt != index) {
            content.hide();
            
            //begreb.css("border", "3px solid blue");
            content.animate({
                //opacity: 0.25,
                //left: '+=50',
                height: '10px'
            }, time, function() {
                
                //begreb.find('p','ul').hide();
            });
            //
        } else if (valgt == index) {
            content.show();
            hojde = orig_height[valgt] - 40;
            //begreb.find('p','ul').show();
            //alert (hojde);
            //begreb.css("border", "3px solid red");
            content.animate({
                //opacity: 0.25,
                //left: '+=50',
                height: hojde + 'px'

            }, time, function() {

                
                // Animation complete.
            });
            //
        }
    });
}
});