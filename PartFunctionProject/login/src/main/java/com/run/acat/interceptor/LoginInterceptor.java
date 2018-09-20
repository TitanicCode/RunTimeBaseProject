package com.run.acat.interceptor;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.run.acat.entity.User;

public class LoginInterceptor implements HandlerInterceptor{

	//afterCompletion在DispatcherServlet完全处理完请求后被调用,可用于清理资源等 。
	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
	}

	//postHandle在业务处理器处理请求执行完成后,生成视图之前执行;
	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
	}

	//preHandle在业务处理器处理请求之前被调用;
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2) throws Exception {
		
		HttpSession  session = request.getSession();
		Object user = session.getAttribute("user");
		if(user != null){
			user = (User)user;
		}
		else{
			String contextPath = request.getContextPath();
			response.sendRedirect(contextPath);
			return false;
		}
		return true;
	}

}
