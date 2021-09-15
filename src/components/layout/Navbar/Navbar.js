import { Button } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SvgIcon, Container } from '../../common';
import './Navbar.scss';


 
class LeftMenu extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="main-header">
              <div className="header-top">
                <Container>
                  <div className="header-top-inner">
                    <div className="header-left">
                      Your IP <span>27.57.184.74</span>
                    </div>
                    <div className="header-right">
                      <ul>
                        <li><Link to="/"><SvgIcon name="telegram" viewbox="0 0 15.006 12.585" /></Link></li>
                        <li><Link to="/"><SvgIcon name="twitter" viewbox="0 0 15.495 12.585" /></Link></li>
                        <li><Link to="/"><SvgIcon name="medium" viewbox="0 0 15.606 12.383" /></Link></li>
                        <li><Link to="/"><SvgIcon name="reddit" viewbox="0 0 15.62 14.752" /></Link></li>
                        <li><Link to="/"><SvgIcon name="github" viewbox="0 0 16.406 16" /></Link></li>
                      </ul>
                      <Button>GET SENTINEL dVPN</Button>
                    </div>
                  </div>
                </Container>
              </div>
              <div className="header-bottom">
                <Container>
                  <div className="header-bottom-inner">
                    <div className="header-logo">
                      <Link to="/"><SvgIcon name="logo" viewbox="0 0 181.234 50.771" /></Link>
                    </div>
                    <div className="data-center">
                      <SvgIcon name="globe" viewbox="0 0 29.25 29.25" />
                      <div>DATA CENTERS</div>
                    </div>
                  </div>
              </Container>
            </div>
          </div>
      </React.Fragment>
    )
  }
}

 
export default LeftMenu
