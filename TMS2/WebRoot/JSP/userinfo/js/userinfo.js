Ext.onReady(function(){
	Ext.QuickTips.init();
var store = new Ext.data.Store({
			proxy:new Ext.data.HttpProxy({url:'userinfo/userinfo.action'}),
			reader:new Ext.data.JsonReader({
				totalProperty:'totalProperty',
				root:'root'
			},[
			   {name:'UserID'},
			   {name:'Login'},
			   {name:'PassWord'},
			   {name:'Email'},
			   {name:'UserType'},
			   {name:'Name'},
			   {name:'DeptName'},
			   {name:'UserGroup'},
			   {name:'AccessProNum'},
			   {name:'AccessList'},
			   {name:'CreateTime'},
			   {name:'UpdateTime'}
			   //创建时间和更新时间由后台生成
			  ])
		});

var cm=new Ext.grid.ColumnModel([
	{header:'登录名',width: 100,dataIndex:'Login'},
	{header:'用户类型',width: 100,dataIndex:'UserType',renderer:typeColor},
	{header:'用户姓名',width: 150,dataIndex:'Name'},
	{header:'所属部门',width: 150,dataIndex:'DeptName'},
	{header:'所属群组',width: 150,dataIndex:'UserGroup'},
	{header:'可访问项目',width: 200,dataIndex:'AccessProNum'},
	{header:'权限列表',width: 200,dataIndex:'AccessList'},
	{header:'创建时间',width: 150,dataIndex:'CreateTime',renderer:doubleToDate},
	{header:'更新时间',width: 150,dataIndex:'UpdateTime',renderer:doubleToDate}
	]);

var pwdPanel= new Ext.FormPanel({
        	height:120,
        	frame: true,
        	title: '修改账户密码',
        	items: [{
				fieldLabel:'请输入当前密码',
				name:'PassWord',
				inputType: 'password',
//				vtype: 'password',
				xtype:'textfield',
				maxlength:16,
				width:150,
				allowBlank: false,
				blankText:'该框不能为空'
			},
			{
				fieldLabel:'请输入新密码',
				name:'NewPassword',
				inputType: 'password',
				xtype:'textfield',
				maxlength:16,
				width:150,
				allowBlank: false,
				blankText:'该框不能为空'
			},
			{
				fieldLabel:'请确认新密码',
				name:'CheckPassword',
				inputType: 'password',
				xtype:'textfield',
				width:150,
				maxlength:16,
//				vtype:'maxlength',
//			    maxlen:6,
				allowBlank: false,
				blankText:'该框不能为空'
			}],
        	buttons: [{
            	text: '确定',
            	handler: function(){
        			//验证新密码的正确性
        			var newpwd = pwdPanel.form.findField("NewPassword").getValue();
        			var checkpwd = pwdPanel.form.findField("CheckPassword").getValue();
        			if(newpwd!=checkpwd){
        				Ext.Msg.alert('输入错误','新密码输入不一致！请重新输入！');
        				pwdPanel.form.reset();
        			}
        			else{
        				Ext.Ajax.request({
        					url: 'acc/updatepwd.action',
        					success:function(response){
        					var result = Ext.decode(response.responseText);
        					if(result.tag){
        						showInfo('信息',result.msg);
        						pwdPanel.getForm().reset();
        						pwd_window.hide();
        						}
        					else{
        						showError('错误信息',result.msg);
        						pwdPanel.getForm().reset();
        						}
        					},
        					failure:function(){
        						pwdPanel.getForm().reset();
        						showError('错误信息','无法连接到服务器，请联系管理员！');
        						},
        						params: pwdPanel.getForm().getValues(true)
        						});
        				}
        			}
        	},{
            	text: '清空',
            	handler: function(){pwdPanel.getForm().reset();}
        	}
        	]
    	});

		var pwd_window = new Ext.Window({
			pageX:250,
			pageY:200,
			layout:'fit',
			width:290,
			modal:true, //设置遮罩，即你要的效果
			height:200,
			closeAction:'hide',
			items:[pwdPanel]
		}) ;
		
		var personPanel= new Ext.FormPanel({
			height:280,
        	frame: true,
        	items:[
			new Ext.form.Hidden({
			name:'UserID'
		}),{
			xtype:'textfield',
			fieldLabel:'登录名',
			name:'Login',
			width:350,
			editable:false
		},{
			xtype:'textfield',
			fieldLabel:'用户邮箱',
			name:'Email',
			width:350,
			editable:false
		},{
			xtype:'textfield',
			fieldLabel:'用户类型',
			name:'UserType',
			width:350,
			editable:false
		},{
			xtype:'textfield',
			fieldLabel:'用户姓名',
			name:'Name',
			width:350,
			editable:false
		},{
			xtype:'textfield',
			fieldLabel:'所属部门',
			name:'DeptName',
			width:350,
			editable:false
		},{
			xtype:'textfield',
			fieldLabel:'所属群组',
			name:'UserGroup',
			width:350,
			editable:false
			
		},{
			xtype:'textfield',
			fieldLabel:'可访问的项目',
			name:'AccessProNum',
			width:350,
			editable:false
		},{
			xtype:'textfield',
			fieldLabel:'权限列表',
			name:'AccessList',
			width:350,
			editable:false
		}],
     });
	
		var personinfo_window = new Ext.Window({
			pageX:250,
			pageY:150,
			layout:'fit',
			width:500,
			modal:true, //设置遮罩，即你要的效果
			height:290,
			closeAction:'hide',
			items:[personPanel]
		}) ;

//应用类型工具类下拉框
var appTypeMenu = new Ext.menu.Menu({   
        items: [   
            {id:"xgmm", text:"修改密码", checked:false, group:"apptype", handler:onAppTypeChange},   
            {id:"gy", text:"关于", checked:false, group:"apptype", handler:onAppTypeChange},   
         ]   
    });

 function utypeValue(val){
        if(val == '0'){
            return '系统管理员' ;
        }else if(val == '1'){
            return '项目经理';
        }else if(val == '2'){
            return  '测试组长';
        }else if(val == '3'){
            return  '开发人员';
        }else if(val == '4'){
            return  '测试人员';
        }
        return val;
    }

function onAppTypeChange(item, checked){
		if(item.text=="修改密码"){
			       pwd_window.show();
			}
		else if(item.text=="关于"){
		Ext.Ajax.request({
    	 url: 'acc/queryAccInfo.action',
    	 success:function(response){
    	 var result = Ext.decode(response.responseText);
    	 if(result.tag){
    		 personinfo_window.show();
    		 var user = result.root[0];
    		 var usertype = utypeValue(user.UserType);
	personPanel.form.findField("Login").setValue(user.Login);
	personPanel.form.findField("Email").setValue(user.Email);
	personPanel.form.findField("UserType").setValue(usertype);
	personPanel.form.findField("Name").setValue(user.Name);
	personPanel.form.findField("DeptName").setValue(user.DeptName);
	personPanel.form.findField("UserGroup").setValue(user.UserGroup);
	personPanel.form.findField("AccessProNum").setValue(parseInt(user.AccessProNum));
	personPanel.form.findField("AccessList").setValue(parseInt(user.AccessList));

	}
    	 else{
    		 showError('错误信息',result.msg);
    		 personinfo_window.hide();
    		 }
    	 }
		});
		}
		}

	
var grid=new Ext.grid.GridPanel({
	renderTo:Ext.getBody(),
	store:store,
	cm:cm,
	viewConfig: {
		columnsText:'显示的列',
		autoFill:true,
        foreceFit:true,
		scrollOffset:1,
        sortAscText:'降序',
        sortDescText:'升序',
        forceFit: true
    },
    tbar:new Ext.Toolbar({
    	items:['-',{
    		text:'新增',
    		iconCls:'addUser',
    		handler:function (){
				add_window.show();
				add_form.getForm().reset();
			}
    	},'-',{
    		text:'删除',
    		id:'scqx',
    		disabled:true,
    		iconCls:'removeUser',
    		handler:function (){
    		var selModel = grid.getSelectionModel();
    		Ext.Msg.confirm('提示信息','确定要删除？',function(btn){
    			if(btn=='yes'){
    				var selections=selModel.getSelections();
    				Ext.each(selections,function(item){
    					Ext.Ajax.request({
    						url:'userinfo/delete.action',
    						success:function(resp){
    						var result=Ext.decode(resp.responseText);
    						Ext.Msg.alert('信息',result.msg);
    						store.load({params:{start:0,limit:10}});
    						update_from.getForm().reset();},
    						failure:function(){},
    						params: { UserID: item.get('UserID'),Name:item.get('Name')}
    						})
    						})
    						}
    			});
    		}
    	},'-',{
    		iconCls: 'editUser',
    		text:"个人信息管理", 
    		menu:appTypeMenu
    		},'-',{
    	id:'search',
    	xtype:'textfield',
    	name:'search'},{
    	text:'查找',
    	iconCls: 'search-botton',
    	handler:search}]
    	}),
    	sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
    	bbar: new Ext.PagingToolbar({
    	  pageSize:10,
    	  store:store,
    	  displayInfo:true,
    	  displayMsg:'显示第  {0} 条到  {1}  条记录, 一共  {2}  条',
    	  emptyMsg:'没有记录'
    })
});

store.load({params:{start:0,limit:10}});
// 这里很关键，如果不加，翻页后搜索条件就变没了，这里的意思是每次数据载入前先把搜索表单值加上去，
    // 这样就做到了翻页保留搜索条件了
    store.on('beforeload',function(){
      Ext.apply(
      this.baseParams,
      {
           search:Ext.getCmp("search").getValue()
      });
    });
    
//搜索功能实现函数
function search()
{
	var searchStr = Ext.getCmp("search").getValue();
	store.load({params:{search:searchStr,start:0,limit:10}});
}

  // 为用户类型显示 进行渲染
    function typeColor(val){
        if(val == '0'){
            return '<span style="color:green;">' + '系统管理员' + '</span>';
        }else if(val == '1'){
            return '<span style="color:blue;">' + '项目经理' + '</span>';
        }else if(val == '2'){
            return '<span style="color:orange;">' + '测试组长' + '</span>';
        }else if(val == '3'){
            return '<span style="color:blue;">' + '开发人员' + '</span>';
        }else if(val == '4'){
            return '<span style="color:orange;">' + '测试人员' + '</span>';
        }
        return val;
    }
    
       //用户类型设置为下拉框
     var utypdata=[
    	 ['系统管理员','0'],
    	 ['项目经理','1'],
    	 ['测试组长','2'],
    	 ['开发人员','3'],
    	 ['测试人员','4']
    	 ];
      var utypstore=new Ext.data.SimpleStore({
    	 fields:['text','value'],
    	 data:utypdata
    	 });
      var combo=new Ext.form.ComboBox({
    	 fieldLabel:'用户类型',
    	 editable : false,
    	 hiddenName: 'UserType',
    	 store:utypstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 allowBlank: false,
		blankText:'该框不能为空',
    	 displayField:'text'
     });
       
       //可访问的项目设置为下拉框
     var accpronumdata=[
    	 ['0','0'],
    	 ];
      var accpronumstore=new Ext.data.SimpleStore({
    	 fields:['text','value'],
    	 data:accpronumdata
    	 });
      
       //权限列表设置为下拉框
     var acclistdata=[
    	 ['0','0'],
    	 ];
      var accliststore=new Ext.data.SimpleStore({
    	 fields:['text','value'],
    	 data:acclistdata
    	 });
    
    var update_form = new Ext.form.FormPanel({//更新表单
		autoScroll:true,
		labelAlign:'right',
		labelWidth:100, 
        height:260,
		plain:true,
		frame:true,
		defaultType:'textfield',
		items:[
			new Ext.form.Hidden({
			name:'UserID'
		}),{
			fieldLabel:'登录名',
			name:'Login',
			width:300
		},{
			fieldLabel:'用户邮箱',
			name:'Email',
			vtype:'email',
			vtypeText:'请输入正确的邮箱地址',
			allowBlank: false,
			blankText:'该框不能为空',
			width:300
		},new Ext.form.ComboBox({
    	 fieldLabel:'用户类型',
    	 editable : false,
    	 hiddenName: 'UserType',
    	 store:utypstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     }),{
			fieldLabel:'用户姓名',
			name:'Name',
			allowBlank: false,
			blankText:'该框不能为空',
			width:300
		},{
			fieldLabel:'所属部门',
			name:'DeptName',
			allowBlank: false,
			blankText:'该框不能为空',
			width:300
		},{
			fieldLabel:'所属群组',
			name:'UserGroup',
			allowBlank: false,
			blankText:'该框不能为空',
			width:300
		},
		new Ext.form.ComboBox({
    	 fieldLabel:'可访问的项目',
    	 editable : false,
    	 hiddenName: 'AccessProNum',
    	 store:accpronumstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     }),
     new Ext.form.ComboBox({
    	 fieldLabel:'权限列表',
    	 editable : false,
    	 hiddenName: 'AccessList',
    	 store:accliststore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     })],
		buttons:[{
			text:'更新',
			handler:function (){
			if(update_form.form.isValid()){//进行验证判断 验证通过后才进行提交
				Ext.lib.Ajax.request(
						'POST',
						'userinfo/update.action',
						{success:function(resp){
							var result=Ext.decode(resp.responseText);
    						Ext.Msg.alert('提示信息',result.msg);
							store.load({params:{start:0,limit:10}});
							update_form.getForm().reset();
						},failure:function(){
							Ext.Msg.alert('信息','请联系管理员');
						}},
						update_form.getForm().getValues(true)//采用缩写模式
					);
			}
			else{
				Ext.Msg.alert('提示信息','请输入正确的信息');
			}
			}
		}]
	});
    
     grid.addListener( 'rowdblclick', function( g, rowIdx, eobj ) { // 对grid的行添加双击事件
    	  Ext.getCmp('scqx').setDisabled(false);
        var record = store.getAt(rowIdx); // 返回是的一个 Record. Store包含的就是Record[]      
		update_form.getForm().loadRecord(record);
	});
     
     grid.addListener( 'rowclick', function( g, rowIdx, eobj ) { // 对grid的行添加单击事件
    	  Ext.getCmp('scqx').setDisabled(false);
	});
    
    var viewport = new Ext.Viewport({//布局
	layout:'border',
	items:[{
		layout:'fit',
		region:'center',
		items:[grid]
	},{
		region:'south',
		items:[update_form],
		height:260,//该布局无法使用自适应高度
		collapsible:true
	}]
});
    
     var add_form = new Ext.form.FormPanel({//新增表单
		autoScroll:true,
		labelAlign:'right',
		labelWidth:100, 
        height:280,
        width:500,
		plain:true,
		frame:true,
		defaultType:'textfield',
		items:[
			{
			fieldLabel:'登录名',
			name:'Login',
			allowBlank: false,
			blankText:'该框不能为空',
			width:300,
			height:25
		},{
			fieldLabel:'用户邮箱',
			name:'Email',
			vtype:'email',
			vtypeText:'请输入正确的邮箱地址',
			allowBlank: false,
			blankText:'该框不能为空',
			width:300,
			height:25
		},
		combo,//下拉框
		{
			fieldLabel:'用户姓名',
			name:'Name',
			allowBlank: false,
			blankText:'该框不能为空',
			width:300,
			height:25
		},{
			fieldLabel:'所属部门',
			name:'DeptName',
			allowBlank: false,
			blankText:'该框不能为空',
			width:300,
			height:25
		},{
			fieldLabel:'所属群组',
			name:'UserGroup',
			allowBlank: false,
			blankText:'该框不能为空',
			width:300,
			height:25
		},
		new Ext.form.ComboBox({
    	 fieldLabel:'可访问的项目',
    	 editable : false,
    	 hiddenName: 'AccessProNum',
    	 store:accpronumstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 allowBlank: false,
			blankText:'该框不能为空',
    	 displayField:'text'
     }),
     new Ext.form.ComboBox({
    	 fieldLabel:'权限列表',
    	 editable : false,
    	 hiddenName: 'AccessList',
    	 store:accliststore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 allowBlank: false,
		blankText:'该框不能为空',
    	 displayField:'text'
     })],
		buttons:[{
			text:'新增',
			handler:function (){
			if(add_form.form.isValid()){//进行验证判断 验证通过后才进行提交
				Ext.lib.Ajax.request(
						'POST',
						'userinfo/add.action',
						{success:function(resp){
							var result=Ext.decode(resp.responseText);
    						Ext.Msg.alert('信息',result.msg);
							store.load({params:{start:0,limit:10}});
							add_form.getForm().reset();
						},failure:function(){
							Ext.Msg.alert('系统信息','请联系管理员');
						}},
						add_form.getForm().getValues(true)//采用缩写模式
					);
				add_window.hide();
			}
			else{
				Ext.Msg.alert('系统信息','请输入正确的信息');
			}
			}
		},{
			text:"取消",
					handler: function(){
						add_window.hide();
						}
		}]
	});   
     
     var add_window = new Ext.Window({
		pageX:250,
		pageY:150,
		layout:'fit',
		modal:true, //设置遮罩，即你要的效果
		closeAction:'hide',
		items:[add_form],
		buttons:[]
		});
    
});