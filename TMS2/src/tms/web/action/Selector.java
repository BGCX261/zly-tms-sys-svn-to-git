package tms.web.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import tms.web.tools.BaseTools;
import tms.web.tools.DBUtil;

/**
 * 用于处理项目管理页面模块多选框的Action类
 * 
 * @author zly
 * @date 2012-5-11 上午10:00:01
 * 
 */
public class Selector extends BaseAction {
	private static final long serialVersionUID = 1L;
	private Map<String, Object> json;// 用于返回的json格式数据

	/**
	 * @return 通过数据库获得分页相关的数据以及表单数据
	 */
	@SuppressWarnings("unchecked")
	public String queryForFromSelector() {
		Map<String, Object> map = new HashMap<String, Object>();
		String proUNID = (String) BaseTools.getParams().get("ProjectID");// 获得前台ProjectID
		List list = null;
		List appList = null;
		StringBuilder sqlbuffer = new StringBuilder(
				"SELECT MODULEID FROM MODPRO WHERE PROJECTID = ? ;");
		StringBuilder sb = new StringBuilder(
				"SELECT MODULEID,MODNAME FROM MODULE WHERE MODULEID NOT IN (");// 获取未加入当前群组的数据
		try {
			appList = DBUtil.getList(sqlbuffer.toString(),
					new Object[] { proUNID });
			if (appList.size() != 0) {
				Object[] params = new Object[appList.size()];
				int i = 0;
				for (Object object : appList) {
					Map temp = (Map) object;
					sb.append("?").append(",");
					params[i++] = temp.get("ModuleID");
				}
				sb.deleteCharAt(sb.lastIndexOf(",")).append(")");
				list = DBUtil.getList(sb.toString(), params);
			} else {// 不存在则返回所有模块数据
				String sql = "SELECT MODULEID,MODNAME FROM MODULE";
				list = DBUtil.getList(sql);
			}
		} catch (Exception e) {
			// 通过json传递相关错误信息
			map.put("msg", "");
			map.put("error", e.toString());
			map.put("tag", false);
			this.setJson(map);// map转换为json
			return SUCCESS;
		}
		map.put("root", list);
		this.setJson(map);
		return SUCCESS;
	}

	/**
	 * @return 通过数据库获得分页相关的数据以及表单数据
	 */
	@SuppressWarnings("unchecked")
	public String queryForToSelector() {
		Map<String, Object> map = new HashMap<String, Object>();
		String proUNID = (String) BaseTools.getParams().get("ProjectID");// 获得前台ProjectID
		List list = null;
		List appList = null;
		StringBuilder sqlbuffer = new StringBuilder(
				"SELECT MODULEID FROM MODPRO WHERE PROJECTID = ? ;");
		StringBuilder sb = new StringBuilder(
				"SELECT MODULEID,MODNAME FROM MODULE WHERE MODULEID IN (");// 获取已加入当前项目的模块
		try {
			appList = DBUtil.getList(sqlbuffer.toString(),
					new Object[] { proUNID });
			if (appList.size() != 0) {// 存在数据则去除对应项目的模块数据
				Object[] params = new Object[appList.size()];
				int i = 0;
				for (Object object : appList) {
					Map temp = (Map) object;
					sb.append("?").append(",");
					params[i++] = temp.get("ModuleID");
				}
				sb.deleteCharAt(sb.lastIndexOf(",")).append(")");
				list = DBUtil.getList(sb.toString(), params);
			}
		} catch (Exception e) {
			// 通过json传递相关错误信息
			map.put("msg", "");
			map.put("error", e.toString());
			map.put("tag", false);
			this.setJson(map);// map转换为json
			return SUCCESS;
		}
		map.put("root", list);
		this.setJson(map);
		return SUCCESS;
	}

//	/**
//	 * 更新角色对应账户数据
//	 * 
//	 * @return
//	 */
//	@SuppressWarnings("unchecked")
//	public String update() {
//		Map<String, Object> params = BaseTools.getParams();// 从前台获得数据
//		String superUNID = (String) params.get("YQL_UNID");// 获得对应上级UNID
//		String updIdStr = (String) params.get("itemselector");
//		String[] updIdParams = updIdStr.split(",");
//		List<String> updIdList = new ArrayList<String>();// 获得前台传入id集合
//		for (String updid : updIdParams) {
//			updIdList.add(updid);
//		}
//
//		List orgList = null;// 数据库内数据列表
//		Map<String, Object> map = new HashMap<String, Object>();
//		String superName = null;
//		String sqlForSub = "SELECT YQL_APP_GROUP_UNID FROM YQL_ENT_APPGROUP_LIN_T WHERE YQL_ENT_SYS_UNID = ? ;";
//		String sqlForName = "SELECT ENT_SYS_NAME FROM YQL_ENT_SYS_T WHERE YQL_UNID = '"
//				+ superUNID + "' ;";
//		try {
//			List<String> orgIdList = new ArrayList<String>();
//			orgList = DBUtil.getList(sqlForSub, new Object[] { superUNID });
//			// 获得数据库内对应上级存在的的下级用户集合
//			for (Object object : orgList) {
//				Map temp = (Map) object;
//				orgIdList.add((String) temp.get("YQL_APP_GROUP_UNID"));
//			}
//			// 获得上级名称
//			List nameTemp = DBUtil.getList(sqlForName);
//			Map nameMap = (Map) nameTemp.get(0);
//			superName = (String) nameMap.get("ENT_SYS_NAME");
//
//			// 求数据库集合和前台集合的交集
//			List<String> difList = new ArrayList<String>();
//			difList.addAll(orgIdList);
//			difList.retainAll(updIdList);
//
//			updIdList.removeAll(difList);// 通过差集获得最终待插入id
//
//			orgIdList.removeAll(difList);// 通过差集获得最终待删除id
//			if (orgIdList.size() != 0) {
//				// 进行删除操作
//				String delStr = "DELETE FROM YQL_ENT_APPGROUP_LIN_T WHERE YQL_ENT_SYS_UNID = '"
//						+ superUNID + "' AND YQL_APP_GROUP_UNID = ?;";
//				for (String id : orgIdList) {
//					DBUtil.query(delStr, new Object[] { id });
//				}
//			}
//			if (updIdList.size() != 0) {
//				// 进行插入操作
//				StringBuffer nameStr = new StringBuffer(
//						"SELECT YQL_UNID,APP_GROUP_NAME FROM YQL_APP_GROUP_T WHERE YQL_UNID IN (");
//				Object[] nameParams = new Object[updIdList.size()];
//				List nameList = null;
//				int i = 0;
//				for (String updId : updIdList) {
//					nameStr.append("?").append(",");
//					nameParams[i++] = updId;
//				}
//				nameStr.deleteCharAt(nameStr.lastIndexOf(",")).append(")");
//				nameList = DBUtil.getList(nameStr.toString(), nameParams);
//				// 插入新增加的数据
//				String insSql = "INSERT  INTO YQL_ENT_APPGROUP_LIN_T VALUES('1','"
//						+ superUNID + "','" + superName + "',?,?,?,?);";
//				for (Object object : nameList) {
//					Map temp = (Map) object;
//					Object[] insParams = new Object[] { temp.get("YQL_UNID"),
//							temp.get("APP_GROUP_NAME"), new Date().getTime(),
//							new Date().getTime() };
//					DBUtil.query(insSql, insParams);
//				}
//			}
//		} catch (Exception e) {
//			// 通过json传递相关错误信息
//			map.put("msg", "");
//			map.put("error", e.toString());
//			map.put("tag", false);
//			this.setJson(map);
//			return SUCCESS;
//		}
//		map.put("msg", "更新成功");
//		map.put("error", "");
//		map.put("tag", true);
//		this.setJson(map);
//		return SUCCESS;
//	}

	public Map<String, Object> getJson() {
		return json;
	}

	public void setJson(Map<String, Object> json) {
		this.json = json;
	}
}
