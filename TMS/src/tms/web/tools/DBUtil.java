package tms.web.tools;

import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;

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
	
	
	
	
	public JdbcTemplate getJdbcTemplateImpl() {
		return jdbcTemplateImpl;
	}

	public void setJdbcTemplateImpl(JdbcTemplate jdbcTemplateImpl) {
		DBUtil.jdbcTemplateImpl = jdbcTemplateImpl;
	}
}
