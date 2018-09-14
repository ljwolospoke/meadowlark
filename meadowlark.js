var express = require("express");

var app = express();

var fortunes = [
	"conquer your fears or they will conquer you.",
	"River need springs.",
	"Do not fear what you don't know.",
	"you will have a pleasant suprise.",
	"whenever possible, keep it simple.",
];
var handlebars = require ("express-handlebars").create({ defaultLayout: "main" });
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 3001);

console.log(app.get("port"));

app.get('/', function(req, res){
	res.render("home");
	// res.type('text/plain');
	// res.send('Meadowlark Travel');
});
app.get('/about', function(req, res){
	var randomFortune =
		fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', {fortune: randomFortune });
	//res.type('text/plain');
	//res.send('About Meadowlark Travel');
});

app.get("/datetime", function(req, res) {
 res.render("datetime", { datetime: new Date().toString() });
});

//static pages
 app.use(express.static(__dirname + "/public"));

//custom 404 page
app.use(function(req, res, next) {
 res.status(404);
 res.render('500');
});

// custom 500 page
app.use(function(err, req, res, next) {
 console.error(err.stack);
 res.status(500);
 res.render('500');
});

app.listen(app.get("port"), function() {
console.log("Express started on http: localhost: " + app.get("port") + ": press Ctrl-C to terminate.");
});
