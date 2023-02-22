var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $photoUrl = document.querySelector('#url');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $ul = document.querySelector('ul');
var $body = document.querySelector('body');
var $h1 = document.querySelector('h1');
var $delete = document.querySelector('#delete');
var $buttonRow = document.querySelector('#button-row');
var $modal = document.querySelector('#modal');

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

  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(formObj);

    var newEntry = renderEntry(formObj);
    $ul.prepend(newEntry);

  } else if (data.editing !== null) {
    formObj.entryId = data.editing.entryId;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === formObj.entryId) {
        data.entries[i] = formObj;
      }
    }
    var editedObj = renderEntry(formObj);
    var $originalLi = document.getElementById(data.editing.entryId);

    $originalLi.replaceWith(editedObj);

    $h1.textContent = 'New Entry';
    $buttonRow.className = 'margin-20 align-items-center row button-right';
    $delete.className = 'hidden';
    data.editing = null;
  }
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  viewSwap('entries');
  toggleNoEntries();
});

function renderEntry(entry) {
  var $li = document.createElement('li');
  $li.setAttribute('id', entry.entryId);

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

  var $titleRow = document.createElement('div');
  $titleRow.className = 'row space-between align-items-center';
  $rightHalfDiv.appendChild($titleRow);

  var $liTitle = document.createElement('h2');
  $liTitle.textContent = entry.title;
  $titleRow.appendChild($liTitle);

  var $faPencil = document.createElement('i');
  $faPencil.className = 'fa-solid fa-pen fa-lg';
  $titleRow.appendChild($faPencil);

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
  if (data.entries.length !== 0) {
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

$ul.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');
    var liId = event.target.closest('li').getAttribute('id') * 1;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === liId) {
        data.editing = data.entries[i];
      }
    }
    $img.setAttribute('src', data.editing.photoUrl);
    $photoUrl.value = data.editing.photoUrl;
    $title.value = data.editing.title;
    $notes.value = data.editing.notes;

    $h1.textContent = 'Edit Entry';
    $buttonRow.className += ' space-between';
    $delete.className = '';
  }
});

var $deleteEntryButton = document.querySelector('.delete-button');

$deleteEntryButton.addEventListener('click', function (event) {
  $modal.className = '';
});

var $cancelButton = document.querySelector('#cancel-button');

$cancelButton.addEventListener('click', function (event) {
  $modal.className = 'hidden';
});

var $confirmButton = document.querySelector('#confirm-button');
// var $liList = document.querySelectorAll('li');

$confirmButton.addEventListener('click', function (event) {
  var liIdNum = 0;
  for (var i = 0; i < data.entries.length; i++) {
    if (data.editing.entryId === data.entries[i].entryId) {
      liIdNum += data.entries[i].entryId;
      data.entries.splice(i, 1);
    }
  }
  var removeLi = document.getElementById(liIdNum);
  removeLi.remove();
  data.editing = null;
  toggleNoEntries();
  $modal.className = 'hidden';
  viewSwap('entries');
});
