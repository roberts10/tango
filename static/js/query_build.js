// This file contains Javascript to configure QueryBuilder for VA.html
// The form properties are set here
// The action of the buttons are set here
// When submitting the SQL query is sent to qb_cgi.py

// This block sets the default search parameters
var rules_basic = {

    rules: [{
    id: 'diagnostic_text',
    operator: 'fulltext',
    },
    {
    id: 'path_last_name_drop',
    operator: 'contains',
    value: '',
    }]
}


//This block sets the types of filters and the operators they use
$('#builder-basic').queryBuilder({
  plugins: ['bt-tooltip-errors'],
  
  filters: [{
    id: 'diagnostic_text',
    label: 'Terms',
    type: 'string',
    //operators: ['contains', 'begins_with', 'regexp', 'not_regexp', 'MATCH']
    operators: ['fulltext' ,'not_regexp']

  },
  {
    id: 'path_last_name_drop',
    label: 'Attending',
    type: 'string',
    input: 'select',
    values: {
        ANDERS: 'Anders',
        ARGANI: 'Argani',
        CUDA: 'Cuda',
        EPSTEIN: 'Epstein',
        EBERHART: 'Eberhart',
        CIMINO: 'Cimino-Mathews',
        DUFFIELD: 'Duffield',
        ERDAG: 'Erdag',
        GOCKE: 'Gocke',
        HRUBAN: 'Hruban',
        KURMAN: 'Kurman',
        MCCARTHY: 'McCarthy',
        MONTGOMERY: 'Montgomery', 
        RODRIGUEZ: 'Rodriguez',
        ROOPER: 'Rooper',
        RONNETT: 'Ronnett',
        TAUBE: 'Taube',
        THOMPSON: 'Thompson',
        VANG: 'Vang',
        VOLTAGGIO: 'Voltaggio',
        WESTRA: 'Westra',
        WOOD: 'Wood',
    },
    operators: ['contains', 'not_regexp'],
 },
  {
    id: 'path_last_name',
    label: 'Attending (free text)',
    type: 'string',
    operators: ['contains', 'not_regexp']
    //operators: ['contains', 'begins_with', 'regexp', 'not_regexp']

  },

  ],

 rules: rules_basic
     

});

// reset builder
$('.reset').on('click', function() {
  var target = $(this).data('target');
  
  $('#builder-'+target).queryBuilder('reset');
  $('#query').text('SQL query text');
});

// set rules
$('.set-json').on('click', function() {
  var target = $(this).data('target');
  var rules = window['rules_'+target];
  
  $('#builder-'+target).queryBuilder('setRules', rules);
});

// Function triggered by the "submit" button
var myFunction = function(){
        var base = 'SELECT * FROM pds_dev.ap_search ';
	var result = $('#builder-basic').queryBuilder('getSQL',  false); 
	var query = (base + "WHERE " + result.sql + " LIMIT 500");
        //$('#query').text(query);

        $('#result').html("SEARCHING" );

   $.get('/scott/qb_cgi.py', query, function(data)
           {
            $('#result').html(data);
           })
}

$('.submit').on('click', myFunction)

/*
$(document).on('keydown', function(event) {
    var keycode = event.which;
    if(keycode == 13) {
        myFunction();
    }
});

*/
