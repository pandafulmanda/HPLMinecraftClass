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