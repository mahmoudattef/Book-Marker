var siteNameInput = document.getElementById('nameInput')
var siteUrlInput = document.getElementById('urlInput')
var btnAdd = document.getElementById('btnAdd')
var btnUpdate = document.getElementById('btnUpdate')
var index = 0

var sitesList = []

if (localStorage.getItem('siteContainer') !== null) {
    sitesList = JSON.parse(localStorage.getItem('siteContainer'))
    displaySite()
}



function addSite() {
    if (ValidationName() == true && ValidationUrl() == true) {

        var site = {
            name: siteNameInput.value,
            url: siteUrlInput.value,
        };
        sitesList.push(site);
        localStorage.setItem('siteContainer', JSON.stringify(sitesList));
        displaySite()
        clearInpute()
    }
    else {
        document.getElementById('aleartmsg').classList.remove('d-none')

    }

}

function closeModal() {
    document.getElementById('aleartmsg').classList.add('d-none')
    document.body.style.overflow = "visible";

}


function displaySite() {
    var cartona = "";
    for (let i = 0; i < sitesList.length; i++) {
        cartona += `
    <tr>
        <td>${i + 1}</td>
        <td >${sitesList[i].name}</td>
        <td>
    <a href="https://${sitesList[i].url}" target="_blank">
    <button class="btn btn-visit btn-outline-success" >

    <i class="fa-solid fa-eye pe-2 "></i>Visit
    </button>
    </a>  </td>
    <td><button onclick="setFormUpdate(${i})" class="update-btn btn btn-outline-warning "><i class="fa-solid fa-pen "></i>
    update</button></td>

        <td><button  onclick="deleteInpute(${i})" class="btn btn-delete  btn-outline-danger">
            <i class="fa-solid fa-trash-can"></i>
            Delete  
          </button></td>

      </tr>
    `

    }
    document.getElementById('demo').innerHTML = cartona;
}

function setFormUpdate(indexUpdate) {
    siteNameInput.value = sitesList[indexUpdate].name;
    siteUrlInput.value = sitesList[indexUpdate].url;
    btnAdd.classList.add('d-none')
    btnUpdate.classList.remove('d-none')
    index = indexUpdate

}
function updateData() {
    var site = {
        name: siteNameInput.value,
        url: siteUrlInput.value,
    };
    sitesList.splice(index, 1, site)
    displaySite()
    clearInpute()
    localStorage.setItem('siteContainer', JSON.stringify(sitesList));

}

function deleteInpute(indexInpute) {
    sitesList.splice(indexInpute, 1);
    localStorage.setItem('siteContainer', JSON.stringify(sitesList))
    displaySite()
}


function clearInpute() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
}

function ValidationName() {
    var text = siteNameInput.value;
    var regex = /^[a-zA-z0-9]{3,}$/
    if (regex.test(text) == true) {
        siteNameInput.classList.add('is-valid');
        siteNameInput.classList.remove('is-invalid');
        return true;
    } else {
        siteNameInput.classList.add('is-invalid');
        siteNameInput.classList.remove('is-valid');
        return false;
    }
}


function ValidationUrl() {
    var text = siteUrlInput.value;
    let regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-])\/?$/gm
    if (regex.test(text) == true) {
        siteUrlInput.classList.add('is-valid');
        siteUrlInput.classList.remove('is-invalid');
        return true;
    } else {
        siteUrlInput.classList.add('is-invalid');
        siteUrlInput.classList.remove('is-valid');
        return false;
    }
}



