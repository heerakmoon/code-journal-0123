/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (e) {
  var dataModelJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-local-storage', dataModelJSON);
});
