<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'tree.jsp' starting page</title>
    
	<link rel="stylesheet" type="text/css"
			href="${basePath}JS/resources/css/ext-all.css" />
			<script type="text/javascript"
			src="${basePath}JS/ext-base.js"></script>
		<script type="text/javascript"
			src="${basePath}JS/ext-all.js"></script>
			<!-- 用户定义js，css -->	
		<script type="text/javascript"
			src="${basePath}JSP/tree/js/tree.js"></script>

  </head>
  
  <body>
   <div id="tree" style="height:300px;"></div>
 
  </body>
</html>
