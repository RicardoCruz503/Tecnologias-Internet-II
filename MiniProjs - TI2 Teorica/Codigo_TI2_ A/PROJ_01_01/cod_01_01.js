//cod_01_01
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



//OUPUTS

//Listar títulos dos CDs
function listaTitulosCDs(){
	document.write('<ol>');
	for(var i=0; i<numCDs; i++)
		document.write('<li>'+tituloCD(i)+'</li>');
	document.write('</ol>');
}








