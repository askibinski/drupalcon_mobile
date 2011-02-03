
(function() {

  DrupalCon.ui.createDayWindow = function(tabGroup) {

    // create table view data object
    var data = [
      {title:'Monday, March 7', hasChild:true, color:'#000', backgroundColor:'#fff', selectedColor:'#fff', start_date:'2011-03-07T00:00:00', end_date:'2011-03-08T00:00:00'},
      {title:'Tuesday, March 8', hasChild:true, color:'#000', backgroundColor:'#fff', selectedColor:'#fff', start_date:'2011-03-08T00:00:00', end_date:'2011-03-09T00:00:00'},
      {title:'Wednesday, March 9', hasChild:true, color:'#000', backgroundColor:'#fff', selectedColor:'#fff', start_date:'2011-03-09T00:00:00', end_date:'2011-03-10T00:00:00'},
      {title:'Thursday, March 10', hasChild:true, color:'#000', backgroundColor:'#fff', selectedColor:'#fff', start_date:'2011-03-10T00:00:00', end_date:'2011-03-11T00:00:00'},
      {title:'Friday, March 11', hasChild:true, color:'#000', backgroundColor:'#fff', selectedColor:'#fff', start_date:'2011-03-11T00:00:00', end_date:'2011-03-12T00:00:00'}
    ];

    var dayWindow = Titanium.UI.createWindow({
      id: 'win1',
      title: 'Sessions',
      backgroundColor: '#fff',
      tabGroup: tabGroup
    });

    // create table view
    var tableview = Titanium.UI.createTableView({
      data: data
    });

    // add table view to the window
    dayWindow.add(tableview);

    // create table view event listener
    tableview.addEventListener('click', function(e) {
      // @TODO - This line breaks in iOS, says currentTab is undefined.
      Titanium.UI.currentTab.open(DrupalCon.ui.createSessionsWindow({
        title: e.rowData.title,
        start_date: e.rowData.start_date,
        end_date: e.rowData.end_date,
        tabGroup: Titanium.UI.currentTab
      }), {animated:true});
    });

    // The following is broken, but I cannot for the life of me figure out why.
    // It just doesn't hook up to the menu.
    var buttons = [];
    buttons.push({
      title: "Update",
      clickevent: function () {
        Ti.fireEvent('drupalcon:update_data');
      }
    });
    buttons.push({
      title: "Hit sessions",
      clickevent: function () {
        var conn = Drupal.db.getConnection('main');
        var rows = conn.query("SELECT nid, title, changed, start_date, end_date FROM node ORDER BY nid, changed");
        while (rows.isValidRow()) {
          Titanium.API.info('Nid: ' + rows.fieldByName('nid') + ', Start: ' + rows.fieldByName('start_date') + ', End: ' + rows.fieldByName('end_date')  + ', Changed: ' + rows.fieldByName('changed') + ', Title: ' + rows.fieldByName('title'));
          rows.next();
        }
        rows.close();
      }
    });
    buttons.push({
      title: "Hit presenters",
      clickevent: function () {
        var conn = Drupal.db.getConnection('main');
        var rows = conn.query("SELECT uid, name, full_name FROM user ORDER BY name, uid");
        while (rows.isValidRow()) {
          Titanium.API.info('Uid: ' + rows.fieldByName('uid') + ', Name: ' + rows.fieldByName('name') + ', Full Name: ' + rows.fieldByName('full_name'));
          rows.next();
        }
        rows.close();
      }
    });
    menu.init({
      win: dayWindow,
      buttons: buttons
    });


    return dayWindow;
  };

})();
