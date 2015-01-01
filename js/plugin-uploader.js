/**
* @name     Wp-Player Admin JS
* @desc     MetaBox JavaScript
* @depend   jQuery
* @author   M.J
* @date     2014-12-19
* @update   2015-01-01
* @URL      http://webjyh.com
* @version  2.2.0
* 
*/
jQuery(document).ready(function() {

    //wp-player upload dialog
    var original_send_to_editor = window.send_to_editor;
    jQuery('.WP-Player-File').on('click', function() {
        formField = jQuery(this).prev().attr('id');
        tb_show('', 'media-upload.php?media-upload.php?type=image&amp;TB_iframe=true');
        
        window.send_to_editor = function(html){
            fileUrl = jQuery( html ).attr('href');
            jQuery( '#'+formField ).val( fileUrl );
            tb_remove();
            window.send_to_editor = original_send_to_editor;
        }
        return false;
    });

    //wp-player Tabs
    jQuery('#wp-player-tabs > li').on('click', function() {
        var index = jQuery(this).index();
        jQuery(this).addClass('current').siblings().removeClass('current');
        jQuery('#wp-player-row > div').hide().eq(index).fadeIn();
    });

    //get Music ID
    jQuery('#wp_player_get_xiami_id').on('click', function() {
        var $type = jQuery('#wp_player_music_type'),
            $len = $type.find('option').length,
            $elem = jQuery('#mp3_xiami'),
            $select = jQuery('#mp3_xiami_type'),
            $val = $elem.val(),
            regs  = [/^http[s]?:\/\/\w*[\.]?xiami.com+\/(\w+)\/+(\d+).*$/, /^http:\/\/music.163.com\/#.*\/{1}(.+)\?id=(\d+)$/],
            typeArr = ['xiami', 'netease'],
            result = {},
            mark = null;

        if (typeof $val === 'undefined' ||  $val == '') {
            $elem.focus();
        }

        var reg = ($val.indexOf('163.com') > -1 && $len > 1) ? mark = 1 : mark = 0,
            row = $val.match(regs[mark]);

        if (mark == 0 && !row && !jQuery.isNumeric($val)){
            alert('您的当前站点只支持虾米音乐网址');
            return false;
        }

        if (jQuery.isArray(row)) {
            result['type'] = row[1];
            result['id'] = row[2];
        } else {
            if (!jQuery.isNumeric($val)){
                alert('获取音乐ID失败！')
            }
        }

        if ( jQuery.isArray( row ) && result['type'] && result['id'] ){
            if ( result['type'] == 'playlist' ) result['type'] = 'collect';
            $elem.val( result['id'] );
            $type.children('option').prop('selected', false);
            $select.children('option').prop('selected', false);
            $type.find('option[value='+typeArr[mark]+']').prop('selected', true);
            $select.find('option[value='+result['type']+']').prop('selected', true);
        }
    });
});