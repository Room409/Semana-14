const apiFake = async () => {
  const request = await fetch('http://localhost:3000/clientes');
  const data = await request.json()
  return data

}

const container = document.getElementById('container-users');
apiFake().then(users => {
  let tableContent = '';

  for (const user of users) {

    const row = `
      <tr>
        <th scope="row"></th>
        <td class="fs-6 fw-semibold nameClient">${user.nombre} <br> <span class="email-fs fw-lighter emailClient">${user.email}</span></td>
        <td class="telefonoClient">${user.telefono}</td>
        <td class="empresaClient">${user.empresa}</td>
        <td><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdit" id="btnEdit" data-user-id=${user.id}>Editar</button>
            <button class="btn btn-danger" data-bs-toggle="modal"  data-bs-target="#modalDelete" id="btnDelete" data-user-id=${user.id}>Eliminar</button>
        </td>
      </tr>
    `;
    tableContent = row + tableContent;
  }
  const table = `
    <table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Nombre cliente</th>
          <th scope="col">Telefono</th>
          <th scope="col">Empresa</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${tableContent}
      </tbody>
    </table>
  `;
  container.innerHTML = table
  deleteUser(users)
  editUser(users);

});

// Agregar cliente
const addClient = document.getElementById('addNewClient');

addClient.addEventListener('click', async (event) => {
  event.preventDefault();

  const clientName = document.getElementById('newClientName').value
  const clientMail = document.getElementById('newClientEmail').value
  const clientPhone = document.getElementById('newClientPhone').value
  const clientEmpresa = document.getElementById('newClientEmpresa').value

  const createUser = {
    nombre: clientName,
    email: clientMail,
    telefono: clientPhone,
    empresa: clientEmpresa,
  };

  try {
    const response = await fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createUser),
    });

  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
});

/////////////Edit users
function editUser(users) {
  const btnEditList = document.querySelectorAll('.btn-primary');
  btnEditList.forEach(btnEdit => {
    btnEdit.addEventListener('click', () => {
      const userId = parseInt(btnEdit.dataset.userId);
      const user = users.find(user => user.id === userId);


      const request = async () => {
        const respose = await fetch('http://localhost:3000/clientes')
        const data = await respose.json()

        document.getElementById('nombreCliente').value = user.nombre
        document.getElementById('emailCliente').value = user.email
        document.getElementById('telefonoCliente').value = user.telefono
        document.getElementById('empresaCliente').value = user.empresa
      }
      request()
      saveChangeBtn.dataset.userId = userId;

    });
  });
  
  //SAVECHANGE DEL MODAL EDITAR
  const saveChangeBtn = document.getElementById('saveEdit');
  saveChangeBtn.addEventListener('click', async () => {
    const userId = parseInt(saveChangeBtn.dataset.userId);
    const user = users.find(user => user.id === userId);

    if (user) {
      const nameEdited = document.getElementById('nombreCliente').value;
      const emailEdited = document.getElementById('emailCliente').value;
      const phoneEdited = document.getElementById('telefonoCliente').value;
      const empresaEdited = document.getElementById('empresaCliente').value;

      const updatedUser = {
        nombre: nameEdited,
        email: emailEdited,
        telefono: phoneEdited,
        empresa: empresaEdited

      };


      const response = await fetch(`http://localhost:3000/clientes/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      const modalEdit = bootstrap.Modal.getInstance(document.getElementById('modalEdit'))
      modalEdit.hide()
    }
  });
}


//ELIMINAR
function deleteUser(users) {
  const deleteBtnList = document.querySelectorAll('#btnDelete');
  deleteBtnList.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', () => {
      const userId = parseInt(deleteBtn.getAttribute('data-user-id'));
      const user = users.find(user => user.id === userId);

      const deleteBtnElement = document.getElementById('deleteBtnElement');
      deleteBtnElement.addEventListener('click', async () => {
        if (user) {
          users.splice(user, 1);

          const response = await fetch(`http://localhost:3000/clientes/${userId}`, {
            method: 'DELETE',
          });
        }
      });
    });
  });
}











////CAMBIAR SECCION
const newClientBtn = document.getElementById('newClientBtn');
const newClientContainer = document.getElementById('nuevoClienteContainer');

const clients = document.getElementById('clients');
const clientsContainer = document.getElementById('container-clientes');

newClientBtn.addEventListener('click', () => {
  clientsContainer.classList.add('d-none');
  newClientContainer.classList.remove('d-none');
});

clients.addEventListener('click', () => {
  newClientContainer.classList.add('d-none');
  clientsContainer.classList.remove('d-none');
});

