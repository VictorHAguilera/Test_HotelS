$("#form_suscribe").submit(function (e) {
	ApiPost(e, $(this), function (Json) {
		console.log("ApiPost Completed");
		if (Json.Response == 0) {
			window.alert("Error");
		}

		if (Json.Response == 1 && Json.Suscribed == 1) {
			window.alert('Gracias por subcribirse');
		}
		if (Json.Response == 1 && Json.Suscribed == 0) {
			window.alert('Usted ya se encuentra registrado en nuestro newsletter. Gracias');
		}
	});
});





$("#form_suscribe").validate({
	errorElement: 'div',
	rules: {
		Email: {
			required: true,
			email: true
		}
	},
	messages: {
		Email: {
			required: "Complete el campo email",
			email: "Debe ser una direccion de correo electronico"
		}
	}
});