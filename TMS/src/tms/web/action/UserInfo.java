package tms.web.action;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import tms.web.tools.BaseTools;
import tms.web.tools.DBUtil;
import tms.web.tools.IndexTool;
/**
 * 用于处理账户信息的Action类
 * @author zly
 * @date 2011-11-17 上午10:50:51
 * 
 */
public class UserInfo extends BaseAction {
	private static final long serialVersionUID = 1L;
	private Map<String, Object> json;//用于返回的json格式数据
	
	/**
	 * @return 通过数据库获得分页相关的数据以及表单数据
	 */
	@SuppressWarnings("unchecked")
	public String query(){
		Map<String, Object> map = new HashMap<String, Object>();//1
		//2
		int userStart = Integer.valueOf(String.valueOf(BaseTools.getParams().get("start"))).intValue();//当前分页开始的第一条数据
		int userLimit = Integer.valueOf(String.valueOf(BaseTools.getParams().get("limit"))).intValue();//当前分页限制每页条数
		String listStr;
		String countStr;
		//3
		List list = null;
		int totle = 0;
			listStr = "SELECT * FROM USERINFO  LIMIT "+userStart+","+userLimit+";";//执行sql分页语句
			countStr = "SELECT COUNT(*) FROM USERINFO";//获得所有数据总数 用于分页
		try {
			//5
			list = DBUtil.getList(listStr);//执行sql分页语句
			totle = DBUtil.getTotle(countStr);//获得所有数据总数 用于分页
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
		map.put("totalProperty",totle);
		this.setJson(map);
		return SUCCESS;
	}

	/**
	 * 添加用户操作
	 * @return
	 */
	public String addUser() {
		Map params=BaseTools.getParams();//获得前台的数据
		Map<String, Object> map = new HashMap<String, Object>();//要返回到前台的数据
		try{
			DBUtil.query("INSERT INTO  USERINFO(USERID,LOGIN,PASSWORD,EMAIL,USERTYPE,NAME,DEPTNAME,USERGROUP,CREATETIME,UPDATETIME) " +
					"VALUE('"+ UUID.randomUUID()+"',?,?,?,?,?,?,?,?,?)",
					new Object[]{
					    params.get("Login"),
						"123456",
						params.get("Email"),
						params.get("UserType"),
						params.get("Name"),
						params.get("DeptName"),
						params.get("UserGroup"),
						new Date().getTime(),//创建时间
						new Date().getTime(),//更新时间
				});//3数据库执行相关操作
		}catch (Exception e) {
			//通过json传递相关错误信息
			map.put("msg", "");
			map.put("error", e.toString());
			map.put("tag", false);
			this.setJson(map);
			return SUCCESS;
		}
		map.put("tag", true);
		map.put("msg", "新增用户：【" + params.get("Login") + "】成功，默认密码为：123456.");
		this.setJson(map);
		return SUCCESS;
	}
	
	/**
	 * 更新用户数据
	 * @return
	 */
	public String updUser() {
		Map params=BaseTools.getParams();//获得前台的数据
		Map<String, Object> map = new HashMap<String, Object>();//要返回到前台的数据
		try {
			DBUtil.query("UPDATE  USERINFO  SET LOGIN=?,EMAIL=?,USERTYPE=?,NAME=?,DEPTNAME=?,UserGroup=?,UPDATETIME=? WHERE USERID=? ",
				new Object[]{
					params.get("Login"),
					params.get("Email"),
					params.get("UserType"),
					params.get("Name"),
					params.get("DeptName"),
					params.get("UserGroup"),
					new Date().getTime(),//更新时间
					params.get("UserID")
			});//3数据库执行相关操作
		} catch (Exception e) {
			//通过json传递相关错误信息
			map.put("msg", "");
			map.put("error", e.toString());
			map.put("tag", false);
			this.setJson(map);
			return SUCCESS;
		}
		map.put("tag", true);
		map.put("msg", "更新用户：【" + params.get("Login") + "】成功.");
		this.setJson(map);
		return SUCCESS;
	}
	
	/**
	 * 根据前台传递的UserID删除表中数据
	 * @return 
	 */
	public String delUser() {
		String params = (String) BaseTools.getParams().get("UserID");//获得待删除UNID
		Object[] param = params.split(",");//多个数据采用,分割
		StringBuilder sb = new StringBuilder(
				"DELETE FROM USERINFO WHERE UserID IN (");
		//根据前台传递的删除数量，配置模板待定参数
		for (int i = 0; i < param.length; i++) {
			sb.append("?").append(",");
		}
		sb.deleteCharAt(sb.lastIndexOf(",")).append(")");	
		try {
			DBUtil.query(sb.toString(), param);//执行数据库模板
		} catch (Exception e) {
			//通过json传递相关错误信息
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("msg", "");
			map.put("error", e.toString());
			map.put("tag", false);
			this.setJson(map);
			return SUCCESS;
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("tag", true);
		map.put("msg", "删除【" + BaseTools.getParams().get("Name") + "】成功");
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
