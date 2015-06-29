//cod_04_01
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

//EXTRAÇÃO DOS DADOS DO XML

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
//Expressa a URL da informação Amazon de um CD, sabido o seu índice (no array)
function urlAmazonCD(iCD){
	return listaCDs[iCD].childNodes[3].attributes[0].text;
}
function srcCapaMiniCD(iCD){
	return "../../Recursos/Imagens/"+listaCDs[iCD].childNodes[4].attributes[0].text;
}
//Expressa o dia da data de lançamento de um CD, sabido o seu índice (no array)
function diaDataLanc(iCD){
	var indDataLanc=listaCDs[iCD].childNodes.length-1;
	return listaCDs[iCD].childNodes[indDataLanc].childNodes[0].text;
}
//Expressa o mês da data de lançamento de um CD, sabido o seu índice (no array)
function mesDataLanc(iCD){
	var indDataLanc=listaCDs[iCD].childNodes.length-1;
	return listaCDs[iCD].childNodes[indDataLanc].childNodes[1].text;
}
//Expressa o ano da data de lançamento de um CD, sabido o seu índice (no array)
function anoDataLanc(iCD){
	var indDataLanc=listaCDs[iCD].childNodes.length-1;
	return listaCDs[iCD].childNodes[indDataLanc].childNodes[2].text;
}
//Expressa o número de discos de um CD, sabido o seu índice (no array)
function numDiscos(iCD){
	return listaCDs[iCD].childNodes.length-6;
}
//Expressa a referência de cada disco de um CD, sabido o seu índice (no array) e índice do conteúdo (este começa em 0, obviamente)
function refDiscoCD(iCD, iConteudo){
	return listaCDs[iCD].childNodes[iConteudo+5].attributes[0].text;
}
//Expressa o número de faixas de um disco de um CD, sabidos os respetivos índices
function numFaixasDisco(iCD, iConteudo){
	return listaCDs[iCD].childNodes[iConteudo+5].childNodes.length;
}
//Expressa o número de uma faixa de um disco de um CD, sabidos os respetivos índices 
function numFaixaDisco(iCD, iConteudo, iFaixa){
	return listaCDs[iCD].childNodes[iConteudo+5].childNodes[iFaixa].attributes[0].text;
}
//Expressa a referência de uma faixa de um disco de um CD, sabidos os respetivos índices 
function refFaixaDisco(iCD, iConteudo, iFaixa){
	return listaCDs[iCD].childNodes[iConteudo+5].childNodes[iFaixa].attributes[1].text;
}


//OUPUTS

//apresenta uma tabela de detalhes de um CD, sabido o seu índice (no array)
function detalhesCD(iCD){
	var link='<a class="link1" href="http://'+urlAmazonCD(iCD)+'" target="_blank">'+urlAmazonCD(iCD)+'</a>';
	var data=diaDataLanc(iCD)+"/"+mesDataLanc(iCD)+"/"+anoDataLanc(iCD);
	document.write(
		'<table>'+
		codLinhaDetalhes("Título", tituloCD(iCD))+
		codLinhaDetalhes("Autoria", autoriaCD(iCD))+
		codLinhaDetalhes("Editora", editoraCD(iCD))+
		codLinhaDetalhes("URL na Amazon", link)+
		codLinhaDetalhes("Data de Lançamento", data)+
		codLinhasConteudos(iCD)+
		'</table><br />'
	);
}
//apresenta as tabelas de detalhe de tos os CDs
function detalhesCDs(){
	for(var i=0; i<numCDs; i++) detalhesCD(i);
}
//Expressa o código HTML para uma linha da tabela de detalhes acima referida
function codLinhaDetalhes(etk, cont){
	return(
		'<tr>'+
			'<td class="etik1">'+etk+'</td>'+
			'<td class="contd1">'+cont+'</td>'+
		'</tr>'
	);
}
//Expressa o código HTML para as linhas de conteúdos da tabela de detalhes acima referida
function codLinhasConteudos(iCD){
	var i, j, codHTML="", listaFaixas, numFaixas;
	for(i=0; i<numDiscos(iCD); i++){
		listaFaixas=""; numFaixas=numFaixasDisco(iCD, i);
		for(j=0; j<numFaixas; j++)
			listaFaixas+="Faixa "+numFaixaDisco(iCD, i, j)+": "+refFaixaDisco(iCD, i, j)+"<br />";
		codHTML+=codLinhaDetalhes("Disco "+refDiscoCD(iCD, i), listaFaixas);
	}
	return codHTML;
}













