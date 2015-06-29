//cod_08_03
//**************************************************************
//Gera um código JSON para o objeto "discoteca" em XMLfunction geraJSONdiscot2(){
	var cod="", codJSON=document.getElementById("codJSON"); 
	var iCD, iConteudo, numConteudos, iFaixa, numFaixas;
	cod+='\'{"discoteca":[\'+\n';
	for(iCD=0; iCD<numCDs; iCD++){
		cod+='\'  {\'+\n';
		cod+='\'    "titulo":"'+tituloCD(iCD)+'",\'+\n';
		cod+='\'    "autoria":"'+autoriaCD(iCD)+'",\'+\n';
		cod+='\'    "editora":"'+editoraCD(iCD)+'",\'+\n';
		cod+='\'    "amazon":"'+urlAmazonCD(iCD)+'",\'+\n';
		cod+='\'    "datalanc":{"ano":"'+anoDataLanc(iCD)+'", "mes":"'+mesDataLanc(iCD)+'", "dia":"'+diaDataLanc(iCD)+'"},\'+\n';
		cod+='\'    "capa":{"imagMini":"'+capaMiniCD(iCD)+'", "imagBig":"'+capaBigCD(iCD)+'"},\'+\n';
		cod+='\'    "conteudos":[\'+\n';
		numConteudos=numDiscos(iCD);
		for(iConteudo=0; iConteudo<numConteudos; iConteudo++){
			cod+='\'      {\'+\n';
			cod+='\'        "disco":"'+refDiscoCD(iCD, iConteudo)+'",\'+\n';
			cod+='\'        "faixas":[\'+\n';
			numFaixas=numFaixasDisco(iCD, iConteudo);
			for(iFaixa=0; iFaixa<numFaixas; iFaixa++){
				if(iFaixa<numFaixas-1) cod+='\'          {"num":"'+numFaixaDisco(iCD, iConteudo, iFaixa)+'", "ref":"'+refFaixaDisco(iCD, iConteudo, iFaixa)+'"},\'+\n';
				else cod+='\'          {"num":"'+numFaixaDisco(iCD, iConteudo, iFaixa)+'", "ref":"'+refFaixaDisco(iCD, iConteudo, iFaixa)+'"}\'+\n';
			}
			cod+='\'        ]\'+\n';
			if(iConteudo<numConteudos-1) cod+='\'      },\'+\n';
			else cod+='\'      }\'+\n';
		}
		cod+='\'    ]\'+\n';
		if(iCD<numCDs-1) cod+='\'  },\'+\n';
		else cod+='\'  }\'+\n';
	}
	cod+='\']}\'+\n';
	codJSON.value=cod;
}





