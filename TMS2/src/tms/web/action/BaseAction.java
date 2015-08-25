/**
 * 
 */
package tms.web.action;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

/**
 * 
 * @author zly
 * @date 2011-11-2 上午09:19:42
 * 
 */
public class BaseAction extends ActionSupport implements SessionAware , ServletRequestAware {
	 
	private static final long serialVersionUID = 1L;
	//private static final long serialVersionUID = 1L;
	protected Map session;
	/* (non-Javadoc)
	 * @see org.apache.struts2.interceptor.SessionAware#setSession(java.util.Map)
	 */
	public void setSession(Map arg0) {
		// TODO Auto-generated method stub
		this.session = arg0;
	}
	HttpServletRequest request;    
    HttpServletResponse response;   
  
    public void setServletRequest(HttpServletRequest request) {    
        this.request = request;    
    }   
  
    public void setServletResponse(HttpServletResponse response) {    
        this.response = response;    
    }   
  
    public String execute() {    
        HttpSession session = request.getSession();    
        return SUCCESS;    
    }    


}
