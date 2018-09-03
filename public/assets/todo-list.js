$(document).ready(function(){
	$("form button").click(function() {
		var itemval = $("form input[name='item']").val();
		var sendData = { item: itemval };
		$.ajax({
			type: "POST",
			url: "/todo",
			data: sendData,
			success: function(data){
				location.reload();
			}
		});
		return false;
	});
	$("li").click(function() {
		var item = $(this).text().replace(/ /g, "-");
		$.ajax({
			type: "DELETE",
			url: "/todo/" + item,
			success: function(response) {
				location.reload();
			}
		});
	}); 
});