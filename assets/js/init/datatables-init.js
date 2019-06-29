(function ($) {
    //    "use strict";


    /*  Data Table
    -------------*/


    var url = 'https://etmarketsapis.indiatimes.com/ET_Stats/dividend?pagesize=500&pageno=1&sortby=xdDateStr&sortorder=asc&companyid=0&year=0&filtertype=latest&marketcap=All&duration=U';

    $('#bootstrap-data-table').DataTable({
      ajax: {
        url: url,
        dataSrc: 'searchresult'
      },
      columns: [
        { data: 'companyName' },
        { data: 'current' },
        { data: 'dividendType' },
        { data: 'value' },
        { data: 'announcementDateStr' },
        { data: 'xdDateStr' }
      ]

        //lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "All"]],
    });



    $('#bootstrap-data-table-export').DataTable({
        dom: 'lBfrtip',
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

	$('#row-select').DataTable( {
			initComplete: function () {
				this.api().columns().every( function () {
					var column = this;
					var select = $('<select class="form-control"><option value=""></option></select>')
						.appendTo( $(column.footer()).empty() )
						.on( 'change', function () {
							var val = $.fn.dataTable.util.escapeRegex(
								$(this).val()
							);

							column
								.search( val ? '^'+val+'$' : '', true, false )
								.draw();
						} );

					column.data().unique().sort().each( function ( d, j ) {
						select.append( '<option value="'+d+'">'+d+'</option>' )
					} );
				} );
			}
		} );






})(jQuery);
