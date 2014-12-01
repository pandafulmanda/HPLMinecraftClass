var blurredInputs = [];

Template.enroll.events({
  'submit form' : function(event, template) {
    event.preventDefault();

    var formInfo = formatTemplateFormData(template);

    Mesosphere.enrollForm.validate(formInfo.data, function(errors, formFieldsObject){
      if(!errors){
        blurredInputs = [];
        //Do what we need to do here;
        Participants.insert(formInfo.data, function(err, _id){
          if(!err){
            Session.set('currentParticipantId', _id);
          }
        });//, function(err) { /* handle error */ });
        // console.log("count is up to " + Participants.find().count())
      } else {
        blurredInputs = _.keys(errors);
        Mesosphere.Utils.failureCallback(errors, formInfo.$form);
        $.scrollTo($(formInfo.$form.find('.meso-error')[0]).parents('.form-group'), 100);
      }
    });
  },
  'blur input' : validateInputs,
  'keydown input' : validateInputs,
  'change input' : validateInputs
});

Template.enroll.rendered = function(){
  $("input[data-vm-mask-phone]").mask("(999) 999-9999");
}

function formatTemplateFormData(template){

  var $form = $(template.find('form')),
    data_array = Mesosphere.Utils.getFormData($form),
    data = {};

  // format the data from the form correctly
  _(data_array).each(function(data_obj){
    if(data_obj.name === 'classes'){
      data[data_obj.name] = data[data_obj.name] || [];
      data[data_obj.name].push(data_obj.value);
    }else{
      data[data_obj.name] = data_obj.value;
    }
  });

  return {
    '$form' : $form,
    'data' : data
  };
}

function validateInputs(event, template){

  var formInfo = formatTemplateFormData(template),
    $target = $(event.currentTarget);

  blurredInputs.push($target.attr('name'));

  Mesosphere.enrollForm.validate(formInfo.data, function(errors, formFieldsObject){
    var inputError;

    if(errors){
      inputError = _.pick(errors, blurredInputs);
      Mesosphere.Utils.failureCallback(inputError, formInfo.$form);
    }
  });

}