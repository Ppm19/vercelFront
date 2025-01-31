$(document).ready(function () {
  $('#botonMostrarAlumnos').on('click', function () {
      $.ajax({
          url: 'https://flask-python-delta.vercel.app/api/alumnos',
          method: 'GET',
          crossDomain : true,
          success: function (data) {
              const lista = $('#listaAlumnos');
              lista.empty();
              data.forEach(alumno => {
                  lista.append(`<li>${alumno.nombre} ${alumno.apellido} - ${alumno.telefono}</li>`);
              });
          },
          error: function (err) {
              alert('Error al obtener los alumnos');
              console.error(err);
          }
      });
  });

  $('#botonBuscarAlumno').on('click', function () {
      const id = $('#idAlumnoBuscado').val();
      if (!id) {
          alert('Por favor ingresa un ID');
          return;
      }

      $.ajax({
          url: `https://flask-python-delta.vercel.app/api/alumnos/<alumno_id>`,
          method: 'GET',
          crossDomain : true,
          success: function (data) {
              $('#resultado').text(`Nombre: ${data.nombre}, Apellido: ${data.apellido}, Teléfono: ${data.telefono}`);
          },
          error: function (err) {
              alert('Alumno no encontrado');
              console.error(err);
          }
      });
  });

  $('#formularioAddAlumnos').on('submit', function (event) {
      event.preventDefault();
      const nuevoAlumno = {
          id: $('#alumnoId').val(),
          nombre: $('#nombreAlumno').val(),
          apellido: $('#apellidoAlumno').val(),
          telefono: $('#telefonoAlumno').val(),
      };

      $.ajax({
          url: 'https://flask-python-delta.vercel.app/api/alumnos',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(nuevoAlumno),
          crossDomain : true,
          success: function () {
              $('#addMensajeAlumno').text('Alumno agregado correctamente');
              $('#formularioAddAlumnos')[0].reset();
          },
          error: function (err) {
              alert('Error al agregar el alumno');
              console.error(err);
          }
      });
  });
});
