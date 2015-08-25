<%@ page contentType="text/html;charset=utf-8"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setCharacterEncoding("UTF-8");

    // 获得node参数，对应的是正在展开的节点id
    String node = request.getParameter("node");
    System.out.println(node);


    String json = "";
    if ("0".equals(node)) {
        json += "[{id:1,text:'项目名称一'},{id:2,text:'项目名称二'}]";
    } else if ("1".equals(node)) {
        json += "[{id:11,text:'项目一模块一',leaf:true},{id:12,text:'项目一模块二',leaf:true}]";
    } else if ("2".equals(node)) {
        json += "[{id:21,text:'项目二模块一',leaf:true},{id:22,text:'项目二模块二',leaf:true}]";
    } 

    response.getWriter().print(json);
%>

