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
        <td class="fs-6 fw-semibold">${user.nombre} <br> <span class="email-fs fw-lighter">${user.email}</span></td>
        <td>${user.telefono}</td>
        <td>${user.empresa}</td>
        <td><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdit" id="btnEdit" data-user-id=${user.id}>Editar</button>
            <button class="btn btn-danger" data-bs-toggle="modal1"  data-bs-target="#modalDelete" id="btnDelete" data-user-id=${user.id}>Eliminar</button>
        </td>
      </tr>
    `;

        tableContent += row;
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
    container.insertAdjacentHTML('afterbegin', table);

    editUser(users);

});



/////////////Edit users
function editUser(users) {

    const btnEditList = document.querySelectorAll('.btn-primary');
    btnEditList.forEach(btnEdit => {
        btnEdit.addEventListener('click', () => {
            const userId = parseInt(btnEdit.dataset.userId);
            const user = users.find(user => user.id === userId);


            document.getElementById('nombreCliente').value = user.nombre;
            document.getElementById('emailCliente').value = user.email;
            document.getElementById('telefonoCliente').value = user.telefono;
            document.getElementById('empresaCliente').value = user.empresa;

           
        });
    });
}

