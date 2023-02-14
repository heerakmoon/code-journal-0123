var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $photoUrl = document.querySelector('#url');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $ul = document.querySelector('ul');
var $body = document.querySelector('body');

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

  var newEntry = renderEntry(formObj);
  $ul.prepend(newEntry);
  viewSwap('entries');
  toggleNoEntries();
});

function renderEntry(entry) {
  var $li = document.createElement('li');

  var $rowDiv = document.createElement('div');
  $rowDiv.className = 'row';
  $li.appendChild($rowDiv);

  var $leftHalfDiv = document.createElement('div');
  $leftHalfDiv.className = 'column-half padding-r-12';
  $rowDiv.appendChild($leftHalfDiv);

  var $liImg = document.createElement('img');
  $liImg.setAttribute('src', entry.photoUrl);
  $leftHalfDiv.appendChild($liImg);

  var $rightHalfDiv = document.createElement('div');
  $rightHalfDiv.className = 'column-half padding-l-12';
  $rowDiv.appendChild($rightHalfDiv);

  var $liTitle = document.createElement('h2');
  $liTitle.textContent = entry.title;
  $rightHalfDiv.appendChild($liTitle);

  var $liNotes = document.createElement('p');
  $liNotes.textContent = entry.notes;
  $rightHalfDiv.appendChild($liNotes);

  return $li;
}

document.addEventListener('DOMContentLoaded', function (e) {
  for (var i = 0; i < data.entries.length; i++) {
    var itemInEntries = renderEntry(data.entries[i]);
    $ul.appendChild(itemInEntries);
  }
  viewSwap(data.view);
  toggleNoEntries();
});

var $noEntries = document.querySelector('#no-entries');

function toggleNoEntries() {
  if (data.entries !== null) {
    $noEntries.className = 'hidden';
  } else {
    $noEntries.className = '';
  }
}

var $entryForm = document.querySelector('#entry-form');
var $entries = document.querySelector('#entries');

function viewSwap(viewName) {
  if (viewName === 'entry-form') {
    $entryForm.className = '';
    $entries.className = 'hidden';
    data.view = 'entry-form';
  } else if (viewName === 'entries') {
    $entryForm.className = 'hidden';
    $entries.className = '';
    data.view = 'entries';
  }
}

var $entriesAnchor = document.querySelector('#entries-anchor');
var $newButton = document.querySelector('#new-button');

$body.addEventListener('click', function (event) {
  if (event.target === $entriesAnchor) {
    viewSwap('entries');
  } else if (event.target === $newButton) {
    viewSwap('entry-form');
  }
});
