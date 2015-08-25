Ext.onReady(function(){
var store = new Ext.data.Store({
			proxy:new Ext.data.HttpProxy({url:'bug/bug.action'}),
			reader:new Ext.data.JsonReader({
				totalProperty:'totalProperty',
				root:'root'
			},[
			   {name:'BugID'},
			   {name:'BugTitle'},
			   {name:'BugStat'},
			   {name:'BugType'},
			   {name:'BugDegree'},
			   {name:'Source'},
			   {name:'BugDesc'},
			   {name:'Tester'},
			   {name:'Developer'},
			   {name:'AssignInto'},
			   {name:'BugPrio'},
			   {name:'BugProVers'},
			   {name:'CreateTime'},
			   {name:'UpdateTime'}
			   //创建时间和更新时间由后台生成
			  ])
	});

var cm=new Ext.grid.ColumnModel([
	{header:'BUG优先级',width: 100,dataIndex:'BugPrio',renderer:bptypeColor},
	{header:'BUG标题',width: 200,dataIndex:'BugTitle'},
	{header:'BUG状态',width: 100,dataIndex:'BugStat'},
	{header:'BUG类型',width: 100,dataIndex:'BugType'},
	{header:'BUG严重程度',width: 110,dataIndex:'BugDegree'},
	{header:'BUG来源',width: 100,dataIndex:'Source'},
	{header:'BUG描述',width: 100,dataIndex:'BugDesc'},
	{header:'测试人员',width: 100,dataIndex:'Tester'},
	{header:'发现版本',width: 100,dataIndex:'BugProVers'},
	{header:'发现时间',width: 150,dataIndex:'CreateTime',renderer:doubleToDate},
	{header:'更新时间',width: 150,dataIndex:'UpdateTime',renderer:doubleToDate}
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
    		iconCls:'addbug',
    		handler:function (){
				add_window.show();
				add_form.getForm().reset();
			}
    	},'-',{
    		text:'查看',
    		iconCls:'bug',
    		handler:function (){
				//-------------------------
    		}
    	},'-',{
    		text:'删除',
    		id:'scqx',
    		disabled:'false',
    		iconCls:'removebug',
    		handler:function (){
    		var selModel = grid.getSelectionModel();
    		Ext.Msg.confirm('提示信息','确定要删除？',function(btn){
    			if(btn=='yes'){
    				var selections=selModel.getSelections();
    				Ext.each(selections,function(item){
    					Ext.Ajax.request({
    						url:'bug/delete.action',
    						success:function(resp){
    						var result=Ext.decode(resp.responseText);
    						Ext.Msg.alert('信息',result.msg);
    						store.load({params:{start:0,limit:10}});
    						update_from.getForm().reset();},
    						failure:function(){},
    						params: {BugID: item.get('BugID'),BugTitle:item.get('BugTitle')}
    						})
    						})
    						}
   			});
    		}
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

  // 为缺陷优先级显示 进行渲染
    function bptypeColor(val){
        if(val=="1"){
            return '<span style="color:black;">' + '1-低' + '</span>';
        }else if(val=="2"){
            return '<span style="color:orange;">' + '2-中' + '</span>';
        }else if(val=="3"){
            return '<span style="color:red;">' + '3-高' + '</span>';
        }
        return val;
    }
    
    //缺陷优先级设置为下拉框
     var bpriodata=[
    	 ['1-低','1'],
    	 ['2-中','2'],
    	 ['3-高','3']
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
    	 ['集成测试','集成测试'],
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
     
     var update_form = new Ext.form.FormPanel({//更新表单
		autoScroll:true,
		labelAlign:'right',
		labelWidth:100, 
        height:270,
		plain:true,
		frame:true,
		items:[{
			layout: 'column',
			items:[{
				//第一列
			columnWidth:.4,
            layout: 'form',
            defaultType:'textfield',
            items:[
			new Ext.form.Hidden({
			name:'BugID'
		}),
		new Ext.form.ComboBox({
    	 fieldLabel:'BUG优先级',
    	 editable : false,
    	 hiddenName: 'BugPrio',
    	 store:bpriostore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text',
    	 width:250
     }),{
			fieldLabel:'BUG标题',
			name:'BugTitle',
			xtype:'textarea',
			width:250,
			height:40
		},
		new Ext.form.ComboBox({
    	 fieldLabel:'BUG状态',
    	 editable : false,
    	 hiddenName: 'BugStat',
    	 store:bstatstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text',
    	 width:250
     }),
      new Ext.form.ComboBox({
    	 fieldLabel:'BUG类型',
    	 editable : false,
    	 hiddenName: 'BugType',
    	 store:btypestore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text',
    	 width:250
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
    	 displayField:'text',
    	 width:250
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
    	 width:250
     }),
		new Ext.form.ComboBox({
    	 fieldLabel:'发现版本',
    	 editable : false,
    	 hiddenName: 'BugProVers',
    	 store:btypestore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text',
    	 width:250
     })]},
     {//第二列
    	 columnWidth:.5,
    	 layout: 'form',
    	 defaultType:'textfield',
    	 items:[
    		 {
			fieldLabel:'BUG描述',
			xtype:'textarea',
			name:'BugDesc',
			width:350,
			height:90
		},{
			fieldLabel:'测试人员',
			name:'Tester',
			width:350,
			height:25
		},{
			fieldLabel:'开发人员',
			name:'Developer',
			width:350,
			height:25
		},{
			fieldLabel:'发送对象',
			name:'AssignInto',
			width:350,
			height:25
		}]}
     ]
     }],
		buttons:[{
			text:'更新',
			handler:function (){
				Ext.lib.Ajax.request(
						'POST',
						'bug/update.action',
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
		height:270,//该布局无法使用自适应高度
		collapsible:true
	}]
});
    
    var add_form = new Ext.form.FormPanel({//新增表单
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
//		new Ext.form.ComboBox({
//    	 fieldLabel:'BUG状态',
//    	 editable : false,
//    	 hiddenName: 'BugStat',
//    	 store:bstatstore,
//    	 emptyText:'请选择',
//    	 mode:'local',
//    	 triggerAction:'all',
//    	 valueField:'value',
//    	 displayField:'text'
//     }),
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
						'bug/add.action',
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
