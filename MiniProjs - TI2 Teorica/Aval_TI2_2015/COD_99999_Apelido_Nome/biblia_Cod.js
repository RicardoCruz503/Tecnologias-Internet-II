//cod_Biblia_4
//**************************************************************
var bibleJSON=JSON.parse(JSON.stringify(biblia));

//EXTRAÇÃO DOS DADOS JSON
//Expressa o número de Testamentos
function numTests(){
	return bibleJSON.bible.length;
}

//Expressa o nome de um Testamento
function nomeTest(iTest){
	return bibleJSON.bible[iTest].nameTest;
}

//Expressa o número de Livros num Testamento
function numLivrosTest(iTest){
	return bibleJSON.bible[iTest].books.length;
}

//Expressa o nome curto de um Livro de um Testamento
function nomeLivroTest(iTest, iLivro){
	return bibleJSON.bible[iTest].books[iLivro].shortName;
}

//Expressa o nome longo de um Livro de um Testamento
function especLivroTest(iTest, iLivro){
	return bibleJSON.bible[iTest].books[iLivro].longName;
}

//Expressa o número de Capítulos de um Livro de um Testamento
function numCapsLivroTest(iTest, iLivro){
	return bibleJSON.bible[iTest].books[iLivro].chapters.length;
}

//Expressa o nome de um Capítulo de um Livro de um Testamento
function nomeCapLivroTest(iTest, iLivro, iCap){
	return bibleJSON.bible[iTest].books[iLivro].chapters[iCap].title;
}

//Expressa o número de Versículos de um Capítulo de um Livro de um Testamento
function numVerssCapLivroTest(iTest, iLivro, iCap){
	return bibleJSON.bible[iTest].books[iLivro].chapters[iCap].versicles.length;
}

//Expressa o texto de um Versículo de um Capítulo de um Livro de um Testamento
function txtVersCapLivroTest(iTest, iLivro, iCap, iVers){
	return bibleJSON.bible[iTest].books[iLivro].chapters[iCap].versicles[iVers];
}


//Epressa a referência dum versículo
function refVers(iTest, iLivro, iCap, iVers){
	return nomeLivroTest(iTest, iLivro)+' '+(iCap+1)+':'+(iVers+1) + txtVersCapLivroTest(iTest, iLivro, iCap, iVers);
}

//Expressa o número total de versículos
function numTotVerss(){
	var iTest, iLivro, iCap, iVers, nTests, nLivros, nCaps, nVerss=0;
	nTests=numTests();
	for(iTest=0; iTest<nTests; iTest++){
		nLivros=numLivrosTest(iTest);
		for(iLivro=0; iLivro<nLivros; iLivro++){
			nCaps=numCapsLivroTest(iTest, iLivro);
			for(iCap=0; iCap<nCaps; iCap++){
				nVerss+=numVerssCapLivroTest(iTest, iLivro, iCap);
			}
		}
	}
	return nVerss;
}

function pesquisar(){
    var inputSearch = document.getElementById("inputText").value;
    if($("body").find("#radio-restrita").prop("checked")){
        var regex = new RegExp(inputSearch, "g"); 
    }
    else if($("body").find("#radio-lexical").prop("checked")){
        var regex = new RegExp(inputSearch, "gi"); 
    }
    var iTest, iLivro, iCap, iVers, nTests, nLivros, nCaps, nVerss=0;
	nTests=numTests();
	for(iTest=0; iTest<nTests; iTest++){
		nLivros=numLivrosTest(iTest);
		for(iLivro=0; iLivro<nLivros; iLivro++){
			nCaps=numCapsLivroTest(iTest, iLivro);
			for(iCap=0; iCap<nCaps; iCap++){
				nVerss+=numVerssCapLivroTest(iTest, iLivro, iCap);
			}
		}
    }   
}

//OUTPUTS
//testes genéricos
function teste(){
	document.write(refVers(0, 0, 16, 7));
}


//jquery events
$(document).ready(function () {
    $('#radio-restrita').change(function () {
        if ($(this).is(':checked')) {
            $("#radio-lexical").attr("checked", false);
        }
    });

    $('#radio-lexical').change(function () {
        if ($(this).is(':checked')) {
            $("#radio-restrita").attr("checked", false);
        }
    });
    
    $('#inputBtn').click(function () {
       pesquisar(); 
    });
});




