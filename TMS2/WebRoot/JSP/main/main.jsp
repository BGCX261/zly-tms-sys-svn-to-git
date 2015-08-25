<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>TMS</title>
		<link rel="stylesheet" type="text/css"
			href="${basePath}JS/resources/css/ext-all.css" />
		<script type="text/javascript"
			src="${basePath}JS/ext-base.js"></script>
		<script type="text/javascript"
			src="${basePath}JS/ext-all.js"></script>
			<!--  
		<script type="text/javascript"
			src="${basePath}js/build/locale/ext-lang-zh_CN.js"></script>
			-->
		<!-- 用户定义js，css -->	
		<script type="text/javascript"
			src="${basePath}JSP/main/js/main.js"></script>
		
	</head>
	<body>
	   	<div id="tab1" class="x-hide-display">A simple tab</div>
		<div id="tab2" class="x-hide-display">Another one</div>
		<div id="south_layout" align='center' style="color: #666666; FONT-SIZE: 15px">zly测试管理平台</div>
	</body>
</html>