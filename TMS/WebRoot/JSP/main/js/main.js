	Ext.onReady(function(){
		function clickHandler(n)
		{
		var url ;//存放转移地址
		var tag = n.attributes.text;//存放当前转移的标签
		//父级菜单点击就返回
		if(!n.leaf){
			return;
				}
		if(tag=='测试用例')
			url='JSP/caseinfo/caseinfo.jsp';
		else if(tag=='用户信息')
			url='JSP/userinfo/userinfo.jsp';
		else if(tag=='缺陷管理')
			url='JSP/bug/bug.jsp';
		
		
		gotoTabPage(url,tag);//切换标签
		}
		var userTreeRoot =  new Ext.tree.AsyncTreeNode({
							expanded: true,
							icon:'images/icons/yh.png',
							children: [
								{
								text: '用户信息',
								leaf: true//,
								//icon:'images/icons/zhjs.png'
							},{
								text: '需求管理',
								leaf: true//,
								//icon:'images/icons/zhjs.png'
							},{
								text: '测试计划',
								leaf: true//,
								//icon:'images/icons/zhjs.png'
							},{
								text: '测试用例',
								leaf: true//,
								//icon:'images/icons/zhjs.png'
							},{
								text: '缺陷管理',
								leaf: true//,
								//icon:'images/icons/zhjs.png'
							},{
								text: '测试报告',
								leaf: true//,
								//icon:'images/icons/zhjs.png'
							}
							]
						});
		var userTreePanel = new Ext.tree.TreePanel({
				//		title:'账户管理',
						xtype: 'treepanel',
						width: 200,
						rootVisible : false,
						autoScroll: true,
						split: true,
						loader: new Ext.tree.TreeLoader(
//							{dataUrl:'login/mauth.action?flag=acc'}
							),
						//root:accTreeRoot,
						//定义事件，实例化
						listeners: {
							click: clickHandler
						}
					});
		userTreePanel.setRootNode(userTreeRoot);

		var viewport = new Ext.Viewport({
								renderTo: Ext.getBody(),
								layout:"border",
								items:[{
									//左边折叠框，并且带树结构。
									region:'west',
									width:140,
									split:true,
									title:'功能菜单',
									layout:'fit',
									collapsible:true,
									layout:'accordion',
									defaults: {
					   						bodyStyle:'background-color:#FFFFFF;padding:5px'
								},
								layoutConfig:{
									titleCollapse:true,
									animate:true,
									activeOnTop:false
								},
								items:[userTreePanel]
							},
							{
				    			//中间部分Tab标签页
								region:'center',
								xtype: 'tabpanel',
								id:'mainPanel',
								activeTab: 0,
								items:[{
										title: '首 页',
										html: '欢迎登陆测试管理系统'
									}]
							},
//							{
//								region:'center',
//								items:[tabbarpanel]
//							}
//							,
							{
									region:'south',
									bodyStyle:'background-color:#dae7f8',
									contentEl:'south_layout',
									height:20
							}
			]
		});

		
		
		
	});
		
	// pango: 这里用弹出tabPage的方式(如已有,就根据url reload),注意,pageTitle最好指明（可用作公共方法类）
	function gotoTabPage(pageUrl,pageTitle){
	   var mainPanel = Ext.getCmp('mainPanel');//找到整个系统的panel对象
	 
	   // 如果有同名的panel,就不用新建一个新的,直接在原来的page加载新连接就可,避免打开太多panel
	   for(var i=0; i<mainPanel.items.length;i++){
              if(mainPanel.items.items[i].title==pageTitle){
				 mainPanel.setActiveTab(mainPanel.items.items[i]);
                 return;
			  }
       }//end for
		
		//窗体数量大于8个的时候 关闭最先打开的窗口
  		if(mainPanel.items.length>=8){
	   		mainPanel.remove(mainPanel.items.items[1]);
	   		//return;
	   }
		// 没打开过,开个新的
	   var tabPage = new Ext.Panel({
	   		iconCls:"pagetabIco",
            title:pageTitle,
            closable:true,
            html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+pageUrl+'"> </iframe>'
        });
		mainPanel.add(tabPage);
		mainPanel.setActiveTab(tabPage);
	}