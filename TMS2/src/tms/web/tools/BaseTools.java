package tms.web.tools;

import java.util.HashMap;
import java.util.Map;

import com.opensymphony.xwork2.ActionContext;

public class BaseTools {
	public static final Map<String, Object> getParams() {
		Map<String, Object> values = new HashMap<String, Object>();
		Map<String, Object> params = (Map<String, Object>) ActionContext.getContext().getParameters();
		for (String key: params.keySet()) {
			Object value[] = (Object[]) params.get(key);
			if(value[0]==null && "".equals(value[0].toString())){
				values.put(key, "");
			}else
			   values.put(key, value[0]);
			
		}
		return values;
	}
}
