var friends = require("../data/friends");

module.exports = function(app){


  app.get("/api/friends", function(req, res){
    res.json(friends);
  });

  //return the best match, while adding the user submission to friends
  app.post("/api/friends", function(req, res){
    friends.push(req.body);
    var bestMatch = 0;
    var bestMatchNum = 100;
    var matchNum = 0;
    var length = friends.length;
    var something= req.body.scores[0];
    var somethingelse = something -3;


    for(var i = 0; i < length-1; i++){
      matchNum = 0;
      for(var j = 0; j < friends[i].scores.length; j++){
        matchNum += Math.abs(parseInt(req.body.scores[j])-parseInt(friends[i].scores[j]));
        //matchNum += Math.abs(parseInt(friends[length].scores[j]);
        //matchNum +=Math.abs(parseInt(friends[length].scores[j])-parseInt(friends[i].scores[j]));
      }
      if(matchNum<bestMatchNum){
        bestMatch = i;
        bestMatchNum = matchNum;
      }
    }

    res.json(friends[bestMatch]);
  });

};
