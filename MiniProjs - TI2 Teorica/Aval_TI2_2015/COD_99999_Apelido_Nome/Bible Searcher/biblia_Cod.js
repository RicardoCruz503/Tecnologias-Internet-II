//cod_Biblia_4
//**************************************************************
var bibleJSON=JSON.parse(JSON.stringify(biblia));
var inputSearch="", previousSearch="";
var searchRestrita=[], searchLexical=[];
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
function refVers(iTest, iLivro, iCap, iVers, versTxt){
	return '<b class="colored">' + nomeLivroTest(iTest, iLivro)+' '+(iCap+1)+':'+(iVers+1) + '</b> - ' + versTxt;
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
    var firstRegex, secondRegex;
    var restritaOrLexical = 0; //false para restrita e true para lexical
    if($("#radio-restrita").prop("checked")){
        firstRegex = new RegExp(inputSearch, "g");
        secondRegex = new RegExp(inputSearch, "gi");
    }
    else{
        firstRegex = new RegExp(inputSearch, "gi"); 
        secondRegex = new RegExp(inputSearch, "g"); 
        restritaOrLexical ^= 1;
    }
    var aux = crawl(firstRegex, secondRegex, restritaOrLexical);
    $('#output-div').empty();
    for(var i = 0; i < aux.length; i++){
        $('#output-div').append(aux[i]);
    }
    
}

function crawl(firstRegex, secondRegex, restritaOrLexical){
    var txtVers, txtVersFinal, iTest, iLivro, iCap, iVers, nTests, nLivros, nCaps, auxArray, nVerss=0;
    var firstcodHTML=[""], secondcodHTML = [""];
    var firstIndex = 0, secondIndex = 0;
	nTests=numTests();
	for(iTest=0; iTest<nTests; iTest++){
		nLivros=numLivrosTest(iTest);
		for(iLivro=0; iLivro<nLivros; iLivro++){
			nCaps=numCapsLivroTest(iTest, iLivro);
			for(iCap=0; iCap<nCaps; iCap++){
				nVerss=numVerssCapLivroTest(iTest, iLivro, iCap);
                for(iVers=0; iVers<nVerss; iVers++){
                    txtVers = txtVersCapLivroTest(iTest, iLivro, iCap, iVers);
                    regexArray = txtVers.match(firstRegex);
                    if(regexArray!= null){
                        txtVersFinal = delimit(txtVersCapLivroTest(iTest, iLivro, iCap, iVers), firstRegex, regexArray);
                        if(firstcodHTML[firstIndex].length > 1000){
                            firstIndex++; 
                            firstcodHTML.push('<p>' + refVers(iTest, iLivro, iCap, iVers, txtVersFinal) + '</p>');
                        }
                        else{
                            firstcodHTML[firstIndex] += '<p>' + refVers(iTest, iLivro, iCap, iVers, txtVersFinal) + '</p>';
                        }
                        
                    }
                    regexArray = txtVers.match(secondRegex);
                    if(regexArray!= null){
                        txtVersFinal = delimit(txtVersCapLivroTest(iTest, iLivro, iCap, iVers), secondRegex, regexArray);
                        if(secondcodHTML[secondIndex].length > 1000){
                            secondIndex++;
                            secondcodHTML.push('<p>' + refVers(iTest, iLivro, iCap, iVers, txtVersFinal) + '</p>');
                        }
                        else{
                            secondcodHTML[secondIndex] += '<p>' + refVers(iTest, iLivro, iCap, iVers, txtVersFinal) + '</p>';
                        }
                    }
                }
			}
		}
    }
    var count = 0;
    for(var i = 0; i< secondcodHTML.length; i++) {
        count += secondcodHTML[i].length;
    }
    console.log("count = " + count);
    if(restritaOrLexical==0){
        searchRestrita = firstcodHTML;
        searchLexical = secondcodHTML;
    }
    else{
        searchLexical = firstcodHTML;
        searchRestrita = secondcodHTML;
    }
    console.log("Tamanho da variavel firstcodHTML:" + firstcodHTML.length);
    console.log("Tamanho da variavel secondcodHTML:" + secondcodHTML.length);
    return firstcodHTML;
}

function delimit(vers, regex, regexArray){
    var splitArray = vers.split(regex);
    var output = "";
    var j = 0;
    for(var i = 0; i<splitArray.length; i++){
        output+=splitArray[i];
        if(regexArray[i]!=null){
           output += '<b>' + regexArray[i] + '</b>';
        }
    }
    return output;
}

function decision(){
    if(inputSearch != previousSearch){
        previousSearch = inputSearch;
        pesquisar();
        return;
    }
    if($("#radio-restrita").prop("checked")){  
        $('#output-div').empty(); 
        for(var i = 0; i < searchRestrita.length; i++){
            $('#output-div').append(searchRestrita[i]);
        }  
    }
    else{
        $('#output-div').empty();
        for(var i = 0; i < searchLexical.length; i++){
            $('#output-div').append(searchLexical[i]);
        }
    }
    return;
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
       decision(); 
    });
    
     $('#inputText').on('input',function(e){
        inputSearch = $('#inputText').val();
    });
    
    $('#inputText').keyup(function(e){
        if(e.keyCode == 13) //ENTER
        {
            decision();
        }
    });
});




