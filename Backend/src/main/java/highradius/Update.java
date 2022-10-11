package highradius;

import java.io.IOException;
import java.sql.*;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.google.gson.Gson;




/**
 * Servlet implementation class Update
 */
@WebServlet("/Update")
public class Update extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Update() {
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
			
	 		int sl_no= Integer.parseInt(request.getParameter("sl_no"));
	 		String inv_curr =request.getParameter("invoice_currency");
	 		String cust_payment =request.getParameter("cust_payment_terms");
	 		Connection con = Crud.createConnect();
	 		String query = "UPDATE winter_internship set invoice_currency=?,cust_payment_terms=? WHERE sl_no=?";
	 		PreparedStatement ps = con.prepareStatement(query);
	 		ps.setString(1, inv_curr);
	 		ps.setString(2,cust_payment);
	 		ps.setInt(3,sl_no);
	 		   if(ps.executeUpdate()>0) {
	 			  Response.put("update",true);
	 		   }
	 		   else {
	 			  Response.put("update",false);
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
