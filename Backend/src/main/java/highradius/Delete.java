package highradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class Delete
 */
@WebServlet("/Delete")
public class Delete extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Delete() {
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
	 		int cust_number= Integer.parseInt(request.getParameter("cust_number"));
	 		String business_code = request.getParameter("business_code");
	 		Connection con = Crud.createConnect();
	 		String query = "DELETE FROM winter_internship WHERE sl_no IN (?)";
	 		PreparedStatement ps = con.prepareStatement(query);
	 		ps.setInt(1,sl_no);
	 		   if(ps.executeUpdate()>0) {
	 			  Response.put("delete",true);
	 		   }
	 		   else {
	 			  Response.put("delete",false);
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
