Template.maincontent.helpers({
  enrolled: function() {
  	if (Participants.find({_id : Session.get('currentParticipantId')}).count() === 0) {
  		return false;
  	}
  	else{
	    return true;
	}
}
});

Template.thankyou.helpers({
  name: function() {
    return Participants.findOne({_id : Session.get('currentParticipantId')})['firstname'];
  },
	hasComputer: function() {
		return (Participants.findOne({_id : Session.get('currentParticipantId')})['computer'] === 'true');
	}
});