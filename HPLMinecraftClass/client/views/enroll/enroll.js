var watchedInputs = [];

Template.enroll.events({
  'submit form' : function(event, template) {
    event.preventDefault();

    var formInfo = formatTemplateFormData(template);

    Mesosphere.enrollForm.validate(formInfo.data, function(errors, formFieldsObject){
      if(!errors){
        watchedInputs = [];
        //Do what we need to do here;
        Participants.insert(formInfo.data, function(err, _id){
          if(!err){
            Session.set('currentParticipantId', _id);
          }
        });//, function(err) { /* handle error */ });
        // console.log("count is up to " + Participants.find().count())
      } else {
        watchedInputs = _.keys(errors);
        Mesosphere.Utils.failureCallback(errors, formInfo.$form);
        $.scrollTo($(formInfo.$form.find('.meso-error')[0]).parents('.form-group'), 100);
      }
    });
  },
  'blur input[type=text], keyup input[type=text], change input[type=checkbox]' : validateInputs
});

Template.enroll.rendered = function(){
  $("input[data-vm-mask-phone]").mask("(999) 999-9999");

  $("input[name=classes]").change(function(){
    var $input = $(this),
      isClassChecked = $input.is(':checked'),
      $li = $input.parents('li');

    if(isClassChecked){
      $li.addClass('active');
    }else{
      $li.removeClass('active');
    }

  });

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
    $target = $(event.currentTarget),
    targetName = $target.attr('name');

  // if target isn't being watched yet
  if(_.indexOf(watchedInputs, targetName) < 0){

    if(event.type === 'keyup'){
      // don't need to validate input on keyup yet since this input hasn't been blurred or changed yet
      return;
    }

    // add target to list of inputs to watch
    watchedInputs.push(targetName);    
  }

  Mesosphere.enrollForm.validate(formInfo.data, function(errors, formFieldsObject){
    var inputError;

    if(errors){
      inputError = _.pick(errors, watchedInputs);
      Mesosphere.Utils.failureCallback(inputError, formInfo.$form);
    }else{
      return;
    }
  });

}