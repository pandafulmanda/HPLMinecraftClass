Deps.autorun(function () {
  Meteor.subscribe("participants", Session.get('currentParticipantId'));
});
// Meteor.subscribe("participants_counts");