// Copyright (c) 2023, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt


frappe.ui.form.on('MRP for Multi Assembly', {
    refresh: function(frm) {
        $('.layout-side-section').hide();
        $('.layout-main-section-wrapper').css('margin-left', '0');
    }
});

frappe.ui.form.on('MRP for Multi Assembly', {
	// refresh: function(frm) {

	// }
});


frappe.ui.form.on('MRP for Multi Assembly', {
	
	show_report: function(frm) {

        frm.clear_table("table");
        frm.refresh_field('table');

        if (frm.doc.sales_order && frm.doc.sales_order.length > 0 && frm.doc.production_plan && frm.doc.production_plan.length > 0) {
            frm.clear_table("sales_order");
            frm.refresh_field('sales_order');
        }


		frm.call({
			method: 'get_report',//function name defined in python
			doc: frm.doc, //current document
		});

	}

});



frappe.ui.form.on("MRP for Multi Assembly", {
    refresh: function(frm) {
        frm.fields_dict['sales_order'].get_query = function(doc, cdt, cdn) {
            return {
                filters: [
                    ["Sales Order", "docstatus", '=', 1]
                ]
            };
        };
    }
});

frappe.ui.form.on("MRP for Multi Assembly", {
    refresh: function(frm) {
            frm.set_query("production_plan", function() { // Replace with the name of the link field
                return {
                    filters: [
                        ["Production Plan", "status", 'in', ["Submitted", "Material Requested", "In Process"]] // Replace with your actual filter criteria
                    ]
                };
            });
        }
    });



    frappe.ui.form.on('MRP for Multi Assembly', {
        export_report(frm) {
            frappe.run_serially([
                () => {
                    // Temporarily bypass permissions
                    frm.bypass_doctype_permissions = true;
                },
                () => {
                    // Your export logic here
                    frappe.require("data_import_tools.bundle.js", () => {
                        frm.data_exporter = new frappe.data_import.DataExporter(
                            'Child MRP for Multi Assembly',
                            "Insert New Records"
                        );
                    });
                },
                () => {
                    // Reset bypass permissions flag after export
                    frm.bypass_doctype_permissions = false;
                }
            ]);
        },
    });
    
