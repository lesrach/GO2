require.config({
	baseUrl: "/",
	paths: {
		"jquery" : "js/lib/jquery/jquery-1.12.4.min",
		"cookie" : "js/lib/jquery_plugins/jquery.cookie",
		"fly" : "js/lib/jquery_plugins/jquery.fly.min",
		"zoom" : "js/lib/jquery_plugins/jquery.elevateZoom-2.2.3.min",
		"template" : "js/lib/arttemplate/template-native",
		"animate": "js/lib/animate"
	},
	shim:{
		"fly" : {
			deps : ["jquery"]
		},
		"zoom" : {
			deps : ["jquery"]
		},
		"animate" : {
			deps : ["jquery"]
		}
	}
});