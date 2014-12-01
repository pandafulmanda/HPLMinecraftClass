Template.interest.events({'submit form' : function(event, template) {
  event.preventDefault();
  var data_array = Mesosphere.Utils.getFormData(template.find('form'));
  var data = _.object(_.pluck(data_array, 'name'), _.pluck(data_array, 'value'));

  Mesosphere.interestForm.validate(data, function(errors, formFieldsObject){
    if(!errors){
      //Do what we need to do here;
      Participants.insert(data, function(err, _id){
        if(!err){
          Session.set('currentParticipantId', _id);
        }
      });//, function(err) { /* handle error */ });
      // console.log("count is up to " + Participants.find().count())
    }else{
      // console.log(errors);
    }
  });
}});