tasksController = function() {		// singleton, to manage state reliably
	
	var taskPage;					// local parameter for the page parameter
	var initalised = false;
	
	return {
		init : function(page) {
			
			if (!initalised) {		// ensures Controller is only initalised once 
				taskPage = page;
				
				$(taskPage).find
					('[required="required"]').prev('label').append
					('<span>*</span>').children('span').addClass('required');
				
				$(taskPage).find('tbody tr:even').addClass('even');
				
				$(taskPage).find('#btnAddTask').click(function(evt) {
					evt.preventDefault();					
					$(taskPage).find('#taskCreation').removeClass('not');
				});
				
				$(taskPage).find('tbody tr').click(function(evt) {
					$(evt.target).closest('td').siblings().andSelf().toggleClass('rowHighlight');
				});
				
				$(taskPage).find('#tblTasks tbody').on('click', '.deleteRow', function(evt) {
					evt.preventDefault();
					$(evt.target).parents('tr').remove();
				});
				
				$(taskPage).find('#saveTask').click(function(evt) {
					evt.preventDefault();
					
					if ($(taskPage).find('form').valid()) {
						var task = $('form').toObject();
						$('#taskRow').tmpl(task).appendTo($(taskPage).find('#tblTasks tbody'));
					}
				});
				
				initalised = true;
			}
		}
	}
}();