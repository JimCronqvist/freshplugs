jQuery(function()
{
    jc_view_count = {};
    jQuery(document).on('click', '#active_filter', function()
    {
        var jc_old_cookie = getCookie('filter_name');
        jQuery('.fd-menu').children('a').slice(0,2).each(function()
        {
            var $this = jQuery(this);
            var href = $this.attr('href');
            if(href.indexOf('/helpdesk/tickets/view/') != -1)
            {
                var viewId = href.replace('/helpdesk/tickets/view/', '');
                if(jc_view_count[viewId] == (new Date()).getMinutes())
                {
                    console.log(viewId+' skipped, cached');
                    return true;
                }
                jQuery.ajax(
                {
                    url: '/helpdesk/tickets/view/'+viewId+'?_pjax=%23body-container',
                    success: function(data)
                    {
                        try{
                            var number = data.match(/Showing([\s\S]+?)of/)[0].match(/([0-9]+)/g)[1];
                        } catch(exception){
                            var number = 0;
                        }
                        console.log(viewId+': '+number);
                        $this.children('span').remove();
                        $this.html($this.text()+'<span class="badge" style="float:right;">'+number+'</span>');
                        jc_view_count[viewId] = (new Date()).getMinutes();
                        document.cookie = "filter_name="+jc_old_cookie+"; expires=0; path=/";
                    }
                });
            }
        });
    });
});
