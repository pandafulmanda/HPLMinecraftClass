Template.maincontent.helpers({
  enrolled: function() {
  	if (Participants.find({_id : Session.get('currentParticipantId')}).count() === 0) {
  		return false;
  	}else{
	    return true;
    }
	}
  // ,
  // waitlist: function(){
  //   var cnt = ParticipantsCounts.findOne({});
  //   if(cnt > 2) {
  //       return true;
  //   } else {
  //       return false;
  //   }
  // }
});