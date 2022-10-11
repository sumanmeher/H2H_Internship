package highradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


@WebServlet("/Fetch")
public class Fetch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Fetch() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		     ArrayList<Data> alldata = new ArrayList<>();
		 		try {
		 		Connection con = Crud.createConnect();
		 		Statement st = con.createStatement();
		 		String query = "SELECT winter_internship.sl_no,winter_internship.business_code,winter_internship.cust_number,winter_internship.clear_date,winter_internship.buisness_year,winter_internship.doc_id,winter_internship.posting_date,winter_internship.document_create_date,winter_internship.document_create_date1,winter_internship.due_in_date,winter_internship.invoice_currency,winter_internship.document_type,winter_internship.posting_id,winter_internship.area_business,winter_internship.total_open_amount,winter_internship.baseline_create_date,winter_internship.cust_payment_terms,winter_internship.invoice_id,winter_internship.isOpen,winter_internship.aging_bucket,winter_internship.is_deleted,business.business_name, customer.name_customer  FROM winter_internship LEFT JOIN business ON winter_internship.business_code = business.business_code RIGHT JOIN customer ON winter_internship.cust_number = customer.cust_number where sl_no <> 0 ORDER BY sl_no;";
		 		ResultSet rs = st.executeQuery(query);
		 		while(rs.next())
		 		{  
		 			Data inv = new Data();
		 			inv.setSl_no(rs.getInt("sl_no"));
		 		    inv.setBusiness_code(rs.getString("business_code")); 
		 		    inv.setBusiness_name(rs.getString("business_name"));
		 		    inv.setName_customer(rs.getString("name_customer"));
		 		    inv.setCust_number(rs.getInt("cust_number"));
		 		    inv.setClear_date(rs.getString("clear_date"));
		 		    inv.setBuisness_year(rs.getString("buisness_year"));
		 		    inv.setDoc_id(rs.getString("doc_id"));
		 		    inv.setPosting_date(rs.getString("posting_date"));
		 		    inv.setDocument_create_date(rs.getString("document_create_date"));
		 		    inv.setDue_in_date(rs.getString("due_in_date"));
		 		    inv.setInvoice_currency(rs.getString("invoice_currency"));
		 		    inv.setDocument_type(rs.getString("document_type"));
		 		    inv.setPosting_id(rs.getInt("posting_id"));
		 		    inv.setTotal_open_amount(rs.getFloat("total_open_amount"));
		 		    inv.setConverted_usd(rs.getFloat("total_open_amount"));
		 		    inv.setBaseline_create_date(rs.getString("baseline_create_date"));
		 		    inv.setCust_payment_terms(rs.getString("cust_payment_terms"));
		 		    inv.setInvoice_id(rs.getInt("invoice_id"));
		 		    
		 		      
		 		
		 			   inv.setAging_bucket(rs.getString("aging_bucket"));
		 		   
		 	         

		 		    alldata.add(inv);
		 		  
		 		}
		 		
		 		}
		 		catch(Exception e)
		 		{
		 			e.printStackTrace();
		 		}
		 		
		
			
			Gson gson =  new GsonBuilder().serializeNulls().create();
			String invoices  = gson.toJson(alldata);
            response.getWriter().print(invoices); //getWriter() returns a PrintWriter object that can send character text to the client. 
			
			
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}