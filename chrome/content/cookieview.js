/*
 * $HeadURL$
 * $LastChangedBy$
 * $Date$
 * $Revision$
 *
 */

var CookieUI = 
{
  _strBundle: null,
  _tree: null,
  _button: null,
  
  init: function()
  {
    CookieUI._strBundle=document.getElementById("cookieviewlocale");
    CookieUI._tree = document.getElementById("cookiesList");
    
    CookieUI._tree.addEventListener("select",CookieUI.onCookieSelected,false);
  
    var spacer = document.getElementById("removeAllCookies").nextSibling;
    var hbox = spacer.parentNode;
    CookieUI._button = document.createElement("button");
    CookieUI._button.id="blockSite";
    CookieUI._button.setAttribute("label",CookieUI._strBundle.getString("blockSite.label"));
    hbox.insertBefore(CookieUI._button,spacer);
    CookieUI._button.addEventListener("command",CookieUI.onButtonClick,false);
    CookieUI.onCookieSelected();
  },

  onButtonClick: function()
  {
    var psvc = Components.classes["@mozilla.org/preferences-service;1"]
                         .getService(Components.interfaces.nsIPrefBranch);
    var oldBlock = psvc.getBoolPref("network.cookie.blockFutureCookies");
    if (!oldBlock)
    {
      if (psvc.prefHasUserValue("network.cookie.blockFutureCookies"))
      {
        psvc.setBoolPref("network.cookie.blockFutureCookies",true);
        gCookiesWindow.deleteCookie();
        psvc.setBoolPref("network.cookie.blockFutureCookies",oldBlock);
      }
      else
      {
        psvc.setBoolPref("network.cookie.blockFutureCookies",true);
        gCookiesWindow.deleteCookie();
        psvc.clearUserPref("network.cookie.blockFutureCookies");
      }
    }
    else
    {
      gCookiesWindow.deleteCookie();
    }
  },
  
  onCookieSelected: function()
  {
    var seln = CookieUI._tree.view.selection;
      
    var item = gCookiesWindow._view._getItemAtIndex(seln.currentIndex);
    CookieUI._button.disabled=!(item && seln.count == 1 && item.container);
  }
};

window.addEventListener("load",CookieUI.init,false);
