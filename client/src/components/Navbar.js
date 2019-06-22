import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <div>
        <Navbar color='info' light>
          <NavbarBrand href='/' className='mr-auto'>
            Chill Poll
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className='mr-2' />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href='/components/'>Search Recent Polls</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='https://github.com/zaneecampbell'>
                  GitHub
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='https://zane-campbell.com'>Website</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
