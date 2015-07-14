jQuery(function()
{
	console.log('Freshservice custom js has been loaded.');
	
	var uri = function()
	{
		var uri = document.location.href;
		uri = uri.replace('http://', '').replace('https://', '');
		var urlExplode = uri.split('/');
		var servername = urlExplode[0];
		uri = uri.replace(servername, '');
		if (uri.indexOf('?') > 0) {
			urlExplode = uri.split('?');
			uri = urlExplode[0];
		}
		uri = uri.replace(/\/page:([0-9]{0,3})$/, '');
		console.log('uri: '+uri);
		return uri;
	};
	uri = uri();
	
	if(uri == '/helpdesk/tickets')
	{
		seconds = 30;
				
		jQuery('#rightCol').children('div.buttons').children('div.pull-right').prepend('<a class="btn btn-info" href="#" style="margin:0px 15px;" onclick="jc_refresh_tickets(); return false;">Reload now</a>');
		jQuery('#rightCol').children('div.buttons').children('div.pull-right').prepend('<div id="jc_refresh" style="display:inline-block;"></div>');
		
		setInterval(function()
		{
			seconds--;
			jQuery('#jc_refresh').html('Reloading in ' + seconds + ' seconds');
			if(seconds == 0)
			{
				jc_refresh_tickets();
			}
		}, 1000);
	}
});

function jc_refresh_tickets()
{
	seconds = 30;
	refresh_tickets(); // function from Freshservice
};
