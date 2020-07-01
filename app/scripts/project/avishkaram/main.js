const motivesListHead = document.querySelectorAll('.motives_list-head');
const motivesListIcon = document.querySelectorAll('.motives_list-icon');
for (let i =0; i <= motivesListHead.length; i++) {
  motivesListHead[i].addEventListener('mouseover', function() {
    motivesListIcon[i].classList.add('motives_list_icon-show');
  });
  motivesListHead[i].addEventListener('mouseout', function() {
    motivesListIcon[i].classList.remove('motives_list_icon-show');
  });
}


