//Создаем асинхронную функцию для чтения из json и записываем массив в переменную----------------------
(async function getResponse() {
  let response = await fetch('data.json')
  let myArray = await response.json()
  //---------------------------------------------------------------------------------------------------

  let thClick = document.querySelectorAll('th');
  for (let i = 0; i < thClick.length; i++) {

    thClick[i].addEventListener('click', function () {
      let column = thClick[i].dataset.column;
      let order = thClick[i].dataset.order;

      if (order === 'desc') {
        thClick[i].dataset.order = 'asc';
        myArray = myArray.sort((a, b) => a[column] > b[column] ? 1 : -1)
        thClick[i].querySelector('.sort-icon').innerHTML = ' &#9660';

      } else {
        thClick[i].dataset.order = 'desc';
        myArray = myArray.sort((a, b) => a[column] < b[column] ? 1 : -1)
        thClick[i].querySelector('.sort-icon').innerHTML = ' &#9650';
      }
      buildTable(myArray)
      bgColor()
    })
  }

  buildTable(myArray)

  function buildTable(data) {
    let table = document.getElementById('myTable')
    table.innerHTML = ''
    for (let i = 0; i < data.length; i++) {
      let row = `<tr class="tr-content">
							<td>${data[i].name.firstName}</td>
							<td>${data[i].name.lastName}</td>
							<td class="hidden-text">${data[i].about}</td>
							<td class="bg-eye" style="background-color: #fff">${data[i].eyeColor}</td>
					    </tr>`
      table.innerHTML += row
    }
  }

  let trClick = document.querySelectorAll('.tr-content')

  trClick.forEach(function (currentValue) {
    currentValue.addEventListener('click', function () {
      activeForm();
      setFormData(currentValue.children)
    });

  });


  bgColor();

})();

function bgColor() {
  let bgTd = document.querySelectorAll('.bg-eye')

  bgTd.forEach(function (currentValue) {
    currentValue.style.backgroundColor = currentValue.innerHTML
  })
}

function onFormSubmit() {
  let formData = readFormData();
}

function readFormData() {
  let fromData = {};
  fromData['first-name'] = document.getElementById('first-name').value;
  fromData['last-name'] = document.getElementById('last-name').value;
  fromData['about'] = document.getElementById('about').value;
  fromData['eye-color'] = document.getElementById('eye-color').value;
  console.log(fromData);
  return fromData;
}

function setFormData(data) {
  document.getElementById('first-name').value = data[0].innerHTML
  document.getElementById('last-name').value = data[1].innerHTML
  document.getElementById('about').value = data[2].innerHTML
  document.getElementById('eye-color').value = data[3].innerHTML
}

function activeForm() {
  document.querySelector('.form').classList.toggle('form--active')
}
