package tms.web.tools;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * 类名:	NetTools.java
 * @作者:     CML
 * @version:    1.0
 * 创建时间:   2011-9-7 下午9:14:38
 * 功能：获得网络连接的一些方法
 * 修改历史:
 * Date			Author		Version		Description
 * ------------------------------------------------------------------
 * 2011-9-7      CML		     1.0		1.0 Version
 */
public class NetTools {

	/**
	 * 得到网络输入流
	 * @param URLPath 请求Url
	 * @param encoding 编码格式
	 * @return 文件输入流
	 * @throws Exception 网络连接Exception
	 */
	public static InputStream getContent(String URLPath,String encoding) throws Exception{
		URL url = new URL(URLPath);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setConnectTimeout(6*1000);
		if(conn.getResponseCode() == 200){
			return conn.getInputStream();
		}
		return null;
	}
	
}