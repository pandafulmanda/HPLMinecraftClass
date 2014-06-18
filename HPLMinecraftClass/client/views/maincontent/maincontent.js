Template.maincontent.helpers({
  enrolled: function() {
  	if (Participants.find().count() === 0) {
  		return false;
  	}
  	else{
	    return true;
	}
}
});

Template.thankyou.helpers({
	name: function() {
		return Participants.findOne()['firstname'];
	}
});