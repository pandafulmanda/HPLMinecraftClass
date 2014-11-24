Participants = new Meteor.Collection("participants");
// ParticipantsCounts = new Meteor.Collection("participants_counts");
Participants.allow({
  insert : function(){
    return true;
  }
});


Mesosphere({
  name: 'enrollForm',
  method: 'enroll',
  template: 'enroll',
  fields: {
    email: {
      required: true,
      format: 'email',
      message: 'Please enter your email so we can keep you updated!'
    },
    firstname: {
      required: false,
      transforms: ["clean", "capitalize"],
      format: "alphanumeric",
      message: "Please check your first name!"
    },
    lastname: {
      required: false,
      transforms: ["clean", "capitalize"],
      format: "alphanumeric",
      message: "Please check your first name!"
    },
    age: {
      required: false,
      format: "integer",
      message : "Please enter a number as age."
    }
  }
});

if (Meteor.isClient) {
  Deps.autorun(function () {
    Meteor.subscribe("participants", Session.get('currentParticipantId'));
  });
  // Meteor.subscribe("participants_counts");

  Template.enroll.events({'submit form' : function(event, template) {
    event.preventDefault();
    var data_array = Mesosphere.Utils.getFormData(template.find('form'));
    var data = _.object(_.pluck(data_array, 'name'), _.pluck(data_array, 'value'));

    Mesosphere.enrollForm.validate(data, function(errors, formFieldsObject){
      if(!errors){
        //Do what we need to do here;
        // template.find('form').reset();
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


  // Meteor.publish("participants_counts", function(){
  //     var uuid = Meteor.uuid()
  //     var self = this;

  //     var unthrottled_setCount = function(){
  //         cnt = Participants.find({}).count()
  //         self.set("participants_counts", uuid, {count: cnt})
  //         self.flush()
  //     }

  //     var setCount = _.throttle(unthrottled_setCount, 50)

  //     var handle = Meteor._InvalidationCrossbar.listen({collection: "participants"}, function(notification, complete){
  //         setCount();
  //         complete();
  //     })

  //     setCount();
  //     self.complete()
  //     self.flush()

  //     self.onStop(function(){
  //         handle.stop();
  //         self.unset("participants_counts", uuid, ["count"]);
  //         self.flush();
  //     });
  // });


}
