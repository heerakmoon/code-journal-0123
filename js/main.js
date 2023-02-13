var $photoUrl = document.querySelector('#url');
var $img = document.querySelector('img');

$photoUrl.addEventListener('input', function (e) {
  $img.setAttribute('src', $photoUrl.value);
});
