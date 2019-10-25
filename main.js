angular.module('KRRclass', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);


function mainCtrl($scope, $http, ChartJsProvider){



	// ###################### Question 4
	// Associate your sparql endpoint to a scope variable. Add the "/query?query=" parameter after the variable
	// Ex. $scope.myVariable = "myendpoint"
  $scope.myVariable = "http://130.37.70.100:7201/repositories/project_ontology/query?query="



	// ###################### Question 5
	// Create 2 different data visualisations based on two SPARQL queries
	// For each of the visualisation:
	// (1) Run the SPARQL query on the console
	// (2) Copy the SPARQL results a scope variable, ex. $scope.myresult = []
	// (3) Associate the SPARQL query to another scope variable, ex. $scope.myquery = "myquery"
	// Examples :
	// ex1 : a piechart of the most frequent classes,
	// ex2 : a barplot of the most frequent properties





  $scope.visualisationData1 ;
  $scope.myAnimals = [3, 3, 3,3, 2];
  $scope.myAnimalgroups = [ "Arthropods","Fish","Insects", "Reptiles", "Amphibians"];
  $scope.informationText1= "In the graphs above you can see how many animals of each animal group are available in the zoo. We have 3 animals in all the animal groups, except for the amphibians, in which we have only 2 animals." ;

  $scope.visualisationData2 ;
  $scope.myAreas = [2, 2, 2, 2];
  $scope.myClimatezones = [ "Cold_area", "Neutral_area","Underwater_area", "Warm_area" ];
  $scope.informationText2=" In the graphs above, you can see that the zoo contains 4 different climate zones. Each climate zone contains 2 areas in which the animals live who need this climate zone." ;




	// use a third variable if you want to visualise labels
	$scope.visualisationLabels1 ;
	$scope.visualisationLabels2 ;


	// ###################### Question 6
	// Create an interaction with the triplestore by filling the following method
	// The function needs to include : some arguments sent by the html + an http call to the sparql endpoint + a variable storing the results to be visualised
	// use the native function encodeURI(mySparqlQuery) to encode your query as a URL
  $scope.myDynamicLabels = [];
  $scope.myDynamicData = [];


  $scope.sparqlquery1 = "SELECT ?member ?area WHERE { ?member <http://www.animalszoo.org/group4/livesIn> ?area. }"
  $scope.sparqlquery2 = "SELECT ?area (COUNT(?member) AS ?nbr_animals) WHERE {?member <http://www.animalszoo.org/group4/livesIn> ?area. } GROUP BY (?area) ORDER BY DESC(?nbr_animals)"

    console.log($scope.myVariable+encodeURI($scope.sparqlquery1).replace(/#/g, '%23'));
        $http( {
        method: "GET",
        headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'},
        url : $scope.myVariable+encodeURI($scope.sparqlquery1).replace(/#/g, '%23'),

    } )
    console.log($scope.myVariable+encodeURI($scope.sparqlquery2).replace(/#/g, '%23'));
      $http( {
      method: "GET",
      headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'},
      url : $scope.myVariable+encodeURI($scope.sparqlquery2).replace(/#/g, '%23'),

  } )
  .success(function(data, status ) {

      console.log(data);
      $scope.resultQ1=data;
//        angular.foreach(data, function(value, key){
//            this.push(key +  ' ', value)
//        })
  angular.forEach(data.results.bindings, function(val)
      {
          $scope.myDynamicLabels.push(val.disc.value);
          $scope.myDynamicData.push(val.c.value);
      })
  })
  .error(function(error ){
      console.log('Error');
  });



  $scope.myDynamicLabels1 = [];
  $scope.myDynamicData1 = [];

// TODO : type here code for your Ex 2
$scope.doMyAction = function(){
      console.log('test');
      $scope.result = "Here is my input: " +$scope.myInput+"!";

      $scope.dynamicQuery = "Select ?s where { ?s a Select ?s where { ?s a <http://www.animalszoo.org/group4#"+$scope.myInput+"> } limit 5";
      //$scope.dynamicQuery = $scope.myInput;
      console.log($scope.myVariable+encodeURI($scope.myInput).replace(/#/g, '%23'));
      $http( {
      method: "GET",
      headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'},
      url : $scope.myVariable+encodeURI($scope.myInput).replace(/#/g, '%23'),

  } )
  .success(function(data, status ) {

      console.log(data);
      $scope.resultQ2=data;
  })
  .error(function(error ){
      console.log('Error');
  });



};



}
