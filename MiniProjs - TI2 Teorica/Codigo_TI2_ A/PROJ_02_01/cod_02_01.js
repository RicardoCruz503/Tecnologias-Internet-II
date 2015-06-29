//cod_02_01
//*******************************************************

//Lista de CDs e quantidade de CDs
var listaCDs, numCDs;

//Expressa o nó principal de um documento XML.
//Apenas para uso no browser MSIE !
function noRaiz(fichXML){
	//criação de um objecto ActiveX (Microsoft)
	var oax=new ActiveXObject("Microsoft.XMLDOM");
	//tornar o objeto síncrono e carregá-lo
	oax.async=false; oax.load(fichXML);
	//devolver o nó raíz do XML (tipo XMLDOM node)
	return oax.documentElement;
}

//Estabelece a Lista de CDs e quantidade de CDs
function inicDiscot(){
	listaCDs=noRaiz("../../Recursos/XML/discot.xml").childNodes;
	numCDs=listaCDs.length;
}

//Expressa o Título de um CD, sabido o seu índice (no array)
function tituloCD(iCD){
	return listaCDs[iCD].childNodes[0].text;
}
//Expressa a Autoria de um CD, sabido o seu índice (no array)
function autoriaCD(iCD){
	return listaCDs[iCD].childNodes[1].text;
}
//Expressa a Editora de um CD, sabido o seu índice (no array)
function editoraCD(iCD){
	return listaCDs[iCD].childNodes[2].text;
}
function srcCapaMiniCD(iCD){
	return "../../Recursos/Imagens/"+listaCDs[iCD].childNodes[4].attributes[0].text;
}


//OUPUTS

//Listar descrições dos CDs
function listaDescrsCDs(){
	document.write('<ol>');
	for(var i=0; i<numCDs; i++)
		document.write(
			'<li>'+
			'<span class="tipoTitulo">'+tituloCD(i)+'</span>'+
			'<span class="tipoBarra"> | <span>'+
			'<span class="tipoAutoria">'+autoriaCD(i)+'</span>'+
			'<span class="tipoBarra"> | <span>'+
			'<span class="tipoEditora">'+editoraCD(i)+'</span>'+
			'</li>'
		);
	document.write('</ol>');
}
//Tabelar descrições dos CDs
function tabDescrsCDs(){
	document.write('<table>');
	//cabeçalho da tabela
	document.write(
		'<tr>'+
		'<th class="Cab1">títulos</th>'+
		'<th class="Cab1">autorias</th>'+
		'<th class="Cab1">editoras</th>'+
		'</tr>'
	);
	//células da tabela
	for(var i=0; i<numCDs; i++)
	document.write(
		'<tr>'+
		'<td class="celTitulo">'+tituloCD(i)+'</td>'+
		'<td class="celAutoria">'+autoriaCD(i)+'</td>'+
		'<td class="celEditora">'+editoraCD(i)+'</td>'+
		'</tr>'
	);
	document.write('</table>');
}
//Mostrar as imagens mini das capas dos CDs
function capasMiniCDs(){
	for(var i=0; i<numCDs; i++)
		document.write('<img src="'+srcCapaMiniCD(i)+'" />');
}







