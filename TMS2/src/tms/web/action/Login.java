package tms.web.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import javax.servlet.http.HttpServletRequest;
import tms.web.tools.PwdUtil;
import tms.bean.AccBaseBean;
import tms.web.tools.BaseTools;
import tms.web.tools.DBUtil;


/**
 * 用于处理登陆信息的Action类
 * @author zly
 * @date 2012-03-28 下午6:50:51
 * 
 */
public class Login extends BaseAction {
	private static final long serialVersionUID = 1L;
	private Map<String, Object> json;//用于返回的json格式数据
	private AccBaseBean accBaseBean;

	public AccBaseBean getAccBaseBean() {
		return accBaseBean;
	}
	public void setAccBaseBean(AccBaseBean accBaseBean) {
		this.accBaseBean = accBaseBean;
	}
	/**
	 * @return 通过数据库进行登陆验证
	 */
	@SuppressWarnings("unchecked")
	public String Login(){
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> params = BaseTools.getParams();
		int result = 0;
		String UserID="";
		List list = null;
		try {
			String pwd = params.get("PassWord").toString();//获得前台输入的明文
			String md5pwd = PwdUtil.MD5(pwd);//获得经过MD5加密的密文
			//Mysql数据库字符串查找默认不区分大小写 需要通过BINARY做出声明
			list = DBUtil.getList("SELECT * FROM USERINFO WHERE LOGIN= BINARY '"
					+params.get("Login")+"' AND PASSWORD= BINARY '"+  md5pwd+ "'");//获得所有数据总数 用于分页
			result = list.size();
			if(result!=0)
			{
				String unid = "";
				for (Object object : list) {
					Map temp = (Map)object;
					//unid = (String) temp.get("UserID");
					accBaseBean.setUnid((String)temp.get("UserID"));
					accBaseBean.setLogin((String)temp.get("Login"));
					accBaseBean.setPassword((String)temp.get("PassWord"));
					accBaseBean.setUserName((String)temp.get("Name"));
					accBaseBean.setEmail((String)temp.get("Email"));
					accBaseBean.setUsertype((Integer)temp.get("UserType"));
					accBaseBean.setDeptName((String)temp.get("DeptName"));
					accBaseBean.setUserGroup((String)temp.get("UserGroup"));
					accBaseBean.setAccessProNum((Integer)temp.get("AccessProNum"));
					accBaseBean.setAccessList((Integer)temp.get("AccessList"));
}
				session.put("login", accBaseBean);
			}
		} catch (Exception e) {
			//通过json传递相关错误信息
			map.put("msg", "");
			map.put("error", e.toString());
			map.put("tag", false);
			this.setJson(map);//map转换为json
			return SUCCESS;	
		}
		//通过json传递相关错误信息
		map.put("count",result);
		this.setJson(map);
		return SUCCESS;
	}

	public Map<String, Object> getJson() {
		return json;
	}

	public void setJson(Map<String, Object> json) {
		this.json = json;
	}
}
