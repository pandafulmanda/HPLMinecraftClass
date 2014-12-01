Template.thankyou.helpers({
  name: function() {
    return Participants.findOne({_id : Session.get('currentParticipantId')})['firstname'];
  },
  classes: function(){
    var classes = Participants.findOne({_id : Session.get('currentParticipantId')})['classes'],
      classDates = {
        beginner: '13th',
        advanced: '15th'
      },
      dates = [],
      seeYouString = '';

    _.each(classes, function(classType){
      dates.push(classDates[classType]);
    });

    seeYouString = "December " + dates.join(" and ") + " at 1 PM";

    return seeYouString;
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