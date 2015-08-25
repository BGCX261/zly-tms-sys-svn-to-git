package tms.web.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import tms.web.tools.BaseTools;
import tms.web.tools.DBUtil;

public class Promanage extends BaseAction{
	private static final long serialVersionUID = 1L;
	private Map<String, Object> json;//用于返回的json格式数据
	
	/**
	 * @return 通过数据库获得分页相关的数据以及表单数据
	 */
	@SuppressWarnings("unchecked")
	public String queryPro(){
		Map<String, Object> map = new HashMap<String, Object>();//1
		int proStart = Integer.valueOf(String.valueOf(BaseTools.getParams().get("start"))).intValue();//当前分页开始的第一条数据
		int proLimit = Integer.valueOf(String.valueOf(BaseTools.getParams().get("limit"))).intValue();//当前分页限制每页条数
		String searchStr = (String)BaseTools.getParams().get("search");
		String listStr;
		String countStr;
		List list = null;
		int totle = 0;
		if(null==searchStr){
		    listStr = "SELECT * FROM PROJECT LIMIT "+proStart+","+proLimit+";";//执行sql分页语句
			countStr = "SELECT COUNT(*) FROM PROJECT ";//获得所有数据总数 用于分页
		}
		else{
			listStr = "SELECT * FROM PROJECT  WHERE PROJECTNAME LIKE '%"+searchStr
			+"%' OR PROJECTVERSION LIKE '%"+searchStr+"%' OR PROSTATUS LIKE '%"+searchStr
			+"%' OR PROJECTMANAGER LIKE '%"+searchStr+"%'  ORDER BY UPDATETIME DESC LIMIT "
			+proStart+","+proLimit+";";
			countStr = "SELECT COUNT(*) FROM PROJECT  WHERE PROJECTNAME LIKE '%"+searchStr
			+"%' OR PROJECTVERSION LIKE '%"+searchStr+"%' OR PROSTATUS LIKE '%"+searchStr
			+"%' OR PROJECTMANAGER LIKE '%"+searchStr+"%'";
		}
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
	 * 新增项目操作
	 * @return
	 */
	public String addPro() {
		Map params=BaseTools.getParams();//获得前台的数据
		Map<String, Object> map = new HashMap<String, Object>();//要返回到前台的数据
		SimpleDateFormat sdf;
		Date statdate;
		Date enddate;
		//时间格式转换
		sdf = new SimpleDateFormat("yyyy-MM-dd");
		try{
			statdate = sdf.parse((String)params.get("StartTime"));
			enddate = sdf.parse((String)params.get("ExpEndTime"));
			DBUtil.query("INSERT INTO  PROJECT(PROJECTID,PROJECTNAME,PROSTATUS,PROJECTMANAGER," +
					"PROJECTVERSION,STARTTIME,EXPENDTIME,CREATETIME,UPDATETIME)" +
					"VALUE('"+ UUID.randomUUID()+"',?,?,?,?,?,?,?,?)",
					new Object[]{
					    params.get("ProjectName"),
					    params.get("ProStatus"),
					    params.get("ProjectManager"),
						params.get("ProjectVersion"),
						statdate.getTime(),
						enddate.getTime(),
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
		map.put("msg", "新增项目：【" + params.get("ProjectName") + "】成功。");
		this.setJson(map);
		return SUCCESS;
	}
	
	/**
	 * 更新项目
	 * @return
	 */
	public String updPro() {
		Map params=BaseTools.getParams();//获得前台的数据
		Map<String, Object> map = new HashMap<String, Object>();//要返回到前台的数据
		try {
			DBUtil.query("UPDATE  PROJECT  SET PROJECTNAME=?,PROJECTMANAGER=?,PROJECTVERSION=?," +
					"PROSTATUS=?,UPDATETIME=? WHERE PROJECTID=? ",
				new Object[]{
					params.get("ProjectName"),
				    params.get("ProjectManager"),
					params.get("ProjectVersion"),
					params.get("ProStatus"),
					//params.get("StartTime"),
					//params.get("ExpEndTime"),
					new Date().getTime(),//更新时间
					params.get("ProjectID"),
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
		map.put("msg", "更新项目：【" + params.get("ProjectName") + "】成功.");
		this.setJson(map);
		return SUCCESS;
	}
	
	/**
	 * 根据前台传递的ProjectID删除表中数据
	 * @return 
	 */
	public String delPro() {
		String params = (String) BaseTools.getParams().get("ProjectID");//获得待删除CaseID
		Object[] param = params.split(",");//多个数据采用,分割
		StringBuilder sb = new StringBuilder(
				"DELETE FROM PROJECT WHERE ProjectID IN (");
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
		map.put("msg", "删除【" + BaseTools.getParams().get("ProjectName") + "】成功.");
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
