




var user_names = ['amandacarola', 'andreadenver3', 'barbaraamerigo', 'betsyalvarezz', 'carlydiamondstone', 'casidavis', 'deedeefbaby', 'jennleezy', 'kamrydalia_', 'lifeofamandariley', 'lisa_alli', 'mckenziepaigesanders', 'nevenatepic', 'nickygile', 'oliviapw', 'priricart', 'sabikontor', 'vanessachristinex'];


for(var i=0; i< user_names.length;i++)
    {
	//creates option tag
	jQuery('<option/>', {
		value: user_names[i],
		    html: user_names[i]
		    }).appendTo('#dropdown select'); //appends to select if parent div has id dropdown
    }




for(var i=0; i< user_names.length;i++)
    {
	//creates option tag
	jQuery('<div/>', {
		    id: user_names[i]+'sim',
		    class: "content"
		    }).appendTo('#sim'); //appends to select if parent div has id dropdown

	jQuery('<div/>', {
		    id: user_names[i]+'dissim',
		    class: "content"
		    }).appendTo('#dissim'); //appends to select if parent div has id dropdown
    }


$('#dd').ready( function() {
	for(var i = 0;i<user_names.length;i++){
	    //console.log($(user_names[i]));
	    $('#'+user_names[i]+'sim').hide();
	    $('#'+user_names[i]+'dissim').hide();
	}
    });



console.log(dissimImgNames.length, simImgNames.length, user_names.length);
$('#dd').on('change', function() {
	var i = $(this).val();

	$('#'+i+'sim').show().siblings().hide();
	$('#'+i+'dissim').show().siblings().hide();

	
	var $simdiv = $('#'+i+'sim');
	var $dissimdiv = $('#'+i+'dissim');

	$simdiv.html("<h4> Most Consistent </h4>");

	$.each(simImgNames[user_names.indexOf(i)], function(i, val) {
	
		$("<img />").attr("src", val).appendTo($simdiv);
		$("<br><br>").appendTo($simdiv);
	    });

	
	$dissimdiv.html("<h4> Least Consistent </h4>");
	$.each(dissimImgNames[user_names.indexOf(i)], function(i, val) {
		console.log(val);
		$("<img />").attr("src", val).appendTo($dissimdiv);
		$("<br><br>").appendTo($dissimdiv);
	    });
    });