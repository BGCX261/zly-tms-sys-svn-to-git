var csid;//获取CaseId

Ext.onReady(function(){
var store = new Ext.data.Store({
			proxy:new Ext.data.HttpProxy({url:'caseinfo/caseinfo.action'}),
			reader:new Ext.data.JsonReader({
				totalProperty:'totalProperty',
				root:'root'
			},[
			   {name:'CaseID'},
			   {name:'CaseTitle'},
			   {name:'Designer'},
			   {name:'Status'},
			   {name:'PreCondition'},
			   {name:'Steps'},
			   {name:'ExpResult'},
			   {name:'CreateTime'},
			   {name:'UpdateTime'}
			   //创建时间和更新时间由后台生成
			  ])
	});

//缺陷优先级设置为下拉框
     var bpriodata=[
    	 ['1-低','1-低'],
    	 ['2-中','2-中'],
    	 ['3-高','3-高']
    	 ];
     var bpriostore=new Ext.data.SimpleStore({
    	 fields:['text','value'],
    	 data:bpriodata
    	 });
     var bpriocombo=new Ext.form.ComboBox({
    	 fieldLabel:'BUG优先级',
    	 editable : false,
    	 hiddenName: 'BugPrio',
    	 store:bpriostore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     });
     
      //缺陷状态设置为下拉框
     var bstatdata=[
    	 ['Open','Open'],
    	 ['Fixed','Fixed'],
    	 ['Closed','Closed'],
    	 ['ReOpen','ReOpen'],
    	 ['Rejected','Rejected']
    	 ];
     var bstatstore=new Ext.data.SimpleStore({
    	 fields:['text','value'],
    	 data:bstatdata
    	 });
     var bstatcombo=new Ext.form.ComboBox({
    	 fieldLabel:'BUG状态',
    	 editable : false,
    	 hiddenName: 'Status',
    	 store:bstatstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     });
     
     //缺陷类型设置为下拉框
     var btypedata=[
    	 ['FE-功能错误','功能错误'],
    	 ['PE-性能错误','性能错误'],
    	 ['DE-显示错误','显示错误']
    	 ];
     var btypestore=new Ext.data.SimpleStore({
    	 fields:['text','value'],
    	 data:btypedata
    	 });
     var btypecombo=new Ext.form.ComboBox({
    	 fieldLabel:'BUG状态',
    	 editable : false,
    	 hiddenName: 'Status',
    	 store:btypestore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     });
     
     //缺陷严重程度设置为下拉框
     var bdegrdata=[
    	 ['1-致命','1-致命'],
    	 ['2-严重','2-严重'],
    	 ['3-一般','3-一般'],
    	 ['4-轻微','4-轻微']
    	 ];
     var bdegrstore=new Ext.data.SimpleStore({
    	 fields:['text','value'],
    	 data:bdegrdata
    	 });
     var bdegrcombo=new Ext.form.ComboBox({
    	 fieldLabel:'缺陷严重程度',
    	 editable : false,
    	 hiddenName: 'Status',
    	 store:bdegrstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     });
     
       //缺陷来源设置为下拉框
     var bsourdata=[
    	 ['单元测试','单元测试'],
    	 ['系统测试','系统测试'],
    	 ['确认测试','确认测试'],
    	 ['回归测试','回归测试']
    	 ];
     var bsourstore=new Ext.data.SimpleStore({
    	 fields:['text','value'],
    	 data:bsourdata
    	 });
     var bdegrcombo=new Ext.form.ComboBox({
    	 fieldLabel:'BUG来源',
    	 editable : false,
    	 hiddenName: 'Source',
    	 store:bsourstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     });
     
     //发现版本设置为下拉框--------------------------发现版本跟项目版本一致，如何实现？
     var bverdata=[
    	 ['项目','项目']
    	 ];
     var bverstore=new Ext.data.SimpleStore({
    	 fields:['text','value'],
    	 data:bverdata
    	 });
     var bvercombo=new Ext.form.ComboBox({
    	 fieldLabel:'发现版本',
    	 editable : false,
    	 hiddenName: 'BugProVers',
    	 store:bverstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     });

var addBug_form = new Ext.form.FormPanel({//新增表单
		autoScroll:true,
		labelAlign:'right',
		labelWidth:100, 
		width:600,
        height:350,
		plain:true,
		frame:true,
		defaultType:'textfield',
		items:[
		new Ext.form.ComboBox({
    	 fieldLabel:'BUG优先级',
    	 editable : false,
    	 hiddenName: 'BugPrio',
    	 store:bpriostore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     }),{
			fieldLabel:'BUG标题',
			name:'BugTitle',
			width:400
		},
      new Ext.form.ComboBox({
    	 fieldLabel:'BUG类型',
    	 editable : false,
    	 hiddenName: 'BugType',
    	 store:btypestore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     }),
     new Ext.form.ComboBox({
    	 fieldLabel:'BUG严重程度',
    	 editable : false,
    	 hiddenName: 'BugDegree',
    	 store:bdegrstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     }),
     new Ext.form.ComboBox({
    	 fieldLabel:'BUG来源',
    	 editable : false,
    	 hiddenName: 'Source',
    	 store:bsourstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text',
    	 width:400
     }),
     {
			fieldLabel:'BUG描述',
			xtype:'textarea',
			name:'BugDesc',
			width:400
		},{
			fieldLabel:'测试人员',
			name:'Tester',
			width:400
		},{
			fieldLabel:'开发人员',
			name:'Developer',
			width:400
		},{
			fieldLabel:'发送对象',
			name:'AssignInto',
			width:400
		},
		new Ext.form.ComboBox({
    	 fieldLabel:'发现版本',
    	 editable : false,
    	 hiddenName: 'BugProVers',
    	 store:bverstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     })],
		buttons:[{
			text:'新增',
			handler:function (){
				Ext.lib.Ajax.request(
						'POST',
						'caseinfo/addbug.action?CaseID='+csid,
						{success:function(resp){
							var result=Ext.decode(resp.responseText);
    						Ext.Msg.alert('信息',result.msg);
    						store.load({params:{start:0,limit:10}});
							addBug_form.getForm().reset();
						},failure:function(){
							Ext.Msg.alert('系统信息','请联系管理员');
						}},
						addBug_form.getForm().getValues(true)//采用缩写模式
					);
				addBug_window.hide();
			}
		},{
			text:"取消",
					handler: function(){
						addBug_window.hide();
						}
		}]
	});   
     
     var addBug_window = new Ext.Window({
		pageX:250,
		pageY:150,
		layout:'fit',
		modal:true, //设置遮罩，即你要的效果
		closeAction:'hide',
		items:[addBug_form],
		buttons:[]
		});
var cm=new Ext.grid.ColumnModel([
	{header:'用例标题',width: 350,dataIndex:'CaseTitle'},
	{header:'用例设计者',width: 100,dataIndex:'Designer'},
	{header:'用例状态',width: 150,dataIndex:'Status',renderer:typeColor},
	{header:'创建时间',width: 150,dataIndex:'CreateTime',renderer:doubleToDate},
	{header:'更新时间',width: 150,dataIndex:'UpdateTime',renderer:doubleToDate},
	]);

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
    		iconCls:'add',
    		handler:function (){
				add_window.show();
				add_form.getForm().reset();
			}
    	},'-',{
    		text:'查看',
    		handler:function (){
				//-------------------------
    		}
    	},'-',{
    		text:'删除',
    		id:'scqx',
    		iconCls:'remove',
    		disabled:true,
    		handler:function (){
    		var selModel = grid.getSelectionModel();
    		Ext.Msg.confirm('提示信息','确定要删除？',function(btn){
    			if(btn=='yes'){
    				var selections=selModel.getSelections();
    				Ext.each(selections,function(item){
    					Ext.Ajax.request({
    						url:'caseinfo/delete.action',
    						success:function(resp){
    						var result=Ext.decode(resp.responseText);
    						Ext.Msg.alert('信息',result.msg);
    						store.load({params:{start:0,limit:10}});
    						update_from.getForm().reset();},
    						failure:function(){},
    						params: { CaseID: item.get('CaseID'),CaseTitle:item.get('CaseTitle')}
    						})
    						})
    						}
   			});
    		}
    	},'-',{
    		text:'添加缺陷',
    		iconCls:'addbug',
    		id:'tjqx',
    		disabled:true,
    		handler:function(){
    		addBug_window.show();
    		}
    		},'-',{
    			id:'search',
    			xtype:'textfield',
    			name:'search'},
    				{text:'查找',
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

  // 为用例状态显示 进行渲染
    function typeColor(val){
        if(val=="No Run"){
            return '<span style="color:black;">' + 'No Run' + '</span>';
        }else if(val=="Passed"){
            return '<span style="color:green;">' + 'Passed' + '</span>';
        }else if(val=="Failed"){
            return '<span style="color:red;">' + 'Failed' + '</span>';
        }
        return val;
    }
    
    //用例状态设置为下拉框
     var cstatdata=[
    	 ['No Run','No Run'],
    	 ['Passed','Passed'],
    	 ['Failed','Failed']
    	 ];
     var utypstore=new Ext.data.SimpleStore({
    	 fields:['text','value'],
    	 data:cstatdata
    	 });
     var combo=new Ext.form.ComboBox({
    	 fieldLabel:'用例状态',
    	 editable : false,
    	 hiddenName: 'Status',
    	 store:utypstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     });
     
     var update_form = new Ext.form.FormPanel({//更新表单
		autoScroll:true,
		labelAlign:'right',
		labelWidth:100, 
        height:260,
		plain:true,
		frame:true,
		items:[{
			layout: 'column',
			items:[{
				//第一列
			columnWidth:.45,
            layout: 'form',
            defaultType:'textfield',
            items:[
				new Ext.form.Hidden({
					name:'CaseID'
						}),{
						xtype:'textarea',
						fieldLabel:'用例标题',
						name:'CaseTitle',
						width:350,
						height:50
						},{
							fieldLabel:'用例设计者',
							name:'Designer',
							width:350,
							height:30
						},
						new Ext.form.ComboBox({
							fieldLabel:'用例状态',
							editable : false,
							hiddenName: 'Status',
							store:utypstore,
							emptyText:'请选择',
							mode:'local',
							triggerAction:'all',
							valueField:'value',
							displayField:'text',
							width:250,
							height:30
								}),{
							fieldLabel:'预置条件',
							name:'PreCondition',
							xtype:'textarea',
							width:350,
							height:50
							}
						]},
						{//第二列
							columnWidth:.5,
							layout: 'form',
							defaultType:'textfield',
							items:[{
								fieldLabel:'操作步骤',
								name:'Steps',
								xtype:'textarea',
								width:350,
								height:100
								},{
									fieldLabel:'预期结果',
									name:'ExpResult',
									xtype:'textarea',
									width:350
									}
								]}
						]
						}],
						buttons:[{
							text:'更新',
							handler:function (){
							Ext.lib.Ajax.request(
								'POST',
								'caseinfo/update.action',
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
						}]
						});
     
     grid.addListener( 'rowdblclick', function( g, rowIdx, eobj ) { // 对grid的行添加点击事件
    	 Ext.getCmp('scqx').setDisabled(false);
        var record = store.getAt(rowIdx); // 返回是的一个 Record. Store包含的就是Record[]
        var cstatus=record.data.Status;
        csid=record.data.CaseID;
        if(cstatus=='Failed'){ Ext.getCmp('tjqx').setDisabled(false);}
    	  else{Ext.getCmp('tjqx').setDisabled(true);}
		update_form.getForm().loadRecord(record);
		
	});
     grid.addListener( 'rowclick', function( g, rowIdx, eobj ) { // 对grid的行添加单击事件
    	  Ext.getCmp('scqx').setDisabled(false);
    	 var record = store.getAt(rowIdx);
    	 var cstatus=record.data.Status;
    	  csid=record.data.CaseID;
    	  if(cstatus=='Failed'){ Ext.getCmp('tjqx').setDisabled(false);}
    	  else{Ext.getCmp('tjqx').setDisabled(true);}
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
		width:600,
        height:320,
		plain:true,
		frame:true,
		defaultType:'textfield',
		items:[
			{
			fieldLabel:'用例标题',
			name:'CaseTitle',
			width:400
		},{
			fieldLabel:'用例设计者',
			name:'Designer',
			width:400
		},
		combo,
		{
			fieldLabel:'预置条件',
			name:'PreCondition',
			width:400
		},{
			fieldLabel:'操作步骤',
			name:'Steps',
			xtype:'textarea',
			width:400
		},{
			fieldLabel:'预期结果',
			name:'ExpResult',
			xtype:'textarea',
			width:400
		}],
		buttons:[{
			text:'新增',
			handler:function (){
				Ext.lib.Ajax.request(
						'POST',
						'caseinfo/add.action',
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
})
