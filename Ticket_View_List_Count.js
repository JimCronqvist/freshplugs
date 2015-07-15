jQuery(function()
{
    jc_view_count = {};
    var allowed_global_views = [
        '/helpdesk/tickets/filter/spam'
    ];

    jQuery(document).on('click', '#active_filter', function()
    {
        var jc_old_cookie = getCookie('filter_name');
        jQuery('.fd-menu').children('a').each(function()
        {
            var $this = jQuery(this);
            var href = $this.attr('href');
            if(href.indexOf('/helpdesk/tickets/view/') != -1 || allowed_global_views.indexOf(href) != -1)
            {
                var viewId = href.replace('/helpdesk/tickets/view/', '').replace('/helpdesk/tickets/filter/', '');
                if(href.indexOf('/helpdesk/tickets/view/') != -1)
                {
                    var baseUrl = '/helpdesk/tickets/view/';
                }
                else
                {
                    var baseUrl = '/helpdesk/tickets/filter/';
                }
                if(typeof jc_view_count[viewId] == 'undefined')
                {
                    jc_view_count[viewId] = {minute: null, number: 0};
                }
                if(jc_view_count[viewId]['minute'] == (new Date()).getMinutes())
                {
                    console.log(viewId+' skipped, cached');
                    return true;
                }
                jQuery.ajax(
                {
                    url: baseUrl+viewId+'?_pjax=%23body-container',
                    success: function(data)
                    {
                        try{
                            var number = data.match(/Showing([\s\S]+?)of/)[0].match(/([0-9]+)/g)[1];
                            if(number == 30)
                            {
                                number = '30+';
                            }
                        } catch(exception){
                            var number = 0;
                        }
                        console.log(viewId+': '+number);
                        $this.children('span').remove();
                        $this.html($this.text()+'<span class="badge" style="float:right;">'+number+'</span>');
                        jc_view_count[viewId]['minute'] = (new Date()).getMinutes();
                        jc_view_count[viewId]['number'] = number;
                        document.cookie = "filter_name="+jc_old_cookie+"; expires=0; path=/";
                    }
                });
            }
        });
    });
});
