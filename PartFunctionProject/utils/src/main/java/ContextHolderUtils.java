import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
* @ClassName: ContextHolderUtils 
* @Description: TODO(上下文工具类)
* @date 2018-06-06 下午16:27:39 
*/
public class ContextHolderUtils {
	/**
	 * SpringMvc下获取request
	 * @return
	 */
	public static HttpServletRequest getRequest() {
		HttpServletRequest request = null;
		if(RequestContextHolder.getRequestAttributes()!=null)
			request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		return request;

	}
	/**
	 * SpringMvc下获取session
	 * 
	 * @return
	 */
	public static HttpSession getSession() {
		 HttpServletRequest req = getRequest();
		if(req!=null)
			return req.getSession();
		return null;
	}
}
