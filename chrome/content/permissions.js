/*
 * $HeadURL$
 * $LastChangedBy$
 * $Date$
 * $Revision$
 *
 */

var CookieUI = 
{
  _textbox: null,
  _changed: false,
  _tree: null,
  
  init: function()
  {
    CookieUI._textbox=document.getElementById("url");
    CookieUI._tree=document.getElementById("permissionsTree");
    
    CookieUI._tree.addEventListener("select",CookieUI.siteSelect,false);
    CookieUI._textbox.addEventListener("input",CookieUI.urlKeyPress,false);
    document.getElementById("btnBlock").addEventListener("command",CookieUI.buttonPress,false);
    document.getElementById("btnSession").addEventListener("command",CookieUI.buttonPress,false);
    document.getElementById("btnAllow").addEventListener("command",CookieUI.buttonPress,false);
  },
  
  urlKeyPress: function()
  {
    if (CookieUI._textbox.value=="")
    {
      dump("not changed\n");
      CookieUI._changed=false;
    }
    else
    {
      dump("changed\n");
      CookieUI._changed=true;
    }
  },
  
  buttonPress: function()
  {
    dump("not changed\n");
    CookieUI._changed=false;
  },
  
  siteSelect: function()
  {
    if (CookieUI._tree.view.selection.count==1)
    {
      var host = gPermissionManager._permissions[CookieUI._tree.view.selection.currentIndex].rawHost;
      if (!CookieUI._changed)
      {
        CookieUI._textbox.value=host;
        gPermissionManager.onHostInput(CookieUI._textbox);
      }
    }
    else
    {
      if (!CookieUI._changed)
      {
        CookieUI._textbox.value="";
        gPermissionManager.onHostInput(CookieUI._textbox);
      }
    }
  }
};

window.addEventListener("load",CookieUI.init,false);
