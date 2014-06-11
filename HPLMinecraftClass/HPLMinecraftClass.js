Participants = new Meteor.Collection("participants");

if (Meteor.isClient) {

Template.foo.events({'submit form' : function(event, template) {
    event.preventDefault();

    firstname = template.find("input[name=firstname]");
    lastname = template.find("input[name=lastname]");   
    email = template.find("input[name=email]");

    // Do form validation

    var data = {
      firstname: firstname.value,
      lastname: lastname.value,
      age: age.value,
      email: email.value
    };

    email.value="";
    firstname.value="";
    lastname.value="";

    Participants.insert(data);//, function(err) { /* handle error */ });
    console.log("count is up to " + Participants.find().count())

}});

  };

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
