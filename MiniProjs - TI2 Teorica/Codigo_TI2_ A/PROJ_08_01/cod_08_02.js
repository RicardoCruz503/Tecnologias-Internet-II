﻿//cod_08_02
//**************************************************************

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
//Expressa a source completa da imagem miniatura da capa
function srcCapaMiniCD(iCD){
	return "../../Recursos/Imagens/"+listaCDs[iCD].childNodes[4].attributes[0].text;
}
//Expressa o nome do ficheiro da imagem miniatura da capa
function capaMiniCD(iCD){
	return listaCDs[iCD].childNodes[4].attributes[0].text;
}
//Expressa o nome do ficheiro da imagem real (grande) da capa
function capaBigCD(iCD){
	return listaCDs[iCD].childNodes[4].attributes[1].text;
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

//Gera um código JSON para o objeto "discoteca" em XML
	var cod="", codJSON=document.getElementById("codJSON"); 
	var iCD, iConteudo, numConteudos, iFaixa, numFaixas;
	//cod+='\n';
	cod+='{"discoteca":[\n';
	for(iCD=0; iCD<numCDs; iCD++){
		cod+='  {\n';
		cod+='    "titulo":"'+tituloCD(iCD)+'",\n';
		cod+='    "autoria":"'+autoriaCD(iCD)+'",\n';
		cod+='    "editora":"'+editoraCD(iCD)+'",\n';
		cod+='    "amazon":"'+urlAmazonCD(iCD)+'",\n';
		cod+='    "datalanc":{"ano":"'+anoDataLanc(iCD)+'", "mes":"'+mesDataLanc(iCD)+'", "dia":"'+diaDataLanc(iCD)+'"},\n';
		cod+='    "capa":{"imagMini":"'+capaMiniCD(iCD)+'", "imagBig":"'+capaBigCD(iCD)+'"},\n';
		cod+='    "conteudos":[\n';
		numConteudos=numDiscos(iCD);
		for(iConteudo=0; iConteudo<numConteudos; iConteudo++){
			cod+='      {\n';
			cod+='        "disco":"'+refDiscoCD(iCD, iConteudo)+'",\n';
			cod+='        "faixas":[\n';
			numFaixas=numFaixasDisco(iCD, iConteudo);
			for(iFaixa=0; iFaixa<numFaixas; iFaixa++){
				if(iFaixa<numFaixas-1) cod+='          {"num":"'+numFaixaDisco(iCD, iConteudo, iFaixa)+'", "ref":"'+refFaixaDisco(iCD, iConteudo, iFaixa)+'"},\n';
				else cod+='          {"num":"'+numFaixaDisco(iCD, iConteudo, iFaixa)+'", "ref":"'+refFaixaDisco(iCD, iConteudo, iFaixa)+'"}\n';
			}
			cod+='        ]\n';
			if(iConteudo<numConteudos-1) cod+='      },\n';
			else cod+='      }\n';
		}
		cod+='    ]\n';
		if(iCD<numCDs-1) cod+='  },\n';
		else cod+='  }\n';
	}
	cod+=']}\n';
	codJSON.value=cod;
}




