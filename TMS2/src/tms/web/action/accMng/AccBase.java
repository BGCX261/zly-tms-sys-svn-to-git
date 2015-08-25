package tms.web.action.accMng;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import tms.bean.AccBaseBean;
import tms.web.action.BaseAction;
import tms.web.tools.BaseTools;
import tms.web.tools.DBUtil;
import tms.web.tools.IndexTool;
import tms.web.tools.PwdUtil;

/**
 * 用于处理个人账户信息的Action类
 * @author zly
 * @date 2012-04-27 上午10:50:51
 * 
 */
public class AccBase extends BaseAction {
	private static final long serialVersionUID = 1L;
	private Map<String, Object> json;//用于返回的json格式数据
		
	/**
	 * 更新账户密码
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String updatePwd() {
		AccBaseBean sessionBean = (AccBaseBean)session.get("login");//获得当前登录账户相关信息
		String unid = sessionBean.getUnid();
		Map<String, Object> params = BaseTools.getParams();//从前台获得数据
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			//验证当前密码是否正确
			List count = DBUtil.getList(
					"SELECT * FROM USERINFO WHERE PASSWORD=? AND USERID = ?",
					new Object[] { 
							PwdUtil.MD5(params.get("PassWord").toString()),
							unid		
					});
			if(count.size()==0){//当前密码输入不正确
				//通过json传递相关错误信息
				map.put("msg", "当前密码输入错误，请输入正确的密码！");
				map.put("tag", false);
				this.setJson(map);
				return SUCCESS;
			}
			//创建模板语句
			DBUtil.query(
							"UPDATE USERINFO SET PASSWORD=?,UPDATETIME=? WHERE USERID = ?",
							new Object[] { 
									PwdUtil.MD5(params.get("NewPassword").toString()),
									new Date().getTime(),
									unid		
							});
		} catch (Exception e) {
			//通过json传递相关错误信息
			map.put("msg", "");
			map.put("error", e.toString());
			map.put("tag", false);
			this.setJson(map);
			return SUCCESS;
		}
		map.put("msg", "修改用户【"+sessionBean.getLogin()+"】密码成功");
		map.put("error", "");
		map.put("tag", true);
		this.setJson(map);
		return SUCCESS;
	}
	
	public String queryAccInfo() {//-------------查看个人信息------------------------
		Map<String, Object> map = new HashMap<String, Object>();//1
		AccBaseBean sessionBean = (AccBaseBean)session.get("login");//获得当前登录账户相关信息
		String unid = sessionBean.getUnid();
		String listStr;
		List list = null;
			listStr = "SELECT * FROM USERINFO  WHERE USERID ='"+unid+"';";//执行sql分页语句
		try {
			//5
			list = DBUtil.getList(listStr);//执行sql分页语句
		} catch (Exception e) {
			//通过json传递相关错误信息
			map.put("msg", "");
			map.put("error", e.toString());
			map.put("tag", false);
			this.setJson(map);//map转换为json
			return SUCCESS;
		}
		//6
		//通过json传递相关错误信息
		map.put("root", list);
		map.put("tag", true);
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
