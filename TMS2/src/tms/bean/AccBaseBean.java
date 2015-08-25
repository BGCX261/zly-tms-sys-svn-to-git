/**
 * 
 */
package tms.bean;

/**
 * 
 * @author zly
 * @date 2012-03-28 上午09:56:29
 * 
 */
public class AccBaseBean {
	private String unid;
	private String login;
	private String password;
	private String email;
	private int usertype;
	private String userName;
	private String deptName;
	private String userGroup;
	private int accessProNum;
	private int accessList;
	
	public int getAccessList() {
		return accessList;
	}
	public void setAccessList(int accessList) {
		this.accessList = accessList;
	}
	public int getAccessProNum() {
		return accessProNum;
	}
	public String getUnid() {
		return unid;
	}
	public void setUnid(String unid) {
		this.unid = unid;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setUsertype(int usertype) {
		this.usertype = usertype;
	}
	public void setAccessProNum(int accessProNum) {
		this.accessProNum = accessProNum;
	}
	public int getUsertype() {
		return usertype;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public String getUserGroup() {
		return userGroup;
	}
	public void setUserGroup(String userGroup) {
		this.userGroup = userGroup;
	}	
}
