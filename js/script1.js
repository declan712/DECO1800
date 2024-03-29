jQuery.expr[':'].contains = function(a, i, m) {
	return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};
function getYear(year) {
	if(year) {
		return year.match(/[\d]{4}/);
	}
}
function iterateResults(data) {

	console.log(data);

	var recordTemplate = $(".record-template");

	$.each(data.result.records, function(recordID, recordValue) {

		var recordName = recordValue["Name"];
		var recordYear = getYear(recordValue["Date"]);
		var recordBranch = recordValue["Branch"];
		var recordPosition = recordValue["Position"];
		var recordPay = recordValue["Remuneration"];
        var recordRemarks = recordValue["Remarks"];

		if(recordName && recordBranch && recordPosition && recordPay && recordRemarks && recordYear) {
			var clonedRecordTemplate = recordTemplate.clone();
			clonedRecordTemplate.attr("id", "record-" + recordID).removeClass("record-template");
			clonedRecordTemplate.appendTo("#records");

			$("#record-" + recordID + " h2").html(recordName);
            $("#record-" + recordID + " .year").html(recordYear);
            $("#record-" + recordID + " .branch").html(recordBranch);
            $("#record-" + recordID + " .position").html(recordPosition);
            $("#record-" + recordID + " .pay").html(recordPay);
            $("#record-" + recordID + " .remarks").html(recordRemarks);
        
			// $("#record-" + recordID + " img").attr("src", recordImage);

		}

    });
    $("#record-count strong").text($(".record:visible").length);
	$("#filter-text").keyup(function() {
	
		var searchTerm = $(this).val();
		console.log(searchTerm);
	
		$(".record").hide();
		$(".record:contains('" + searchTerm + "')").show();
		$(".record-template").hide();
	
		$("#record-count strong").text($(".record:visible").length);
	
	});
	setTimeout(function() {
		$("#loading").addClass("loaded");
	}, 500); // 0.5 second delay

}

$(document).ready(function() {

    $("#search-button").click(function(event) {
        event.preventDefault();
        // alert(document.forms["search"]["searchbar"].value);
        // searchData(document.forms["search"]["searchbar"].value);
        queryData(document.forms["search"]["searchbar"].value);
    });

    $("#filter").keypress(function(e) {
        if (e.which == 13) {
            event.preventDefault();
        }
    })
    $("#searchbar").keypress(function(e) {
        if (e.which == 13) {
            event.preventDefault();
            queryData(document.forms["search"]["searchbar"].value);
        }
    })


});

function searchData(query) {   
    $("#records").html("");
    $("#loading").removeClass("loaded");
    var data = {
        resource_id: 'cdafbbbf-c9ca-46a1-9f18-ecd9e8943040', // the resource id
        limit: 100, // get 5 results
        q: query // query for 'X'
      };
      $.ajax({
        url: 'https://data.qld.gov.au/api/3/action/datastore_search',
        data: data,
        //dataType: 'jsonp',
        cache: true,
        success: function(data) {
        //   alert('Total results found: ' + data.result.total)
        //   jsonAsString = JSON.stringify(data, null, 2);
        //   $("#results").html(jsonAsString);
            iterateResults(data);
        }
      });
};

function queryData(query) {
    $("#records").html("");
    $("#loading").removeClass("loaded");
    var resource_id = 'cdafbbbf-c9ca-46a1-9f18-ecd9e8943040'
    var data = {
        resource_id: 'cdafbbbf-c9ca-46a1-9f18-ecd9e8943040', // the resource id
        limit: 100, // get 5 results
        q: query // query for 'X'
      };
      $.ajax({
        url: 'https://data.qld.gov.au/api/3/action/datastore_search_sql?sql=SELECT * FROM %22'+resource_id+'%22 WHERE %22Name%22 LIKE %27%25'+query+'%25%27 OR %22Position%22 LIKE %27%25'+query+'%25%27 OR %22Remuneration%22 LIKE %27%25'+query+'%25%27 OR %22Remarks%22 LIKE %27%25'+query+'%25%27 OR %22Branch%22 LIKE %27%25'+query+'%25%27',
        // data: data,
        dataType: 'jsonp',
        cache: true,
        success: function(data) {
        //   alert('Total results found: ' + data.result.total)
        //   jsonAsString = JSON.stringify(data, null, 2);
        //   $("#results").html(jsonAsString);
            iterateResults(data);
        }
      });
};

