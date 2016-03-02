console.log('hello world')



// store some global variables

var Model = function(inputURL,inputKey) {
	this.baseURL = inputURL
	this.key = inputKey
	this.data = null

	// this.fetch = function(query) {
	// 	var fullURL = this.baseURL + "api-key=" + this.key + "&q=" + query
	// 	var promise = $.getJSON(fullURL)

	// 	var handleResponse = function(rawData) {
	// 		console.log(rawData)
	// 		this.data = this.parse(rawData)
	// 	}

	// 	var boundResponder = handleResponse.bind(this)
	// 	promise.then(boundResponder)
	// }	

	this.parse = function(rawness) {
		var parsedData = rawness.response.docs
		return parsedData
	}
}

var View = function(where,inputModel) {

	this.container = where
	this.model = inputModel

	this.writeData = function(data) {
		this.container.innerHTML = data
	}

	this.listenForChange = function() {
		if (this.model.data === null) {
			setTimeout(this.listenForChange.bind(this),1000)
		}
		else {
			var oneHeadline = this.model.data[0].lead_paragraph
			this.writeData(oneHeadline)
		}
	}
}


var key = "11eaa2ee2ebb78f1cfb25971ad39c74d:6:60564213"
var baseURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?"
var headlineContainer = document.querySelector("#headlineContainer")

var timesModel = new Model(baseURL,key)
timesModel.fetch('drumpf')

var timesView = new View(headlineContainer,timesModel)
timesView.listenForChange()
