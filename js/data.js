/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var modelsInJSON = localStorage.getItem('code-journal-local-storage');

window.addEventListener('beforeunload', function (e) {
  var dataModelJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-local-storage', dataModelJSON);
});

if (modelsInJSON !== null) {
  data = JSON.parse(modelsInJSON);
}
