module.exports = {
  // GET
  "GET /list": function(req, res, next){
	// response json format
    res.send({
      title: "title changed",
      content: "tow post hahahah"
    })
  },
}
