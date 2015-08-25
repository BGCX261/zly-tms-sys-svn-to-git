/**
 * 
 */
package tms.web.tools;

import java.util.List;
import java.util.Map;

/**
 * 生成组织机构和账户Id的工具类
 * @author Wangb
 * @date 2011-11-21 上午09:30:01
 * 
 */
public class IndexTool {
	public final static int USER = 0;
	public final static int ADMIN = 1;
	/**
	 * 
	 * @param UpOrg
	 * @return
	 */
	public final static  String getSubAccId(String UpOrg,int Auth){
		String flag;
		List list = null;
		String sql;
		String AccId;
		String queryName="USER_INDEX";//数据库查询的INDEX_NAME
		String numStr="";
		int num =0;//编号
		if(USER == Auth){
			flag="U";
		}
		else if(ADMIN == Auth){
			flag="A";
		}
		else 
			return null;
		sql = "SELECT YQL_INDEX_NUM+1 NEXTSUBSTR  FROM YQL_INDEX_T WHERE YQL_INDEX_NAME = '"+queryName+"' ";
		try {
			list = DBUtil.getList(sql);
			
			if(list.size()==0)//未当前组织机构并未存在下属组织
				num=1001;
			else{
				Map temp = (Map)list.get(0);
				long next = (Long)temp.get("NextSubStr");
				num = (int)next;//获得下一个子组织机构编号
			}
			numStr = String.valueOf(num).replaceAll("[34]", "5");//替换3 和 4
			DBUtil.query("UPDATE YQL_INDEX_T SET YQL_INDEX_NUM = ? WHERE YQL_INDEX_NAME = '"+queryName+"' ",new Object[]{
					numStr
			});//更新下一个序列号
		} catch (Exception e) {
			e.printStackTrace();
		}
		AccId = flag+num;
		return UpOrg+AccId;
	}
	/**
	 * 
	 * @param UpOrg
	 * @return
	 */
	public final static  String getSubOrgId(String UpOrg){
		String flag;
		List list = null;
		String sql;
		String OrgId;
		String queryName="";//数据库查询的INDEX_NAME
		String numStr="";
		int  num =1001;//编号
		if(UpOrg.length()==5){
			flag="B";
			queryName="BUSS_INDEX";
		}
		else {
			flag="C";
			queryName="COM_INDEX";
		}
		sql = "SELECT YQL_INDEX_NUM+1 NEXTSUBSTR  FROM YQL_INDEX_T WHERE YQL_INDEX_NAME = '"+queryName+"' ";
		try {
			list = DBUtil.getList(sql);
			if(list.size()==0)//未当前组织机构并未存在下属组织
				num=1001;
			else{
				Map temp = (Map)list.get(0);
				double next = (Double)temp.get("NextSubStr");
				num = (int)next;//获得下一个子组织机构编号
			}
			numStr = String.valueOf(num).replaceAll("[34]", "5");//替换3 和 4
			DBUtil.query("UPDATE YQL_INDEX_T SET YQL_INDEX_NUM = ? WHERE YQL_INDEX_NAME = '"+queryName+"' ",new Object[]{
					numStr
			});//更新下一个序列号
		} catch (Exception e) {
			e.printStackTrace();
		}
		OrgId = flag+numStr;
		return UpOrg+OrgId;
	}
	/**
	 * 
	 * @return 获得角色ID下一个编号
	 */
	public final static  int getNextRoleId(){
		List list = null;
		String sql = "SELECT YQL_INDEX_NUM+1 NEXTSUBSTR  FROM YQL_INDEX_T WHERE YQL_INDEX_NAME = 'ROLE_ID_INDEX' ";
		int num=0;
		try {
			list = DBUtil.getList(sql);
			if(list.size()==0)//未当前组织机构并未存在下属组织
				num=1001;
			else{
				Map temp = (Map)list.get(0);
				 long next  = (Long)temp.get("NextSubStr");
				 num = (int)next;
			}
			DBUtil.query("UPDATE YQL_INDEX_T SET YQL_INDEX_NUM = ? WHERE YQL_INDEX_NAME = 'ROLE_ID_INDEX' ",new Object[]{
					num
			});//更新下一个序列号
		} catch (Exception e) {
			e.printStackTrace();
		}
		return num;
	}
	/**
	 * 
	 * @return 获得群组角色ID下一个编号
	 */
	public final static  int getNextRoleGroupId(){
		List list = null;
		String sql = "SELECT YQL_INDEX_NUM+1 NEXTSUBSTR  FROM YQL_INDEX_T WHERE YQL_INDEX_NAME = 'ROLE_GROUP_INDEX' ";
		int num=0;
		try {
			list = DBUtil.getList(sql);
			if(list.size()==0)//未当前组织机构并未存在下属组织
				num=1001;
			else{
				Map temp = (Map)list.get(0);
				long next = (Long)temp.get("NextSubStr");
				num = (int)next;//获得下一个子组织机构编号
			}
			DBUtil.query("UPDATE YQL_INDEX_T SET YQL_INDEX_NUM = ? WHERE YQL_INDEX_NAME = 'ROLE_GROUP_INDEX' ",new Object[]{
					num
			});//更新下一个序列号
		} catch (Exception e) {
			e.printStackTrace();
		}
		return num;
	}
	/**
	 * 
	 * @return 获得应用编号的下一个编号
	 */
	public final static  int getNextAppId(){
		List list = null;
		String sql = "SELECT YQL_INDEX_NUM+1 NEXTSUBSTR  FROM YQL_INDEX_T WHERE YQL_INDEX_NAME = 'APP_INDEX' ";
		int num=0;
		try {
			list = DBUtil.getList(sql);
			if(list.size()==0)//未当前组织机构并未存在下属组织
				num=1001;
			else{
				Map temp = (Map)list.get(0);
				long next = (Long)temp.get("NextSubStr");
				num = (int)next;//获得下一个编号
			}
			DBUtil.query("UPDATE YQL_INDEX_T SET YQL_INDEX_NUM = ? WHERE YQL_INDEX_NAME = 'APP_INDEX' ",new Object[]{
					num
			});//更新下一个序列号
		} catch (Exception e) {
			e.printStackTrace();
		}
		return num;
	}
	/**
	 * 
	 * @return 获得应用排序号下一个编号
	 */
	public final static  int getNextAppSortId(){
		List list = null;
		String sql = "SELECT YQL_INDEX_NUM+1 NEXTSUBSTR  FROM YQL_INDEX_T WHERE YQL_INDEX_NAME = 'APP_SORT_INDEX' ";
		int num=0;
		try {
			list = DBUtil.getList(sql);
			if(list.size()==0)//未当前组织机构并未存在下属组织
				num=1001;
			else{
				Map temp = (Map)list.get(0);
				long next = (Long)temp.get("NextSubStr");
				num = (int)next;//获得下一个子组织机构编号
			}
			DBUtil.query("UPDATE YQL_INDEX_T SET YQL_INDEX_NUM = ? WHERE YQL_INDEX_NAME = 'APP_SORT_INDEX' ",new Object[]{
					num
			});//更新下一个序列号
		} catch (Exception e) {
			e.printStackTrace();
		}
		return num;
	}
	/**
	 * 
	 * @return 获得应用编号的下一个编号
	 */
	public final static  int getNextAppGroupId(){
		List list = null;
		String sql = "SELECT YQL_INDEX_NUM+1 NEXTSUBSTR  FROM YQL_INDEX_T WHERE YQL_INDEX_NAME = 'APP_GROUP_INDEX' ";
		int num=0;
		try {
			list = DBUtil.getList(sql);
			if(list.size()==0)//未当前组织机构并未存在下属组织
				num=1001;
			else{
				Map temp = (Map)list.get(0);
				long next = (Long)temp.get("NextSubStr");
				num = (int)next;//获得下一个编号
			}
			DBUtil.query("UPDATE YQL_INDEX_T SET YQL_INDEX_NUM = ? WHERE YQL_INDEX_NAME = 'APP_GROUP_INDEX' ",new Object[]{
					num
			});//更新下一个序列号
		} catch (Exception e) {
			e.printStackTrace();
		}
		return num;
	}
	/**
	 * 
	 * @return 获得参数编号的下一个编号
	 */
	public final static  int getNextParaIndexId(){
		List list = null;
		String sql = "SELECT YQL_INDEX_NUM+1 NEXTSUBSTR  FROM YQL_INDEX_T WHERE YQL_INDEX_NAME = 'PARA_INDEX' ";
		int num=0;
		try {
			list = DBUtil.getList(sql);
			if(list.size()==0)//未当前组织机构并未存在下属组织
				num=1001;
			else{
				Map temp = (Map)list.get(0);
				long next = (Long)temp.get("NextSubStr");
				num = (int)next;//获得下一个编号
			}
			DBUtil.query("UPDATE YQL_INDEX_T SET YQL_INDEX_NUM = ? WHERE YQL_INDEX_NAME = 'PARA_INDEX' ",new Object[]{
					num
			});//更新下一个序列号
		} catch (Exception e) {
			e.printStackTrace();
		}
		return num;
	}
	/**
	 * 
	 * @return 获得参数配置序号的下一个编号
	 */
	public final static  int getNextParaConfIndexId(){
		List list = null;
		String sql = "SELECT YQL_INDEX_NUM+1 NEXTSUBSTR  FROM YQL_INDEX_T WHERE YQL_INDEX_NAME = 'PARA_CONF_INDEX' ";
		int num=0;
		try {
			list = DBUtil.getList(sql);
			if(list.size()==0)//未当前组织机构并未存在下属组织
				num=1001;
			else{
				Map temp = (Map)list.get(0);
				long next = (Long)temp.get("NextSubStr");
				num = (int)next;//获得下一个编号
			}
			DBUtil.query("UPDATE YQL_INDEX_T SET YQL_INDEX_NUM = ? WHERE YQL_INDEX_NAME = 'PARA_CONF_INDEX' ",new Object[]{
					num
			});//更新下一个序列号
		} catch (Exception e) {
			e.printStackTrace();
		}
		return num;
	}
	/**
	 * 
	 * @return 获得权限组编号的下一个编号
	 */
	public final static  int getNextAuthGroupIndexId(){
		int num=0;
		try {
			List list = null;
			String sql = "SELECT YQL_INDEX_NUM+1 NEXTSUBSTR  FROM YQL_INDEX_T WHERE YQL_INDEX_NAME = 'AUTH_GROUP_INDEX' ";
			
			list = DBUtil.getList(sql);
			if(list.size()==0)//未当前组织机构并未存在下属组织
				num=1001;
			else{
				Map temp = (Map)list.get(0);
				long next = (Long)temp.get("NextSubStr");
				num = (int)next;//获得下一个编号
			}
			DBUtil.query("UPDATE YQL_INDEX_T SET YQL_INDEX_NUM = ? WHERE YQL_INDEX_NAME = 'AUTH_GROUP_INDEX' ",new Object[]{
					num
			});//更新下一个序列号
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return num;
	}
	/**
	 * 
	 * @return 获得权限组编号的下一个编号
	 */
	public final static  int getNextAuthIndexId(){
		int num=0;
		try {
			List list = null;
			String sql = "SELECT YQL_INDEX_NUM+1 NEXTSUBSTR  FROM YQL_INDEX_T WHERE YQL_INDEX_NAME = 'AUTH_INDEX' ";
			
			list = DBUtil.getList(sql);
			if(list.size()==0)//未当前组织机构并未存在下属组织
				num=1001;
			else{
				Map temp = (Map)list.get(0);
				long next = (Long)temp.get("NextSubStr");
				num = (int)next;//获得下一个编号
			}
			DBUtil.query("UPDATE YQL_INDEX_T SET YQL_INDEX_NUM = ? WHERE YQL_INDEX_NAME = 'AUTH_INDEX' ",new Object[]{
					num
			});//更新下一个序列号
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return num;
	}
}
