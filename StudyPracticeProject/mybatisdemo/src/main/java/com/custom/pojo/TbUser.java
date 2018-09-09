package com.custom.pojo;

/**
 * Created by user on 2018/9/7.
 */
public class TbUser {
    private Integer id;
    private String username;
    private String gender;
    private String password;
    private Integer authodId;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getAuthodId() {
        return authodId;
    }

    public void setAuthodId(Integer authodId) {
        this.authodId = authodId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "TbUser{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", gender='" + gender + '\'' +
                ", password='" + password + '\'' +
                ", authodId='" + authodId + '\'' +
                '}';
    }
}
