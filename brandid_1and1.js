var form = document.forms.namedItem("fileinfo");
form.addEventListener('submit', function(ev) {

	console.log(form);
	var oOutput = document.getElementById('text_output'),
	    oData = new FormData(form);

	//oData.append("CustomField", "This is some extra data");

	var oReq = new XMLHttpRequest();
	oReq.open("POST", "https://35.238.24.13/predict", true);
	oReq.onload = function(oEvent) {
	    if (oReq.status == 200) {
		var res_text = JSON.parse(this.responseText);
		console.log(res_text);
		oOutput.innerHTML = "1and1 percent match: " + res_text["1and1_percent"] + "<br><br>" + res_text.results_text + "<br><br>" + res_text.comparison_text;//"Uploaded!";
	    } else {
		oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
	    }
	};

	oReq.send(oData);
	ev.preventDefault();
    }, false);


function readURL(input) {
    if (input.files && input.files[0]) {
	var reader = new FileReader();

	reader.onload = function (e) {
	    $('#blah')
	    .attr('src', e.target.result)
	    .width(250)
	    .height(250);
	};

	reader.readAsDataURL(input.files[0]);
    }
}