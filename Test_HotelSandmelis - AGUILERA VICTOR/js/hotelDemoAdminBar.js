$(".toggle_translate").change(function () {
  let on = $(this).prop("checked");
  let newurl = `/core/session.php?set=translate&val=${on}&return=${encodeURIComponent(window.location.href)}`;
  console.log(newurl);
  window.location.href = newurl;
});
$(".toggle_apidev").change(function () {
  let on = $('.toggle_apidev:checked');
  let off = $('.toggle_apidev:not(:checked)');
  let reset = [];
  $(off).each(function() {
    reset.push($(this).val());
  })
  reset = encodeURIComponent(JSON.stringify(reset));
  let value = $(on).val();
  let newurl = `/core/session.php?set=${value}&val=true&reset=${reset}&return=${encodeURIComponent(window.location.href)}`;
  console.log(newurl);
  window.location.href = newurl;
});
$(".toggle_dbug").change(function () {
  let on = $(this).prop("checked");
  let newurl = `/core/session.php?set=DBug&val=${on}&return=${encodeURIComponent(window.location.href)}`;
  console.log(newurl);
  window.location.href = newurl;
});
$(".reset_pos_translate").click(function () {
    var btn = $(this);
  $(this).prop("disabled", true);
  $(this).text("Aguarde un momento por favor...");
  try {
    let reseturl = `${channelScriptEndpoint}/translate.php`;
    let data = {
      idPos: Json_Pos.Folder !== "FreshAndCleanHotel" ? Json_Pos.ID : 2303,
    };

    $.ajax({
        url:reseturl,
        type:"POST",
        data:JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(res){
            if (res.Response == 1) {

                btn.prop("disabled", false);
                btn.text("Forzar traducciones de este POS");
                var reload = confirm(`Traducciones procesadas, se procederá a recargar la página. Continuar?`);
                if (reload) {
                    window.location.reload();
                }
            } else {
                btn.text("Forzar traducciones de este POS");
                btn.prop("disabled", false);
                alert("Ha ocurrido un error al resetear el diccionario");
            }
        },
        error: function(err) {
            btn.text("Forzar traducciones de este POS");
            btn.prop("disabled", false);
            console.error("ERROR TRANSLATE: ", err)
            alert(JSON.stringify(err));
        }
    })
  } catch (err) {
    console.error('Error al forzar el reseteo de diccionario:', err);
    btn.text("Forzar traducciones de este POS");

    btn.prop("disabled", false);
    alert("Ha ocurrido un error al resetear el diccionario");
  }
});