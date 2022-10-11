package highradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class AdvSearchData
 */
@WebServlet("/AdvSearchData")
public class AdvSearchData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdvSearchData() {
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
 		String doc_id =request.getParameter("doc_id");
 		int cust_number= Integer.parseInt(request.getParameter("cust_number"));
 		int invoice_id= Integer.parseInt(request.getParameter("invoice_id"));
 		String buisness_year =request.getParameter("buisness_year");
 		
 		Connection con = Crud.createConnect();
 		String query = "SELECT sl_no,business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id from winter_internship WHERE doc_id=? AND cust_number=? AND invoice_id=? AND buisness_year=?";
 		PreparedStatement ps = con.prepareStatement(query);
 		ps.setString(1, doc_id);
 		ps.setInt(2,cust_number);
 		ps.setInt(3,invoice_id);
 		ps.setString(4, buisness_year);
 		
 		ResultSet rs = ps.executeQuery();
 		
 		while(rs.next())
 		{
 		
 			Data inv = new Data();
 			inv.setSl_no(rs.getInt("sl_no"));
 		    inv.setBusiness_code(rs.getString("business_code")); 
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
 		    inv.setBaseline_create_date(rs.getString("baseline_create_date"));
 		    inv.setCust_payment_terms(rs.getString("cust_payment_terms"));
 		    inv.setInvoice_id(rs.getInt("invoice_id"));

 		    alldata.add(inv);
 		  
 		}
 		
 		}
 		catch(Exception e)
 		{
 			e.printStackTrace();
 		}
 		

	
	Gson gson = new Gson();
	String invoices  = gson.toJson(alldata);
    response.getWriter().print(invoices);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
