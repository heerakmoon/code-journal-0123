var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $photoUrl = document.querySelector('#url');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');

$photoUrl.addEventListener('input', function (e) {
  $img.setAttribute('src', $photoUrl.value);
});

$form.addEventListener('submit', function (e) {
  event.preventDefault();
  var formObj = {
    title: $title.value,
    photoUrl: $photoUrl.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(formObj);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
