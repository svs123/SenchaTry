/*global Ext:false */
/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['*']);

Ext.onReady(function () {

    Ext.QuickTips.init();

    // NOTE: This is an example showing simple state management. During development,
    // it is generally best to disable state management as dynamically-generated ids
    // can change across page loads, leading to unpredictable results.  The developer
    // should ensure that stable state ids are set for stateful components in real apps.
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    var viewport = Ext.create('Ext.Viewport', {
        id: 'border-example',
        layout: 'border',
        items: [
        // create instance immediately
        Ext.create('Ext.Component', {
            region: 'north',
            height: 32,
            // give north and south regions a height
            autoEl: {
                tag: 'div',
                html: '<p>north - generally for menus, toolbars and/or advertisements</p>'
            }
        }),
        {
            // lazily created panel (xtype:'panel' is default)
            region: 'south',
            contentEl: 'south',
            split: true,
            height: 100,
            minSize: 100,
            maxSize: 200,
            collapsible: true,
            collapsed: true,
            title: 'South',
            margins: '0 0 0 0'
        }, {
            xtype: 'tabpanel',
            region: 'east',
            title: 'East Side',
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: ['->',
                {
                    xtype: 'button',
                    text: 'test',
                    tooltip: 'Test Button'
                }]
            }],
            animCollapse: true,
            collapsible: true,
            split: true,
            width: 225,
            // give east and west regions a width
            minSize: 175,
            maxSize: 400,
            margins: '0 5 0 0',
            activeTab: 1,
            tabPosition: 'bottom',
            items: [{
                html: '<p>A TabPanel component can be a region.</p>',
                title: 'A Tab',
                autoScroll: true
            },
            Ext.create('Ext.grid.PropertyGrid', {
                title: 'Property Grid',
                closable: true,
                source: {
                    "(name)": "Properties Grid",
                    "grouping": false,
                    "autoFitColumns": true,
                    "productionQuality": false,
                    "created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
                    "tested": false,
                    "version": 0.01,
                    "borderWidth": 1
                }
            })]
        }, {
            region: 'west',
            stateId: 'navigation-panel',
            id: 'west-panel',
            // see Ext.getCmp() below
            title: 'West',
            split: true,
            width: 200,
            minWidth: 175,
            maxWidth: 400,
            collapsible: true,
            animCollapse: true,
            margins: '0 0 0 5',
            layout: 'accordion',
            items: [{
                contentEl: 'west',
                title: 'Navigation',
                iconCls: 'nav' // see the HEAD section for style used
            }, {
                title: 'Settings',
                html: '<p>Some settings in here.</p>',
                iconCls: 'settings'
            }, {
                title: 'Information',
                html: '<p>Some info in here.</p>',
                iconCls: 'info'
            }]
        },
        // in this instance the TabPanel is not wrapped by another panel
        // since no title is needed, this Panel is added directly
        // as a Container
        Ext.create('Ext.tab.Panel', {
            region: 'center',
            // a center region is ALWAYS required for border layout
            deferredRender: false,
            activeTab: 0,
            // first tab initially active
            items: [{
                contentEl: 'center1',
                title: 'Close Me',
                closable: true,
                autoScroll: true
            }, {
                contentEl: 'center2',
                title: 'Center Panel',
                autoScroll: true
            }]
        })]
    });
    // get a reference to the HTML element with id "hideit" and add a click listener to it
    Ext.get("hideit").on('click', function () {
        // get a reference to the Panel that was created with id = 'west-panel'
        var w = Ext.getCmp('west-panel');
        // expand or collapse that Panel based on its collapsed property state
        w.collapsed ? w.expand() : w.collapse();
    });
});
