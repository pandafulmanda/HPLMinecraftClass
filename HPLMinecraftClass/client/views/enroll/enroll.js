Template.enroll.events({'submit form' : function(event, template) {
  event.preventDefault();
  var data_array = Mesosphere.Utils.getFormData(template.find('form'));
  var data = {};

  // format the data from the form correctly
  _(data_array).each(function(data_obj){
    if(data_obj.name === 'class'){
      data[data_obj.name] = data[data_obj.name] || [];
      data[data_obj.name].push(data_obj.value);
    }else{
      data[data_obj.name] = data_obj.value;
    }
  });

  Mesosphere.enrollForm.validate(data, function(errors, formFieldsObject){
    if(!errors){
      //Do what we need to do here;
      Participants.insert(data, function(err, _id){
        if(!err){
          Session.set('currentParticipantId', _id);
        }
      });//, function(err) { /* handle error */ });
      // console.log("count is up to " + Participants.find().count())
    }
  });
}});