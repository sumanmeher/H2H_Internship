package highradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class Add
 */
@WebServlet("/Add")
public class Add extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Add() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		HashMap<Object,Object> Response =new HashMap<Object,Object>();
		try {
			String business_code = request.getParameter("business_code");
			int cust_number= Integer.parseInt(request.getParameter("cust_number"));
			String clear_date = request.getParameter("clear_date");
	        String business_year = request.getParameter("business_year");
	 		String doc_id = request.getParameter("doc_id");
	 		java.util.Date pd = new SimpleDateFormat("yyyy-MM-dd").parse(request.getParameter("posting_date"));
	 		java.sql.Date posting_date = new java.sql.Date(pd.getTime());
	 		java.util.Date DCD = new SimpleDateFormat("yyyy-MM-dd").parse(request.getParameter("document_create_date"));
	 		java.sql.Date document_create_date = new java.sql.Date(DCD.getTime());
	 		java.util.Date DID = new SimpleDateFormat("yyyy-MM-dd").parse(request.getParameter("due_in_date"));
	 		java.sql.Date due_in_date = new java.sql.Date(DID.getTime());
	        String invoice_currency = request.getParameter("invoice_currency");
	        String document_type = request.getParameter("document_type");
	        int posting_id = Integer.parseInt(request.getParameter("posting_id"));
	        float total_open_amount = Float.parseFloat(request.getParameter("total_open_amount"));
	        java.util.Date BCD = new SimpleDateFormat("yyyy-MM-dd").parse(request.getParameter("baseline_create_date"));
	        java.sql.Date baseline_create_date = new java.sql.Date(BCD.getTime());
	        String cust_payment_terms = request.getParameter("cust_payment_terms");
	        int invoice_id= Integer.parseInt(request.getParameter("invid"));
	        
	        
	        
	 		Connection con = Crud.createConnect();
	 		String query = "INSERT INTO winter_internship (sl_no,business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
	 		String q2 = "INSERT INTO customer VALUES (?,?)";
	 		String q3 = "INSERT INTO business VALUES (?,?)";
	 		
	 		Statement stmt = con.createStatement();
	 		ResultSet rs = stmt.executeQuery("select sl_no from winter_internship order by sl_no DESC");
	 		rs.next();
	 		int row_cnt = rs.getInt("sl_no")+1;
	 		
	 		PreparedStatement ps2 = con.prepareStatement(q2);
	 		ps2.setInt(1,cust_number);
	 		ps2.setString(2, "XYZ");
	 		
	 		PreparedStatement ps3 = con.prepareStatement(q3);
	 		ps3.setString(1,business_code);
	 		ps3.setString(2, "XYZ");
	 		
	 		PreparedStatement ps = con.prepareStatement(query);
	 		ps.setInt(1, row_cnt);
	 		ps.setString(2,business_code);
	 		ps.setInt(3,cust_number);
	 		ps.setString(4,clear_date);
	 		ps.setString(5,business_year);
	 		ps.setString(6,doc_id);
	 		ps.setDate(7, posting_date);
	 		ps.setDate(8, document_create_date);
	 		ps.setDate(9, due_in_date);
	 		ps.setString(10,invoice_currency);
	 		ps.setString(11,document_type);
	 		ps.setInt(12,posting_id);
	 		ps.setFloat(13,total_open_amount);
	 		ps.setDate(14,baseline_create_date);
	 		ps.setString(15,cust_payment_terms);
	 		ps.setInt(16,invoice_id);
	 		
	 		
	 		   if(ps2.executeUpdate()>0 && ps3.executeUpdate()>0 && ps.executeUpdate()>0) {
	 			  Response.put("added",true);
	 		   }
	 		   else {
	 			  Response.put("added",false);
	 		   }
	 		  Gson gson = new Gson();
	 			String ResponseJson  = gson.toJson(Response);
	 		    response.getWriter().append(ResponseJson);
	 		
	 		}
	 		catch(Exception e)
	 		{
	 			e.printStackTrace();
	 		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
