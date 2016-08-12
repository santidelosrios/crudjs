$(function () {
  var operation = "C"; //"C"=Crear
  var selected_index = -1; 
  var tblPersons = localStorage.getItem("tblPersons"); 
  tblPersons = JSON.parse(tblPersons); 
  if (tblPersons === null) 
      tblPersons = [];

  function create() {
    var person = JSON.stringify({
      iD: $("#txtID").val(),
      name: $("#txtName").val(),
      phone: $("#txtPhone").val(),
      email: $("#txtEmail").val()
    }); 
    tblPersons.push(person);
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("Los datos han sido almacenados");
    return true;
  }

  function edit() {
    tblPersons[selected_index] = JSON.stringify({
        iD: $("#txtID").val(),
        name: $("#txtName").val(),
        phone: $("#txtPhone").val(),
        email: $("#txtEmail").val()
    });
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Los datos han sido editados");
    return true;
  }

  function delete() {
    tblPersons.splice(selected_index, 1); 
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Persona Eliminada"); 
  }

  function list() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>ID</th>" +
            "<th>Nombre</th>" +
            "<th>Teléfono</th>" +
            "<th>Email</th>" +
            "<th>Acciones</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); //Agregar la tabla al HTML
    for (var i=0; tblPersons.length; i++) {
        var per = JSON.parse(tblPersons[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.ID + "</td>" +
                "<td>" + per.Name + "</td>" +
                "<td>" + per.Phone + "</td>" +
                "<td>" + per.Email + "</td>" +                    
                "<td><img src='edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    }
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C")
        return create();
    else
        return edit();
  }); 
  
  List();

  $(".btnEdit").bind("click", function () {
    operation = "E"; //"E" = Editar
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    // Convertir de JSON al formato adecuando para editarlos datos
    var per = JSON.parse(tblPersons[selected_index]); 
    $("#txtID").val(per.ID);
    $("#txtName").val(per.Name);
    $("#txtPhone").val(per.Phone);
    $("#txtEmail").val(per.Email);
    $("#txtID").attr("readonly", "readonly");
    $("#txtName").focus();
  });

  $(".btnDelete").bind("click", function () {
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    delete();
    list();
  });
});

