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
 * Servlet implementation class UpdateAging
 */
@WebServlet("/UpdateAging")
public class UpdateAging extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateAging() {
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
			
	 		String doc_id= request.getParameter("doc_id");
	 		String agingbucket =request.getParameter("aging_bucket");
	 		Connection con = Crud.createConnect();
	 		String query = "UPDATE winter_internship set aging_bucket=? WHERE doc_id=?";
	 		PreparedStatement ps = con.prepareStatement(query);
	 		ps.setString(1, agingbucket);
	 		ps.setString(2,doc_id);
	 		   if(ps.executeUpdate()>0) {
	 			  Response.put("updateaging",true);
	 		   }
	 		   else {
	 			  Response.put("updateaging",false);
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
