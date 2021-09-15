import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, SvgIcon } from '../../common';
import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="footer">
          <Container>
            <div className="footer-inner">
              <Row>
                <Col md="5" className="footer-left">
                  <Link to="/"><SvgIcon className="logo-footer" name="logo" viewbox="0 0 181.234 50.771" /></Link>
                  <ul>
                    <li><Link to="/"><SvgIcon name="telegram" viewbox="0 0 15.006 12.585" /></Link></li>
                    <li><Link to="/"><SvgIcon name="twitter" viewbox="0 0 15.495 12.585" /></Link></li>
                    <li><Link to="/"><SvgIcon name="medium" viewbox="0 0 15.606 12.383" /></Link></li>
                    <li><Link to="/"><SvgIcon name="reddit" viewbox="0 0 15.62 14.752" /></Link></li>
                    <li><Link to="/"><SvgIcon name="github" viewbox="0 0 16.406 16" /></Link></li>
                  </ul>
                </Col>
                <Col md="7" className="footer-right">
                  <Row>
                    <Col>
                      <label>Services</label>
                      <ul>
                        <li><Link to="/">dVPN</Link></li>
                      </ul>
                    </Col>
                    <Col>
                      <label>Guides</label>
                      <ul>
                        <li><Link to="/">Sentinel Network</Link></li>
                        <li><Link to="/">Service Node Hosting</Link></li>
                        <li><Link to="/">Validator Hosting</Link></li>
                      </ul>
                    </Col>
                    <Col>
                      <label>Guides</label>
                      <ul>
                        <li><Link to="/">Stats</Link></li>
                        <li><Link to="/">dVPN Node Network</Link></li>
                        <li><Link to="/">Whitepaper</Link></li>
                      </ul>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Footer
