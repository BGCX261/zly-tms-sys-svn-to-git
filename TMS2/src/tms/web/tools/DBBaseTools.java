/**
 * 
 */
package tms.web.tools;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * 基本的用户数据库操作封装
 * @author Wangb
 * @date 2011-10-19 上午10:54:10
 * 
 */
public class DBBaseTools {
	/**
	 * 
	 * @param itemStart
	 * @param pageLimit
	 * @param tableName
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> pageQuery(int pageStart,int itemsLimit,String tableName) throws Exception{
		Map<String, Object> returnMap = new HashMap<String, Object>();
		List list = null;
		int totle = 0;
		list = DBUtil.getList("SELECT * FROM "+tableName+" LIMIT "+pageStart+","+itemsLimit+";");//执行sql分页语句 获得分页数据项
		totle = DBUtil.getTotle("SELECT COUNT(*) FROM "+tableName);//获得所有数据总数 用于分页
		return returnMap;
	}
	/**
	 * 
	 * @param queryIDs
	 * @param queryColumnName
	 * @param tableName
	 * @return
	 * @throws Exception 
	 */
	public static String deleteByUNIDs(String queryIDs,String queryColumnName,String tableName) throws Exception{
		Object[] param = queryIDs.split(",");//多个数据采用,分割
		StringBuilder sb = new StringBuilder(
				"DELETE FROM "+tableName+" WHERE "+queryColumnName+" IN (");
		//根据前台传递的删除数量，配置模板待定参数
		for (int i = 0; i < param.length; i++) {
			sb.append("?").append(",");
		sb.deleteCharAt(sb.lastIndexOf(",")).append(")");
		}
		DBUtil.query(sb.toString(), param);//执行数据库模板
		return "删除【" +queryIDs + "】成功";
		
	}
	public static String updateByUNID(Map<String, Object> params,String queryColumnName,String tableName) throws Exception{
		List<Map<String, Object>> columnsMap = null;
		columnsMap = DBUtil.getList("show full columns from "+tableName);
		StringBuffer sqlBuffer = new StringBuffer("UPDATE "+tableName+" SET ");
		Object[] paramsList = new Object[columnsMap.size()-1];
		int i=0;
		for (Map<String, Object> cloumnMap : columnsMap) {
			String temp = cloumnMap.get("Field").toString();
			if(!(temp.equals(queryColumnName)||temp.equals("CREATED_TIME")||temp.equals("UPDATE_TIME"))){
				sqlBuffer.append(temp+" = ? ,");
				paramsList[i++]=params.get(temp);
			}
		}
		sqlBuffer.append(" UPDATE_TIME = ? WHERE "+queryColumnName+" = ?");
		paramsList[i++] = new Date().getTime();
		paramsList[i++] = params.get(queryColumnName);	
		System.out.println(sqlBuffer.toString());
		DBUtil.query(sqlBuffer.toString(), paramsList);//执行数据库模板
		
		return "更新用户【"+params.get(queryColumnName)+"】成功";
	}
	public static String add(Map<String, Object> params,String tableName,String orgId) throws Exception{
		List<Map<String, Object>> columnsMap = null;
		columnsMap = DBUtil.getList("show full columns from "+tableName);
		StringBuffer sqlstartBuffer = new StringBuffer("INSERT INTO  "+tableName+"(YQL_UNID,");
		StringBuffer sqlendBuffer = new StringBuffer(") value('"+UUID.randomUUID()+"',");
		Object[] paramsList = new Object[columnsMap.size()-1];
		int i=0;
		for (Map<String, Object> cloumnMap : columnsMap) {
			String temp = cloumnMap.get("Field").toString();
			if(!(temp.equals("YQL_UNID")||temp.equals("CREATED_TIME")||temp.equals("UPDATE_TIME"))){
				sqlstartBuffer.append(temp+" ,");
				sqlendBuffer.append("?,");
				if(temp.contains("INDEX")||temp.contains("IS_ACTIVITY"))
				paramsList[i++]=Integer.parseInt(params.get(temp).toString());
				else if(temp.contains("ORG_ID"))
					paramsList[i++]=orgId;
				else	paramsList[i++] = params.get(temp);
			}
		}
		sqlstartBuffer.append("CREATED_TIME ,UPDATE_TIME");
		sqlendBuffer.append("?,?)");
		paramsList[i++] = new Date().getTime();
		paramsList[i++] = new Date().getTime();
		
		sqlstartBuffer.append(sqlendBuffer);
		String sql = sqlstartBuffer.toString();
		System.out.println(sql);
		DBUtil.query(sql, paramsList);//执行数据库模板
		return "更新用户【"+params.get("YQL_UNID")+"】成功";
	}
	public void  JSFormHelper(Map<String,String> map,List<String> sort)
	{
		System.out.println("			new Ext.form.Hidden({");
				System.out.println("				name:'YQL_UNID'");
						System.out.println("			}),");
		for (String o : sort) {
			System.out.println("		{");
			System.out.println("			fieldLabel:'"+map.get(o)+"',");
			System.out.println("			name:'"+o+"',");
			System.out.println("			width:400,");
			System.out.println("		},");
		}
		
	}
	public void JSStoreHelper(Map<String,String> map,List<String> sort){
		System.out.println("				{name:'YQL_UNID'},");
		for (String o : sort) {
		System.out.println("				{name:'"+o+"'},");
		}  
	}
	public void JSCModelHelper(Map<String,String> map,List<String> sort){
		System.out.println();
		for (String o : sort) {
			System.out.println("					{header: \""+map.get(o)+"\", width: 200, dataIndex: '"+o+"'},");
	
		}
	}
	public static void main(String[] args) {
		DBBaseTools sbt = new DBBaseTools();
		Map<String,String> map = new HashMap<String, String>();
		List<String> sort = new ArrayList<String>();
		sort.add("YQL_ORG_ID");map.put("YQL_ORG_ID", "组织机构");
		sort.add("STA_CODE");map.put("STA_CODE", "编码");
		sort.add("STA_TM");map.put("STA_TM", "时间");
		sort.add("CON_STA");map.put("CON_STA", "状态");
		sort.add("STA_REP_TM");map.put("STA_REP_TM", "修复时间");
		sort.add("STA_ERR_BEG_TM");map.put("STA_ERR_BEG_TM", "故障开始时间");
		sort.add("STA_BLO_BEG_TM");map.put("STA_BLO_BEG_TM", "拥堵开始时间");
//		sort.add("ANA_REC_TM");map.put("ANA_REC_TM", "业务恢复时间");
//		sort.add("ANA_AFF_RAN");map.put("ANA_AFF_RAN", "故障影响业务范围");
//		sort.add("ANA_REASON");map.put("ANA_REASON", "故障原因");
//		sort.add("ANA_SOLUTION");map.put("ANA_SOLUTION", "解决方法");
//		sort.add("ANA_CUR_PRO");map.put("ANA_CUR_PRO", "目前存在的问题");
//		sort.add("ANA_OTHER");map.put("ANA_OTHER", "备注");
//		sort.add("ANA_PERSON");map.put("ANA_PERSON", "故障解决人");
//		sort.add("ANA_PERSON_PHO");map.put("ANA_PERSON_PHO", "故障解决人联系电话");
		System.out.println("==================JSFormHelper==================");
		sbt.JSFormHelper(map, sort);
		System.out.println("==================JSStoreHelper==================");
		sbt.JSStoreHelper(map,sort);
		System.out.println("===================JSCModelHelper=================");
		sbt.JSCModelHelper(map, sort);
	}
}
