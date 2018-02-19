$(document).ready(() =>{
	$('#movie').on('keypress', function(enter){  //on al presionar la tecla
			let movie = $('#movie').val(); // Rescatar el valor que ingresa el usuario
			if(enter.which === 13) {//  13 es el valor q tiene la tecla enter  which es para saber si se presionó la tecla
				$('#movie').val();
				$.ajax({ // pedir información 
					url: `http://www.omdbapi.com/?s=${movie}&apikey=fed8ba13`,
					type: 'GET' ,
					datatype: 'json'
				})
				.done(function(response){  // parecido a then  respuesta esperada puede ser cualquier nombre
					console.log(response);
					showInfo(response); // si funciona que se ejecute la función
				}) 
				.fail(function(){
					console.log('error en conexión a la API');
				});
			}
	});
	function showInfo(info){
		let search = info.Search; // Search palabra reservada  si busca me arroje una respuesta
		if(info.Response === 'false'){ // Response palabra reservada para respuesta
			alert('Película no encontrada');
		}else{
			$('.preview, #title, #year, #runtime, #img').empty(); // llamo a mis div del html y luego los limpio para cada busqueda
			search.forEach(element =>{ 
				$('.preview').append(`<div class="title_movie"><p>${element.Title}</p><img src="${element.Poster}"></div>`);
			});
			$('.title_movie').click(function(){ // evento para la foto al hacer click muestre más info
					let newTitle = ($(this).text()); // duda
					$.ajax({ // volver a pedir una petición para otro evento 
						url: `http://www.omdbapi.com/?t=${newTitle}&apikey=796a29c7`,
						type: 'GET',
						datatype: 'json'
					})
					.done(function(response){ // respuesta positiva
						console.log(response);
						showMovie(response);
					}) 
					.fail(function(){
						console.log('No se conecta con la API')
					});
			});
		}
	}
	function showMovie(info){
		if(info.Response === 'false'){
			alert('La película no fue encontrada');
		}else{
			$('.preview, #title, #year, #runtime, #img').empty();
			$('#title').append(`Titulo:${info.Title}`);
			$('#year').append(`Año:${info.Year}`);
			$('#runtime').append(`Duración:${info.Runtime}`);
			$('#img').append(`<img src="${info.Poster}">`)
		}
	} 

})