import React from "react";
import {SideNav,SideNavItem, Button, Icon} from 'react-materialize/lib'
console.log(Button)

export default () => (
    <SideNav
        trigger={<Button>SIDE NAV DEMO</Button>}
        options={{ closeOnClick: true}}
        fixed={true}
        >
        {/* <SideNavItem userView
        user={{
            background: 'img/office.jpg',
            image: 'img/yuna.jpg',
            name: 'John Doe',
            email: 'jdandturk@gmail.com'
        }}
        /> */}
        <SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
        <SideNavItem href='#!second'>Second Link</SideNavItem>
        <SideNavItem divider />
        <SideNavItem subheader>Subheader</SideNavItem>
        <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
    </SideNav>
//     <Button waves='light'>
//     <Icon>thumb_up</Icon>
//   </Button>
)