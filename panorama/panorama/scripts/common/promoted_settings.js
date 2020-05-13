'use strict';

                                                                                                                                      
var g_PromotedSettingsVersion = 1;

var g_PromotedSettings = [
	  
		                                                              
		                                                                 
		                                                                
		                                                 
		  	
		                                       
		                                                                                        
		                                                      
		                                                      
		                                                                              
		                                                                                                                         
					                                           
		                                                                                                              
					                                    
	  
	          
	 
		                
		                               
		                                       
		                              
		                                              
		                                        
	  
	          	
	{
		id: "SettingsCommunicationSettings",
		loc_name: "#settings_comm_binds_section",
		loc_desc: "#settings_comm_binds_info",
		section: "GameSettings",
		start_date: new Date( 'September 13, 2019' ), 
		end_date: new Date( 'January 30, 2020' )
	},
	{
		id: "RadialWepMenuBinder",
		loc_name: "#SFUI_RadialWeaponMenu",
		loc_desc: "#SFUI_RadialWeaponMenu_Desc",
		section: "KeybdMouseSettings",
		start_date: new Date( 'September 18, 2019' ), 
		end_date: new Date( 'January 30, 2020' )
	}
	          
	 
	 
		                        
		                                
		                                     
		                        
		                                              
		                                        
	 
	          	
];

var PromotedSettingsUtil = ( function ()
{
	function _GetUnacknowledgedPromotedSettings()
	{
		if ( g_PromotedSettings.length == 0 )
			return [];

		let settingsInfo = GameInterfaceAPI.GetSettingString( "cl_promoted_settings_acknowledged" ).split( ':' );
		let version = parseInt( settingsInfo.shift() );
		let arrNewSettings = [];
		if ( version === g_PromotedSettingsVersion )
		{
			                                                 
			let timeLastViewed = new Date( parseInt( settingsInfo.shift() ) );
			for ( let setting of g_PromotedSettings )
			{
				const now = new Date();
				if ( setting.start_date > timeLastViewed && setting.start_date <= now )
					arrNewSettings.push( setting );
			}
		}
		else
		{
			                                                                             
			                                                 
			const now = new Date();
			return g_PromotedSettings.filter( setting => setting.start_date <= now && setting.end_date > now );
		}
		return arrNewSettings;
	}

	                                                                                              
	var hPromotedSettingsViewedEvt = $.RegisterForUnhandledEvent( "MainMenu_PromotedSettingsViewed", function ( id )
	{
		                  
		GameInterfaceAPI.SetSettingString( "cl_promoted_settings_acknowledged", "" + g_PromotedSettingsVersion + ":" + Date.now() );
		$.UnregisterForUnhandledEvent( "MainMenu_PromotedSettingsViewed", hPromotedSettingsViewedEvt );
	} );

	return {
		GetUnacknowledgedPromotedSettings : _GetUnacknowledgedPromotedSettings
	}
}() );

