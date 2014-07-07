Participants = new Meteor.Collection("participants");
Participants.allow({
  insert : function(){
    return true;
  }
});


Mesosphere({
  name: 'enrollForm',
  method: 'enroll',
  fields: {
    email: {
      required: true,
      format: 'email',
      message: 'Please enter your email so we can keep you updated!'
    },
    firstname: {
      required: true,
      transforms: ["clean", "capitalize"],
      format: "alphanumeric",
      message: "Please check your first name!"
    },
    lastname: {
      required: true,
      transforms: ["clean", "capitalize"],
      format: "alphanumeric",
      message: "Please check your first name!"
    },
    age: {
      required: false,
      format: "integer",
      message : "Please enter a number as age."
    },
    phone: {
      required: true,
      format: "phone",
      message: "Please enter a valid phone number."
    },
    computer: {
      required: true,
      format: "boolean",
      message: "Help us know whether to bring you a computer to borrow!"
    }
  }
});

if (Meteor.isClient) {
  Deps.autorun(function () {
    Meteor.subscribe("participants", Session.get('currentParticipantId'));
  });

  Template.enroll.events({'submit form' : function(event, template) {
    event.preventDefault();
    var data_array = Mesosphere.Utils.getFormData(template.find('form'));
    var data = _.object(_.pluck(data_array, 'name'), _.pluck(data_array, 'value'));

    Mesosphere.enrollForm.validate(data, function(errors, formFieldsObject){
      if(!errors){
        //Do what we need to do here;
        template.find('form').reset();
        Participants.insert(data, function(err, _id){
          if(!err){
            Session.set('currentParticipantId', _id);
          }
          // Meteor.subscribe('participants', Session.get('currentParticipantId'));
        });//, function(err) { /* handle error */ });
        // console.log("count is up to " + Participants.find().count())
      }else{
        // console.log(errors);
      }
    });
  }});

};

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    enroll :function(rawFormData, templateData){
        Mesosphere.enrollForm.validate(rawFormData, function(errors, formFieldsObject){
            if(!errors){
               //Do what we need to do here;
            }
        });
    }
  });

  Meteor.publish("participants", function (id) {
    return Participants.find({_id : id}, {fields: {email: 0, phone: 0, age: 0}});
  });

}
