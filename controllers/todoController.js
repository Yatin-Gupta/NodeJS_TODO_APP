var data = [
	{
		item: "A"
	},
	{
		item: "B"
	},
	{
		item: "C"
	}
];

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://todos:todos12345@ds141932.mlab.com:41932/itemslist');

// create a schema - as blue print

var todoSchema = new mongoose.Schema({
	item: "String"
});

var Todo = mongoose.model('Todo', todoSchema);

/*var itemOne = Todo({
	item: 'Buy someting'
}).save(function(err) {
	if (err) throw err;
	console.log("Item Saved");
});*/

module.exports = function(app, bodyParser) { // app variable is express app variable

	// Defining routes for application
	app.get("/todo", function(request, response) {
		Todo.find({}, function(err, data) {
			if (err) throw err;
			response.render("todo", {
				todos:data
			});
		});
	});

	app.post("/todo", urlencodedParser, function(request, response) {
		var postData = request.body;
		var newTodo = Todo(postData).save(function(err, data){
			if(err) throw err;
			response.json(data);
		});
	});

	app.delete("/todo/:item", function(request, response) {
		var item = request.params.item.replace(/-/g, " ");
		Todo.find({
			item: item
		}).remove(function(err, data) {
			response.json(data);
		});
		/*data = data.filter(function(value, index) {
			if (value.item !== item) {
				return value;
			} 
		});*/
	});

};