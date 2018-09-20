package AssistClass;

import java.util.Date;

/**
 * 用户实体类
 * @author zhangxiaoyan
 *
 */
public class User {
	private String id;
	private String account; //账号
	private String name; //用户名
	private String password; //密码
	private String passwordmd; //记住密码
	private String phoneNumber;
	private String leaderid;
	private Date modifiedDate;
	private String lockout;
	private String delflag;
	private Date logindate;
	private String loginip;
	private String loginmac;
	
	private String orgName;
	private User leader;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Date getModifiedDate() {
		return modifiedDate;
	}
	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}
	public String getLockout() {
		return lockout;
	}
	public void setLockout(String lockout) {
		this.lockout = lockout;
	}
	public String getLeaderid() {
		return leaderid;
	}
	public void setLeaderid(String leaderid) {
		this.leaderid = leaderid;
	}
	public String getDelflag() {
		return delflag;
	}
	public void setDelflag(String delflag) {
		this.delflag = delflag;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getLogindate() {
		return logindate;
	}
	public void setLogindate(Date logindate) {
		this.logindate = logindate;
	}
	public String getLoginip() {
		return loginip;
	}
	public void setLoginip(String loginip) {
		this.loginip = loginip;
	}
	public String getLoginmac() {
		return loginmac;
	}
	public void setLoginmac(String loginmac) {
		this.loginmac = loginmac;
	}
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public User getLeader() {
		return leader;
	}
	public void setLeader(User leader) {
		this.leader = leader;
	}
	public String getPasswordmd() {
		return passwordmd;
	}
	public void setPasswordmd(String passwordmd) {
		this.passwordmd = passwordmd;
	}
}
