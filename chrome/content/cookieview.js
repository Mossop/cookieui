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

    var pref = "network.cookie.blockFutureCookies";
    var userSet = psvc.prefHasUserValue(pref);
    var oldBlock = false;
    if (userSet)
      oldBlock = psvc.getBoolPref(pref);

    if (!oldBlock)
    {
      psvc.setBoolPref(pref,true);
    }
    gCookiesWindow.deleteCookie();
    if ((userSet)&&(!oldBlock))
    {
      psvc.setBoolPref(pref,oldBlock);
    }
    else
    {
      psvc.clearUserPref(pref);
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
