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

Template.thankyou.helpers({
  name: function() {
    return Participants.findOne({_id : Session.get('currentParticipantId')})['firstname'];
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