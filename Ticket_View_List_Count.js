jQuery(function()
{
    jQuery(document).on('click', '#active_filter', function()
    {
        jc_old_cookie = getCookie('filter_name');
        jQuery('.fd-menu').children('a').slice(0,3).each(function()
        {
            var $this = jQuery(this);
            if($this.attr('data-jc_counted') == (new Date()).getMinutes())
            {
                return true;
            }
            var href = $this.attr('href');
            if(href.indexOf('/helpdesk/tickets/view/') != -1)
            {
                var viewId = href.replace('/helpdesk/tickets/view/', '');
                console.log(viewId);
                document.cookie = "filter_name="+viewId+"; expires=0; path=/";
                jQuery.ajax({
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
                        $this.attr('data-jc_counted', (new Date()).getMinutes());
                        document.cookie = "filter_name="+jc_old_cookie+"; expires=0; path=/";
                    }
                });
            }
        });
    });
});
