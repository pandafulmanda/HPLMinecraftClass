Participants = new Meteor.Collection("participants");
// ParticipantsCounts = new Meteor.Collection("participants_counts");
Participants.allow({
  insert : function(){
    return true;
  }
});


Router.route('/', function () {
  this.redirect('/minecraft-classes');
});


Router.route('/minecraft-classes', function () {
  this.render('minecraft-classes', {
    data: function () {
      return;
    }
  });
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
      message: "Please enter your first name!"
    },
    lastname: {
      required: true,
      transforms: ["clean", "capitalize"],
      format: "alphanumeric",
      message: "Please enter your last name!"
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
    'classes': {
      required: true,
      message: 'Please click to attend at least one class.'
    }
  },
  onSuccess: function(formData, formHandle){
    // formHandle && formHandle[0] && formHandle[0].reset && formHandle[0].reset();
    $(".meso-error").text("");
    $(".meso-error").removeClass("meso-error");
    return;
  },
  onFailure: function(erroredFields, formHandle){
    mesoFail.call(this, erroredFields, formHandle);
  },
  disableSubmit: true
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
      message: "Please enter your first name!"
    },
    lastname: {
      required: true,
      transforms: ["clean", "capitalize"],
      format: "alphanumeric",
      message: "Please enter your last name!"
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


function mesoFail(erroredFields, formHandle){
  var mesoFormFields = this.fields;

  _.each(erroredFields, function(field, fieldName){
    if(mesoFormFields[fieldName] && mesoFormFields[fieldName].message){
      field.message = mesoFormFields[fieldName].message;
    }
  });

  Mesosphere.Utils.failureCallback(erroredFields, formHandle);
}