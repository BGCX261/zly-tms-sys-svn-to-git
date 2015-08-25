package tms.web.tools;

import java.util.List;

import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCallback;

public class DBUtil {
//	private static final ApplicationContext ctx = new ClassPathXmlApplicationContext(
//			"applicationContext.xml");
//	private static final JdbcTemplate jdbcT = (JdbcTemplate) ctx.getBean("jdbcTemplate");
	private static JdbcTemplate jdbcTemplateImpl;
	@SuppressWarnings("unchecked")
	/**
	 * 
	 * 
	 * 
	 */
	public static List getList(String sql,Object[] params) throws Exception{
		return jdbcTemplateImpl.queryForList(sql,params);
	}
	
	@SuppressWarnings("unchecked")
	public static  List getList(String sql) throws Exception{
		return jdbcTemplateImpl.queryForList(sql);
	}
	
	public static  void query(String sql,Object[] params) throws Exception{
		jdbcTemplateImpl.update(sql,params);
	}

	public static int getTotle(String sql,Object[] params) throws Exception{
		return jdbcTemplateImpl.queryForInt(sql, params);
	}
	
	public static int getTotle(String sql) throws Exception{
		return jdbcTemplateImpl.queryForInt(sql);
	}
	/**
	 * 
	 *  @Enclosing_Method  : executeBLOB
	 *  @Written by        : wangb
	 *  @Creation Date     : 2012-2-20 上午10:15:28 
	 *  @version           : v1.00
	 *  @Description       :  
	 *  
	 *  @param sql 新增sql语句
	 *  @param action 用于存储图像数据的参数
	 *  @return 
	 *  @throws Exception
	 *
	 */
	public static  Object executeBLOB(String sql,PreparedStatementCallback action) throws Exception{
		return jdbcTemplateImpl.execute(sql, action);
	}
	/**
	 * 
	 *  @Enclosing_Method  : queryBLOB
	 *  @Written by        : wangb
	 *  @Creation Date     : 2012-2-21 下午02:26:47 
	 *  @version           : v1.00
	 *  @Description       :  
	 *  
	 *  @param sql 查询sql语句
	 *  @param set 结果集
	 *  @return 用于从数据库内读取blob型数据
	 *  @throws Exception
	 *
	 */
	public static  Object executeBLOB(String sql,CallableStatementCallback action) throws Exception{
		return jdbcTemplateImpl.execute(sql, action);
	}
	
	
	public JdbcTemplate getJdbcTemplateImpl() {
		return jdbcTemplateImpl;
	}

	public void setJdbcTemplateImpl(JdbcTemplate jdbcTemplateImpl) {
		DBUtil.jdbcTemplateImpl = jdbcTemplateImpl;
	}
}
