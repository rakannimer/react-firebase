/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return `${baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('react-firebase-auth/getting-started.html')}>
              React Firebase Auth
            </a>
            <a href={this.docUrl('react-firestore-database/getting-started.html')}>
              React Firebase Firestore
            </a>
            <a href={this.docUrl('react-firebase-realtime-database/getting-started.html')}>
              React Firebase Realtime Database
            </a>
            <a href={this.docUrl('generate-firebase-data')}>Firebase Data Generator</a>
            <a href={this.docUrl('generate-firestore-data')}>Firestore Data Generator</a>
            <a href={this.docUrl('generate-json-data')}>JSON Data Generator</a>
          </div>
          <div>
            <h5>APIs</h5>
            <a href={this.docUrl('react-firebase-auth/api.html')}>
              React Firebase Auth
            </a>
            <a href={this.docUrl('react-firestore-database/api.html')}>
              React Firebase Firestore
            </a>
            <a href={this.docUrl('react-firebase-realtime-database/api.html')}>
              React Firebase Realtime Database
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={`${this.props.config.baseUrl}blog`}>Blog</a>
            <a href="https://github.com/">GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/facebook/docusaurus/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
