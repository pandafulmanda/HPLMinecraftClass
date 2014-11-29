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
    }
  },
  onSuccess: function(formData, formHandle){
    formHandle && formHandle[0] && formHandle[0].reset && formHandle[0].reset();
    $(".meso-error").text("");
    $(".meso-error").removeClass("meso-error");    
  }
});

Mesosphere({
  name: 'interestForm',
  method: 'enroll',
  template: 'interest',
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
    }
  },
  onSuccess: function(formData, formHandle){
    formHandle && formHandle[0] && formHandle[0].reset && formHandle[0].reset();
    $(".meso-error").text("");
    $(".meso-error").removeClass("meso-error");    
  }
});